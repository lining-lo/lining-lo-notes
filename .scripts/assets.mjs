import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** 仓库根目录 */
export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * 仓库内置默认配置。
 *
 * 这几个值**不是机密**，必须提交入库：CI 里也要拼图片地址，而 CI 拿不到 `.env`。
 * 只有 AK/SK 走 `.env`，永不入库。
 */
export const DEFAULTS = {
  bucket: "dev-wallpaper",
  domain: "https://lining-lo.top",
  prefix: "lining-lo-notes/",
  /** 七牛图片处理参数；留空表示原图直出 */
  fop: "",
};

export const IMAGE_EXT = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".avif",
  ".bmp",
  ".ico",
]);

/** 判断仓库相对路径是不是图片（只看扩展名，大小写无关） */
export const isImage = (repoRel) => IMAGE_EXT.has(path.extname(repoRel).toLowerCase());

/** 根目录下不当作分类、也不扫描图片的目录（与 scan-docs.mjs 保持一致） */
export const IGNORE_DIRS = new Set([
  ".git",
  ".github",
  ".scripts",
  "blog",
  "images",
  "image",
  "node_modules",
]);

/** 读根目录 `.env`（不存在则返回空对象），只做最朴素的 KEY=VALUE 解析 */
export const readDotEnv = async (rootDir = root) => {
  const out = {};
  let text;
  try {
    text = await fs.readFile(path.join(rootDir, ".env"), "utf8");
  } catch {
    return out;
  }
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    const quoted =
      value.length >= 2 &&
      ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")));
    if (quoted) {
      // 带引号：原样取值，里面的 # 也算内容
      value = value.slice(1, -1);
    } else {
      // 不带引号：行内 ` #...` 之后视为注释，避免最后填的注释被当成密钥的一部分
      value = value.replace(/\s+#.*$/, "").trim();
    }
    if (key) out[key] = value;
  }
  return out;
};

/** 合并配置：代码默认值 < `.env` < 进程环境变量 */
export const loadAssetConfig = async (rootDir = root) => {
  const env = { ...(await readDotEnv(rootDir)), ...process.env };
  const domain = (env.QINIU_DOMAIN || DEFAULTS.domain).replace(/\/+$/, "");
  const rawPrefix = env.QINIU_PREFIX ?? DEFAULTS.prefix;
  const prefix = !rawPrefix ? "" : rawPrefix.endsWith("/") ? rawPrefix : `${rawPrefix}/`;
  return {
    ak: env.QINIU_AK || "",
    sk: env.QINIU_SK || "",
    bucket: env.QINIU_BUCKET || DEFAULTS.bucket,
    domain,
    prefix,
    fop: env.QINIU_FOP ?? DEFAULTS.fop,
  };
};

/**
 * 仓库相对路径 → CDN 路径，逐段编码。
 *
 * 不用 `encodeURI`：它不编码 `#` 和 `?`，会直接把地址截断（`#` 之后全被当成 fragment）。
 * 换成 `encodeURIComponent` 后还要补一层：按 ECMAScript 规范它**也不编码** `(` `)` `'`，
 * 而这三个字符在 Markdown 的 `![](...)` 语法里是敏感的。
 */
export const encodeAssetPath = (repoRel) =>
  repoRel
    .split("/")
    .map((seg) =>
      encodeURIComponent(seg).replace(/[()']/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`),
    )
    .join("/");

/** 图片在七牛上的 key：前缀 + 原始仓库相对路径（不编码，控制台里看得见原名） */
export const assetKey = (repoRel, cfg) => cfg.prefix + repoRel;

/** 图片的公开访问地址 */
export const assetUrl = (repoRel, cfg) => {
  const url = `${cfg.domain}/${encodeAssetPath(assetKey(repoRel, cfg))}`;
  return cfg.fop ? `${url}?${cfg.fop}` : url;
};

/**
 * 扫描仓库里所有图片，返回仓库相对路径数组（`/` 分隔、已排序）。
 *
 * 包含根公共图片目录 `image/`、`images/`，以及各分类目录下的全部图片。
 * 取全部而不是只取被引用到的，避免未引用的图片在迁移后被静默丢掉。
 */
export const scanImageFiles = async (rootDir = root) => {
  const out = [];
  const walk = async (absDir, relDir) => {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    for (const e of entries) {
      const rel = relDir ? `${relDir}/${e.name}` : e.name;
      if (e.isDirectory()) await walk(path.join(absDir, e.name), rel);
      else if (e.isFile() && isImage(rel)) out.push(rel);
    }
  };
  for (const imgRoot of ["image", "images"]) {
    try {
      await walk(path.join(rootDir, imgRoot), imgRoot);
    } catch {
      /* 可选目录，不存在就跳过 */
    }
  }
  const top = await fs.readdir(rootDir, { withFileTypes: true });
  for (const e of top) {
    if (!e.isDirectory() || e.name.startsWith(".") || IGNORE_DIRS.has(e.name)) continue;
    await walk(path.join(rootDir, e.name), e.name);
  }
  return out.sort((a, b) => a.localeCompare(b, "zh-CN"));
};
