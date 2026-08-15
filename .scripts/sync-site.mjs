import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { docs } from "./docs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blog = path.join(root, "blog");
const docsDir = path.join(blog, "docs");
const encode = (p) => p.replace(/ /g, "%20");
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".avif", ".bmp", ".ico"]);

/** 给文章补 frontmatter title：默认取文件名（与左侧侧边栏文本一致）；文章自带 frontmatter title 时以文章为准 */
const injectTitle = (content, mdName) => {
  const title = mdName
    .replace(/\.md$/, "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (fmMatch) {
    // 已有 frontmatter：有 title 字段则保持原样，否则补一行
    if (/^title\s*:/m.test(fmMatch[1])) return content;
    const rest = content.slice(fmMatch[0].length).replace(/^\s*\r?\n/, "");
    return `---\n${fmMatch[1]}\ntitle: "${title}"\n---\n\n${rest}`;
  }
  return `---\ntitle: "${title}"\n---\n\n${content}`;
};

/** 非 ASCII 图片名 -> ASCII 名（博客构建不支持中文文件名）。hash 基于仓库相对路径，保证多篇文章引用同一张图时名字一致 */
const asciiImageName = (repoRel) => {
  const dir = path.posix.dirname(repoRel);
  const ext = path.extname(repoRel).toLowerCase();
  const hash = createHash("sha1").update(repoRel).digest("hex").slice(0, 8);
  return `${dir === "." ? "" : dir + "/"}img-${hash}${ext}`;
};

const isImage = (rel) => IMAGE_EXT.has(path.extname(rel).toLowerCase());

/** 把文章里的相对引用（./x、../images/x 等）解析为仓库相对路径，越界返回 null */
const toRepoRel = (articleGroup, ref) => {
  let decoded = ref;
  try {
    decoded = decodeURIComponent(ref);
  } catch {}
  const normalized = path.posix.normalize(decoded.replace(/\\/g, "/"));
  const abs = path.resolve(path.join(root, articleGroup, normalized));
  if (!abs.startsWith(path.resolve(root))) return null;
  return path.relative(root, abs).replace(/\\/g, "/");
};

/** 解析并复制文章引用的图片到博客，返回博客内相对路径（如 ../images/img-xxx.jpg）；无法处理返回 null */
const resolveImage = async (group, ref) => {
  const repoRel = toRepoRel(group, ref);
  if (!repoRel || !isImage(repoRel)) return null;
  const srcAbs = path.join(root, repoRel);
  let buf;
  try {
    buf = await fs.readFile(srcAbs);
  } catch {
    return null;
  }
  const finalRel = /[^\x00-\x7F]/.test(repoRel) ? asciiImageName(repoRel) : repoRel;
  const blogAbs = path.join(docsDir, finalRel);
  await fs.mkdir(path.dirname(blogAbs), { recursive: true });
  await fs.writeFile(blogAbs, buf);
  if (/[^\x00-\x7F]/.test(repoRel)) {
    console.log(`[info] 图片已自动改为 ASCII 名同步：${repoRel} -> ${finalRel}`);
  }
  return path.relative(path.join(docsDir, group), blogAbs).replace(/\\/g, "/");
};

