import { defineConfig } from "rspress/config";
import { sidebar } from "./sidebar";
import fs from "node:fs";
import path from "node:path";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { collectFenceLanguages, highlightLanguageAliases, remarkNormalizeCodeLang } from "./highlight-languages";

const blogDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(blogDir, "..");

// 文章底部的 "Last Updated"：按「该文件的最后一次 git 提交时间」算。
// 不能用文件 mtime —— CI 每次都是全新 clone（所有文件 mtime 都等于 checkout 那一刻），
// 本地 blog/docs 又是 sync-site.mjs 一次性生成的，同样会得到同一个时间。
let lastCommitTimes: Map<string, string> | null = null;
function loadLastCommitTimes(): Map<string, string> {
  if (lastCommitTimes) return lastCommitTimes;
  const map = new Map<string, string>();
  try {
    // 一次拿到所有文件的最后提交时间：日志从新到旧，某个路径第一次出现即为最后一次修改
    const out = execFileSync(
      "git",
      ["-c", "core.quotepath=false", "log", "--format=@@date %cI", "--name-only"],
      {
        cwd: repoRoot,
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        stdio: ["ignore", "pipe", "ignore"],
      },
    );
    let current = "";
    for (const line of out.split(/\r?\n/)) {
      const text = line.trim();
      if (text.startsWith("@@date ")) {
        current = text.slice("@@date ".length);
      } else if (text && current && !map.has(text)) {
        map.set(text, current);
      }
    }
  } catch {
    // 没有 git（或不是仓库）时退回文件 mtime
  }
  lastCommitTimes = map;
  return map;
}

const lastUpdatedPlugin = {
  name: "local-last-updated",
  extendPageData(pageData: { _filepath?: string; _relativePath?: string; lang?: string }) {
    // _relativePath 是相对 docs 根目录的路径（如 Java/08_常用API.md），
    // 正好对应仓库根目录里的源文章，不用再猜 blog/docs 的绝对路径
    const rel = (pageData._relativePath || "").replace(/\\/g, "/");
    const iso = rel ? loadLastCommitTimes().get(rel) : undefined;
    let date = iso ? new Date(iso) : null;
    if (!date || Number.isNaN(date.getTime())) {
      // 未提交的新文章 / 生成的 index.md：退回文件 mtime
      for (const candidate of [rel ? path.join(repoRoot, rel) : "", pageData._filepath]) {
        if (!candidate) continue;
        try {
          date = fs.statSync(candidate).mtime;
          break;
        } catch {}
      }
    }
    if (date) {
      pageData.lastUpdatedTime = date.toLocaleString(pageData.lang || "zh-CN");
    }
  },
};

// Rspress 只会把「文章里原样出现过的语言名」注册进 Prism，而且大小写敏感。
// 这里构建时扫一遍文章，把真实用到的语言（统一小写）补进 extraHighlightLanguages，
// 这样 ```Java 这类写法也能拿到对应语法包。
const extraHighlightLanguages: string[] = [];
const collectedLanguages = new Set<string>();
const highlightLanguagesPlugin = {
  name: "highlight-languages",
  extendPageData(pageData: { _filepath?: string; extraHighlightLanguages?: string[] }) {
    // Rspress 只读取 siteData.pages[0].extraHighlightLanguages，所以每页挂同一个数组引用
    pageData.extraHighlightLanguages = extraHighlightLanguages;
    if (!pageData._filepath) return;
    let content: string;
    try {
      content = fs.readFileSync(pageData._filepath, "utf8");
    } catch {
      return;
    }
    for (const lang of collectFenceLanguages(content)) {
      if (collectedLanguages.has(lang)) continue;
      collectedLanguages.add(lang);
      extraHighlightLanguages.push(lang);
    }
  },
};

export default defineConfig({
  root: "docs",
  outDir: "site-dev",
  // 自定义主题目录：覆盖 Aside 组件，修复切换文章后右侧目录高亮失效的问题
  themeDir: path.join(blogDir, "theme"),
  base: "/lining-lo-notes/",
  icon: "/favicon.ico",
  logo: "/logo.png",
  route: {
    include: ["docs/**/*.md"],
  },
  plugins: [lastUpdatedPlugin, highlightLanguagesPlugin],
  title: "lining-lo 的学习笔记",
  description: "lining-lo 学习笔记博客",
  lang: "zh-cn",
  markdown: {
    // mdx-rs 是 Rust 编译路径，不会执行下面的 remark/rehype 插件；
    // 关闭后走 JS 管线，才能用 remark-math + rehype-katex 渲染 $...$ / $$...$$。
    mdxRs: false,
    // 语言别名 + 围栏语言统一转小写，见 highlight-languages.ts
    highlightLanguages: highlightLanguageAliases,
    remarkPlugins: [remarkNormalizeCodeLang, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  // KaTeX 插件只生成结构，字体和布局样式需要单独引入。
  globalStyles: path.join(blogDir, "styles", "global.css"),
  head: [["link", { rel: "apple-touch-icon", href: "/lining-lo-notes/apple-touch-icon.png" }]],
  themeConfig: {
    lastUpdated: true,
    outlineTitle: "目录",
    enableContentAnimation: true,
    sidebar,
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/lining-lo/lining-lo-notes",
      },
    ],
  },
  builderConfig: {
    output: {
      copy: {
        patterns: [
          {
            // 把 docs 下的非 md 资源（图片等）原样复制到产物，供 HTML <img> 等原始引用使用
            from: "docs",
            to: "",
            filter: (filePath: string) =>
              !filePath.endsWith(".md") && !filePath.endsWith(".DS_Store"),
          },
        ],
      },
    },
  },
});
