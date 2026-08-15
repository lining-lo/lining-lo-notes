import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// 不当作分类的顶层目录（以 . 开头的目录也自动忽略）
const IGNORE = new Set([".git", ".github", ".scripts", "blog", "images", "image", "node_modules"]);
const cmp = (a, b) => a.localeCompare(b, "zh-CN");

const scan = async () => {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const groups = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !IGNORE.has(e.name))
    .map((e) => e.name)
    .sort(cmp);
  const docs = {};
  for (const g of groups) {
    const files = await fs.readdir(path.join(root, g), { recursive: true });
    const items = files
      .filter((f) => f.endsWith(".md"))
      .map((f) => `${g}/${f.replace(/\.md$/, "")}`)
      .sort(cmp);
    if (items.length) docs[g] = items;
  }
  const lines = [
    "// 文章索引：由 `node .scripts/scan-docs.mjs` 自动生成，也可手动修改",
    "// 扫描规则：仓库根目录下除 .git/.github/.scripts/blog/images/image/node_modules 外的目录均视为分类，分类下所有 .md 均登记",
    `export const docs = ${JSON.stringify(docs, null, 2)};`,
    "",
  ];
  await fs.writeFile(path.join(root, ".scripts", "docs.mjs"), lines.join("\n"));
  const total = Object.values(docs).flat().length;
  console.log(`docs.mjs 已自动生成：${groups.length} 个分类，${total} 篇文章`);
  if (!groups.length) console.log("[warn] 未扫描到任何分类目录");
};

scan().catch((err) => {
  console.error(err);
  process.exit(1);
});