/** 同步各分类文章与图片到 blog/docs */
const syncDocs = async () => {
  await fs.rm(docsDir, { recursive: true, force: true });
  await fs.mkdir(docsDir, { recursive: true });
  for (const group of Object.keys(docs)) {
    const to = path.join(docsDir, group);
    await fs.mkdir(to, { recursive: true });
    for (const item of docs[group]) {
      const mdName = item.split("/").pop();
      const srcMd = path.join(root, `${item}.md`);
      let content = (await fs.readFile(srcMd, "utf8")).replace(/^\uFEFF/, "");
      content = injectTitle(content, mdName);
      const replaces = [];
      // 代码块围栏区间（\`\`\` ... \`\`\`），其中的图片语法视为教学示例/代码片段，不处理
      const codeRanges = [];
      {
        const fenceRe = /^```/gm;
        let fm, fenceStart = -1;
        while ((fm = fenceRe.exec(content))) {
          if (fenceStart === -1) fenceStart = fm.index;
          else {
            codeRanges.push([fenceStart, fm.index]);
            fenceStart = -1;
          }
        }
      }
      const inCode = (pos) => codeRanges.some(([s, e]) => pos >= s && pos < e);
      const inInlineCode = (pos) => {
        const lineStart = content.lastIndexOf("\n", pos) + 1;
        const before = content.slice(lineStart, pos);
        return ((before.match(/`/g) || []).length % 2) === 1;
      };

      // Markdown 图片写法：![alt](相对路径)
      const mdImg = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let m;
      while ((m = mdImg.exec(content))) {
        if (inCode(m.index) || inInlineCode(m.index)) continue;
        const ref = m[2].trim();
        if (/^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith("/") || ref.startsWith("#")) continue;
        const blogRel = await resolveImage(group, ref);
        if (!blogRel) {
          console.warn(`[warn] 图片引用不存在，请检查路径：${item}.md -> ${ref}`);
          continue;
        }
        const refText = blogRel.startsWith(".") ? blogRel : `./${blogRel}`;
        replaces.push({ start: m.index, end: mdImg.lastIndex, text: `![${m[1]}](${refText})` });
      }
      // HTML 图片写法：<img src="相对路径" ...> → 转成 Markdown 写法（Rspress 不渲染裸 HTML <img>）
      const htmlImg = /<img\b[^>]*>/g;
      while ((m = htmlImg.exec(content))) {
        if (inCode(m.index) || inInlineCode(m.index)) continue;
        const srcMatch = m[0].match(/\bsrc="([^"]+)"/);
        if (!srcMatch) continue;
        const ref = srcMatch[1].trim();
        if (/^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith("/") || ref.startsWith("#")) continue;
        const blogRel = await resolveImage(group, ref);
        if (!blogRel) {
          console.warn(`[warn] 图片引用不存在，请检查路径：${item}.md -> ${ref}`);
          continue;
        }
        const refText = blogRel.startsWith(".") ? blogRel : `./${blogRel}`;
        const alt = path.basename(ref, path.extname(ref));
        replaces.push({ start: m.index, end: htmlImg.lastIndex, text: `![${alt}](${refText})` });
      }
      replaces.sort((a, b) => b.start - a.start);
      for (const r of replaces) {
        content = content.slice(0, r.start) + r.text + content.slice(r.end);
      }
      await fs.writeFile(path.join(to, `${mdName}.md`), content);
    }
  }
  // 同步各分类目录下的图片（含子目录），未引用的图片也一起带上
  for (const group of Object.keys(docs)) {
    const from = path.join(root, group);
    const entries = await fs.readdir(from, { recursive: true });
    for (const rel of entries) {
      if (!isImage(rel)) continue;
      const dst = path.join(docsDir, group, rel);
      await fs.mkdir(path.dirname(dst), { recursive: true });
      await fs.copyFile(path.join(from, rel), dst);
    }
  }
  // 同步根目录公共图片目录（image/ 或 images/，支持 ../image/xxx.png 或 ../images/xxx.png 引用）
  for (const imgRoot of ["image", "images"]) {
    const from = path.join(root, imgRoot);
    try {
      const entries = await fs.readdir(from, { recursive: true });
      for (const rel of entries) {
        if (!isImage(rel)) continue;
        const dst = path.join(docsDir, imgRoot, rel);
        await fs.mkdir(path.dirname(dst), { recursive: true });
        await fs.copyFile(path.join(from, rel), dst);
      }
    } catch {}
  }
  // 同步博客公共资源（logo/favicon 等）到 blog/docs/public/，供 rspress.config 引用
  const logoDir = path.join(blog, "logo");
  try {
    const entries = await fs.readdir(logoDir);
    for (const rel of entries) {
      if (rel.startsWith(".")) continue;
      const dst = path.join(docsDir, "public", rel);
      await fs.mkdir(path.dirname(dst), { recursive: true });
      await fs.copyFile(path.join(logoDir, rel), dst);
    }
    console.log("blog/docs/public 已同步（logo/favicon）");
  } catch {}
  console.log("blog/docs 已同步");
};

/** 生成博客欢迎页 */
const writeIndex = async () => {
  const lines = [
    "# lining-lo 的学习笔记",
    "",
    "> 学习如春起之苗，不见其增，日有所长；辍学如磨刀之石，不见其损，日有所亏。",
    "",
    "这里记录学习过程中的知识点、踩坑经验与随笔。仓库：[lining-lo-notes](https://github.com/lining-lo/lining-lo-notes)",
    "",
    "## 分类",
    "",
  ];
  for (const [key, value] of Object.entries(docs)) {
    lines.push(`### ${key}`);
    for (const item of value) {
      const name = item.split("/").pop();
      if (!name) continue;
      lines.push(`- [${name}](${encode(item)}.md)`);
    }
    lines.push("");
  }
  await fs.writeFile(path.join(docsDir, "index.md"), lines.join("\n"));
  console.log("blog/docs/index.md 已生成");
};

/** 生成 Rspress 侧边栏配置 */
const writeSidebar = async () => {
  const inside = [{ text: "BLOG", link: "index" }];
  for (const [key, value] of Object.entries(docs)) {
    // 用显式 { text, link } 对象，避免 Rspress 从文章里自动抓标题当侧边栏文本
    inside.push({
      text: key,
      collapsed: true,
      items: value.map((item) => ({ text: item.split("/").pop(), link: `/${item}` })),
    });
  }
  const body = JSON.stringify({ "/": inside }, null, 2);
  const footer = [
    "type SidebarItem =",
    "| {",
    "   text: string;",
    "   link: string;",
    "    tag?: string;",
    "  }",
    "| string;",
    "interface SidebarGroup {",
    "  text: string;",
    "  link?: string;",
    "  items?: SidebarItem[];",
    "  collapsible?: boolean;",
    "  collapsed?: boolean;",
    "  tag?: string;",
    "}",
    "type Sidebar = Record<string, (SidebarGroup | string)[]>;",
  ];
  const sidebarPath = path.join(blog, "sidebar.ts");
  const tmpSidebar = sidebarPath + ".tmp";
  await fs.writeFile(tmpSidebar, "export const sidebar: Sidebar = " + body + "\n" + footer.join("\n"));
  await fs.rename(tmpSidebar, sidebarPath);
  console.log("blog/sidebar.ts 已生成");
};

(async () => {
  await syncDocs();
  await writeIndex();
  await writeSidebar();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
