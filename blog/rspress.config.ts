import { defineConfig } from "rspress/config";
import { sidebar } from "./sidebar";
import fs from "node:fs";
import path from "node:path";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { fileURLToPath } from "node:url";

const blogDir = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(blogDir, "docs");
const repoRoot = path.resolve(blogDir, "..");

// 博客源文件在 blog/docs/ 下（由脚本生成、不入库），git 拿不到更新时间，
// 这里映射回仓库根目录的源文章，用文件修改时间作为 Last Updated
const lastUpdatedPlugin = {
  name: "local-last-updated",
  extendPageData(pageData: { _filepath?: string; lang?: string }) {
    const abs = pageData._filepath;
    if (!abs) return;
    let src = abs;
    if (abs.startsWith(docsDir)) {
      const rel = path.relative(docsDir, abs);
      const mapped = path.join(repoRoot, rel);
      if (fs.existsSync(mapped)) src = mapped;
    }
    try {
      const stat = fs.statSync(src);
      pageData.lastUpdatedTime = new Date(stat.mtime).toLocaleString(pageData.lang || "zh-CN");
    } catch {}
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
  plugins: [lastUpdatedPlugin],
  title: "lining-lo 的学习笔记",
  description: "lining-lo 学习笔记博客",
  lang: "zh-cn",
  markdown: {
    // mdx-rs 是 Rust 编译路径，不会执行下面的 remark/rehype 插件；
    // 关闭后走 JS 管线，才能用 remark-math + rehype-katex 渲染 $...$ / $$...$$。
    mdxRs: false,
    remarkPlugins: [remarkMath],
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
