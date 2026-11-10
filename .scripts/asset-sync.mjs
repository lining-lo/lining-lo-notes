import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import qiniu from "qiniu";
import { assetKey, assetUrl, loadAssetConfig, root, scanImageFiles } from "./assets.mjs";

const CACHE_PATH = path.join(root, ".assets-cache.json");
const CONCURRENCY = 6;
const MAX_RETRY = 3;
/** 表单上传适合小文件；超过这个尺寸改用分片上传 */
const FORM_UPLOAD_LIMIT = 4 * 1024 * 1024;

const flags = new Set(process.argv.slice(2));
const DRY_RUN = flags.has("--dry-run");
const FORCE = flags.has("--force");
const PULL = flags.has("--pull");
/** 供 update 流程调用：没配密钥时只警告不中断，写作和本地预览照常 */
const LENIENT = flags.has("--lenient");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 限制并发数的任务池 */
const runPool = async (items, worker, limit = CONCURRENCY) => {
  let cursor = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
};

const withRetry = async (fn, label) => {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRY) await sleep(300 * attempt);
    }
  }
  throw new Error(`${label} 失败：${lastErr?.message || lastErr}`);
};

const loadCache = async () => {
  try {
    const parsed = JSON.parse(await fs.readFile(CACHE_PATH, "utf8"));
    if (parsed?.version === 1 && parsed.assets) return parsed;
  } catch {
    /* 首次运行或缓存损坏：从空缓存开始 */
  }
  return { version: 1, assets: {} };
};

const saveCache = async (cache) => {
  const sorted = {};
  for (const key of Object.keys(cache.assets).sort((a, b) => a.localeCompare(b, "zh-CN"))) {
    sorted[key] = cache.assets[key];
  }
  const tmp = `${CACHE_PATH}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify({ version: 1, assets: sorted }, null, 2)}\n`);
  await fs.rename(tmp, CACHE_PATH);
};

const makeClients = (cfg) => {
  const mac = new qiniu.auth.digest.Mac(cfg.ak, cfg.sk);
  const config = new qiniu.conf.Config();
  return {
    mac,
    bucketManager: new qiniu.rs.BucketManager(mac, config),
    formUploader: new qiniu.form_up.FormUploader(config),
    resumeUploader: new qiniu.resume_up.ResumeUploader(config),
  };
};

/** 分页列出前缀下的全部对象，返回 Map<key, item>；每页 1000，整个 run 只调一次 */
const listRemote = async (cfg, clients) => {
  const map = new Map();
  let marker;
  do {
    const body = await withRetry(
      () =>
        new Promise((resolve, reject) => {
          clients.bucketManager.listPrefix(
            cfg.bucket,
            { prefix: cfg.prefix, limit: 1000, marker },
            (err, respBody, respInfo) => {
              if (err) return reject(err);
              if (respInfo.statusCode === 200) resolve(respBody);
              else reject(new Error(`listPrefix ${respInfo.statusCode} ${JSON.stringify(respBody)}`));
            },
          );
        }),
      "listPrefix",
    );
    for (const item of body.items || []) map.set(item.key, item);
    marker = body.marker || undefined;
  } while (marker);
  return map;
};

const uploadOne = async (cfg, clients, repoRel) => {
  const key = assetKey(repoRel, cfg);
  const abs = path.join(root, repoRel);
  const { size } = await fs.stat(abs);
  const token = new qiniu.rs.PutPolicy({ scope: `${cfg.bucket}:${key}` }).uploadToken(clients.mac);
  const done = (resolve, reject) => (err, respBody, respInfo) => {
    if (err) return reject(err);
    if (respInfo.statusCode === 200) resolve(respBody);
    else reject(new Error(`${respInfo.statusCode} ${JSON.stringify(respBody)}`));
  };
  if (size > FORM_UPLOAD_LIMIT) {
    return new Promise((resolve, reject) => {
      clients.resumeUploader.putFile(token, key, abs, new qiniu.resume_up.PutExtra(), done(resolve, reject));
    });
  }
  return new Promise((resolve, reject) => {
    clients.formUploader.putFile(token, key, abs, new qiniu.form_up.PutExtra(), done(resolve, reject));
  });
};

