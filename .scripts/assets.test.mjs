import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DEFAULTS, assetKey, assetUrl, encodeAssetPath, isImage, readDotEnv } from "./assets.mjs";

const cfg = { ...DEFAULTS };

test("isImage 只看扩展名，大小写无关", () => {
  assert.equal(isImage("a/b/photo.PNG"), true);
  assert.equal(isImage("a/b/pic.jpeg"), true);
  assert.equal(isImage("a/b/notes.md"), false);
  assert.equal(isImage("a/b/noext"), false);
});

test("encodeAssetPath 逐段编码并保留斜杠", () => {
  assert.equal(
    encodeAssetPath("lining-lo-notes/大模型/images/a b.png"),
    "lining-lo-notes/%E5%A4%A7%E6%A8%A1%E5%9E%8B/images/a%20b.png",
  );
});

test("encodeAssetPath 编码会截断 URL 的 # 和 ?", () => {
  // encodeURI 对这两个是放过的，结果 # 之后全被当 fragment、? 之后全被当 query
  assert.equal(encodeAssetPath("a/x#y?.png"), "a/x%23y%3F.png");
  assert.equal(encodeAssetPath("a/100%&plus+.png"), "a/100%25%26plus%2B.png");
});

test("encodeAssetPath 补转义 encodeURIComponent 漏掉的 ( ) '", () => {
  assert.equal(encodeAssetPath("a/shot (1).png"), "a/shot%20%281%29.png");
  assert.equal(encodeAssetPath("a/it's.png"), "a/it%27s.png");
});

test("assetKey 用前缀 + 原始路径，不做编码", () => {
  assert.equal(assetKey("大模型/images/x.png", cfg), "lining-lo-notes/大模型/images/x.png");
});

test("assetUrl 拼出公开地址", () => {
  assert.equal(
    assetUrl("Java/images/image-20261002171432.png", cfg),
    "https://lining-lo.top/lining-lo-notes/Java/images/image-20261002171432.png",
  );
});

test("assetUrl 中文目录按段编码", () => {
  assert.equal(
    assetUrl("大模型/images/x.png", cfg),
    "https://lining-lo.top/lining-lo-notes/%E5%A4%A7%E6%A8%A1%E5%9E%8B/images/x.png",
  );
});

test("fop 留空时不追加查询串，配置后追加", () => {
  assert.equal(assetUrl("a/x.png", cfg), "https://lining-lo.top/lining-lo-notes/a/x.png");
  assert.equal(
    assetUrl("a/x.png", { ...cfg, fop: "imageMogr2/format/webp" }),
    "https://lining-lo.top/lining-lo-notes/a/x.png?imageMogr2/format/webp",
  );
});

test("readDotEnv 解析 .env：忽略整行注释、去引号、丢掉行内注释", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dotenv-"));
  try {
    fs.writeFileSync(
      path.join(dir, ".env"),
      [
        "# 整行注释，应忽略",
        "",
        "QINIU_AK=abc123",
        "QINIU_SK='has spaces'",
        'QINIU_BUCKET="dev-wallpaper"',
        "QINIU_FOP=imageMogr2/format/webp   # 行内注释要丢掉",
        'QINIU_PREFIX="keep # this"',
        "NOEQUALS",
      ].join("\n"),
    );
    assert.deepEqual(await readDotEnv(dir), {
      QINIU_AK: "abc123",
      QINIU_SK: "has spaces",
      QINIU_BUCKET: "dev-wallpaper",
      QINIU_FOP: "imageMogr2/format/webp",
      QINIU_PREFIX: "keep # this",
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("readDotEnv 在没有 .env 时返回空对象", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "dotenv-empty-"));
  try {
    assert.deepEqual(await readDotEnv(dir), {});
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
