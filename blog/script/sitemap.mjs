import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { docs } from "../../.scripts/docs.mjs";

const blog = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(blog, "site-dev");
const domain = "https://lining-lo.github.io";
const base = "/lining-lo-notes/";

const urls = [`${domain}${base}`];
for (const p of Object.values(docs).flat()) {
  const route = p
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  urls.push(`${domain}${base}${route}`);
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset`,
  `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"`,
  `  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9`,
  `    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"`,
  `>`,
];
for (const url of urls) {
  xml.push(`  <url>`);
  xml.push(`    <loc>${url}</loc>`);
  xml.push(`    <priority>1.0</priority>`);
  xml.push(`  </url>`);
}
xml.push(`</urlset>`);

await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(path.join(outDir, "sitemap.xml"), xml.join("\n"));
console.log("sitemap.xml 已生成");