/**
 * 刷新七牛 CDN 缓存。覆盖同名文件时必须调用，否则 CDN 与浏览器会继续用旧图。
 * 管理凭证：`QBox <AK>:<urlsafe_base64(hmac_sha1(SK, 路径 + "\n" + body))>`
 */
const refreshCdn = async (cfg, urls) => {
  const urlPath = "/v2/tune/refresh";
  const body = JSON.stringify({ urls });
  const sign = crypto
    .createHmac("sha1", cfg.sk)
    .update(`${urlPath}\n${body}`)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const res = await fetch(`https://fusion.qiniuapi.com${urlPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `QBox ${cfg.ak}:${sign}` },
    body,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${text}`);
  return text;
};

/** 反向恢复：把云端有的、本地缺的图片下载回来 */
const pull = async (cfg) => {
  const clients = makeClients(cfg);
  const remote = await listRemote(cfg, clients);
  const missing = [];
  for (const key of remote.keys()) {
    if (!key.startsWith(cfg.prefix)) continue;
    const rel = key.slice(cfg.prefix.length);
    if (!rel) continue; // 控制台建目录留下的 0 字节占位对象
    if (rel.endsWith("/")) continue;
    if (existsSync(path.join(root, rel))) continue;
    missing.push(rel);
  }
  console.log(`[info] 远端 ${remote.size} 个对象，本地缺失 ${missing.length} 张`);
  const cache = await loadCache();
  let ok = 0;
  let failed = 0;
  let done = 0;
  const original = { ...cfg, fop: "" };
  for (const rel of missing) {
    const abs = path.join(root, rel);
    try {
      const res = await withRetry(() => fetch(assetUrl(rel, original)), `下载 ${rel}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, Buffer.from(await res.arrayBuffer()));
      const { size, mtimeMs } = await fs.stat(abs);
      cache.assets[rel] = { size, mtimeMs };
      ok++;
    } catch (err) {
      failed++;
      process.stdout.write("\n");
      console.error(`[error] ${err.message}`);
    }
    done++;
    if (done % 25 === 0 || done === missing.length) {
      process.stdout.write(`\r[progress] 恢复 ${done}/${missing.length}  成功 ${ok} 失败 ${failed}   `);
    }
  }
  if (missing.length) process.stdout.write("\n");
  if (ok) await saveCache(cache);
  console.log(`[done] --pull：恢复 ${ok} 张，失败 ${failed} 张`);
  if (failed) process.exitCode = 1;
};

const main = async () => {
  const cfg = await loadAssetConfig();
  console.log(`[info] bucket=${cfg.bucket} prefix=${cfg.prefix} domain=${cfg.domain} fop=${cfg.fop || "(off)"}`);

  if (!DRY_RUN && (!cfg.ak || !cfg.sk)) {
    console.error("[warn] 缺少 QINIU_AK / QINIU_SK，本次不做任何上传。");
    console.error("       新加的图片还没进七牛，提交前请先配好根目录 .env（已 gitignore）再跑一次：");
    console.error("       QINIU_AK=...  /  QINIU_SK=...");
    if (!LENIENT) process.exitCode = 2;
    return;
  }

  if (PULL) {
    await pull(cfg);
    return;
  }

  const files = await scanImageFiles();
  const cache = await loadCache();

  const pending = [];
  let cached = 0;
  for (const rel of files) {
    const { size, mtimeMs } = await fs.stat(path.join(root, rel));
    const hit = cache.assets[rel];
    if (!FORCE && hit && hit.size === size && hit.mtimeMs === mtimeMs) {
      cached++;
      continue;
    }
    pending.push({ rel, size, mtimeMs });
  }
  console.log(`[info] 本地图片 ${files.length} 张，缓存命中 ${cached} 张，待核对 ${pending.length} 张`);

  if (DRY_RUN) {
    const bytes = pending.reduce((sum, p) => sum + p.size, 0);
    for (const p of pending) console.log(`  [dry-run] ${p.rel} -> ${assetKey(p.rel, cfg)}`);
    console.log(
      `[done] dry-run：待核对 ${pending.length} 张（约 ${(bytes / 1048576).toFixed(1)} MB），缓存命中 ${cached} 张（未做任何网络请求）`,
    );
    return;
  }

  let remote = new Map();
  if (pending.length) {
    remote = await listRemote(cfg, makeClients(cfg));
    console.log(`[info] 远端已有 ${remote.size} 个对象`);
  }

  const clients = makeClients(cfg);
  const refreshUrls = [];
  const counters = { uploaded: 0, overwritten: 0, skipped: 0, failed: 0, done: 0, bytes: 0 };
  const total = pending.length;
  const totalBytes = pending.reduce((sum, p) => sum + p.size, 0);

  // 并发跑的时候进度要打到同一行，否则几万行日志没法看
  const report = () => {
    const pct = total ? ((counters.done / total) * 100).toFixed(1) : "100.0";
    const sent = (counters.bytes / 1048576).toFixed(1);
    const all = (totalBytes / 1048576).toFixed(1);
    process.stdout.write(
      `\r[progress] ${counters.done}/${total} (${pct}%)  新增 ${counters.uploaded} 覆盖 ${counters.overwritten} 跳过 ${counters.skipped} 失败 ${counters.failed}  已传 ${sent}/${all} MB   `,
    );
  };

  // 长任务里定期落一次缓存，避免中途中断白跑；同时防止并发重入写坏文件
  let saving = null;
  const saveSoon = () => {
    if (saving) return saving;
    saving = saveCache(cache).finally(() => {
      saving = null;
    });
    return saving;
  };

  await runPool(pending, async (p) => {
    const key = assetKey(p.rel, cfg);
    const existing = remote.get(key);
    if (existing && existing.fsize === p.size) {
      cache.assets[p.rel] = { size: p.size, mtimeMs: p.mtimeMs };
      counters.skipped++;
    } else {
      try {
        await withRetry(() => uploadOne(cfg, clients, p.rel), `上传 ${p.rel}`);
        cache.assets[p.rel] = { size: p.size, mtimeMs: p.mtimeMs };
        counters.bytes += p.size;
        if (existing) {
          counters.overwritten++;
          refreshUrls.push(assetUrl(p.rel, { ...cfg, fop: "" }));
        } else {
          counters.uploaded++;
        }
      } catch (err) {
        counters.failed++;
        process.stdout.write("\n");
        console.error(`[error] ${err.message}`);
      }
    }
    counters.done++;
    if (counters.done % 25 === 0 || counters.done === total) report();
    if (counters.done % 200 === 0) await saveSoon();
  });
  if (total) process.stdout.write("\n");

  await saveCache(cache);

  // 上传完再拉一次远端清单逐个核对 fsize：能抓出「没传上去」和「只传了一半」的对象。
  // 不用七牛返回的 etag 做校验——那是七牛自己的 etag 算法（实测与内容 md5/sha1 的
  // 各种编码都对不上），硬比只会全量误报；字节级一致性靠抽查下载比对。
  let mismatch = 0;
  if (pending.length) {
    const after = await listRemote(cfg, clients);
    for (const p of pending) {
      if (after.get(assetKey(p.rel, cfg))?.fsize !== p.size) mismatch++;
    }
    if (mismatch) console.error(`[error] 上传后仍有 ${mismatch}/${pending.length} 个对象在远端缺失或尺寸不符`);
    else console.log(`[check] 远端核对通过：${pending.length} 个对象尺寸全部一致`);
  }

  if (refreshUrls.length) {
    try {
      await refreshCdn(cfg, refreshUrls);
      console.log(`[info] 已刷新 CDN 缓存 ${refreshUrls.length} 条`);
    } catch (err) {
      console.warn(`[warn] CDN 刷新失败（不影响本次上传）：${err.message}`);
    }
  }

  console.log(
    `[done] 新增 ${counters.uploaded} / 覆盖 ${counters.overwritten} / 跳过 ${counters.skipped} / 失败 ${counters.failed}`,
  );
  if (counters.failed || mismatch) process.exitCode = 1;
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
