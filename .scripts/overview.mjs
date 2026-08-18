import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { docs } from "./docs.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const encode = (p) => p.replace(/ /g, "%20");
const allPaths = Object.values(docs).flat();

/** 字数规则：中文字符数 + 英文单词数 */
const countWords = (text) => {
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const latin = (
    text
      .replace(/[\u4e00-\u9fa5]/g, " ")
      .match(/[A-Za-z0-9_]+/g) || []
  ).length;
  return cjk + latin;
};

/** 统计一组文章的篇数 / 行数 / 字数 / 字符数（字符数为去空白字符总数） */
const readStats = async (paths) => {
  const stats = { count: 0, lines: 0, words: 0, characters: 0 };
  for (const p of paths) {
    let content;
    try {
      content = await fs.readFile(path.join(root, `${p}.md`), "utf8");
    } catch {
      console.warn(`[warn] 索引中的文章不存在：${p}.md`);
      continue;
    }
    stats.count++;
    stats.lines += content.split("\n").length;
    stats.characters += content.replace(/\s/g, "").length;
    stats.words += countWords(content.replace(/`/g, " "));
  }
  return stats;
};

/** 按 <!-- Name Start/End --> 标记重写目标文件的指定区块 */
const rewriteBlocks = async (file, blocks) => {
  const origin = await fs.readFile(file, "utf8");
  const lines = origin.split("\n");
  const regexp = /<!-- (\S+) (Start|End) -->/;
  const target = [];
  for (let i = 0; i < lines.length; i++) {
    target.push(lines[i]);
    const start = regexp.exec(lines[i].trim());
    if (!start || start[2] !== "Start" || !blocks[start[1]]) continue;
    for (let k = i + 1; k < lines.length; k++) {
      const end = regexp.exec(lines[k].trim());
      if (!end || end[1] !== start[1] || end[2] !== "End") continue;
      target.push(...blocks[start[1]]);
      target.push(lines[k]);
      i = k;
      break;
    }
  }
  await fs.writeFile(file, target.join("\n"));
};

const processREADME = async () => {
  const stats = await readStats(allPaths);
  const summary = [
    `版本库中共有 \`${stats.count}\` 篇文章，总计 \`${stats.lines}\` 行，\`${stats.words}\` 字，\`${stats.characters}\` 字符。`,
  ];
  const content = [];
  for (const [key, value] of Object.entries(docs)) {
    content.push(`## ${key}`);
    for (const item of value) {
      const name = item.split("/").pop();
      if (!name) continue;
      content.push(`* [${name}](${encode(item)}.md)`);
    }
    content.push("");
  }
  await rewriteBlocks(path.join(root, "README.md"), {
    Summary: summary,
    Content: content,
  });
  console.log(`README.md 已更新：${stats.count} 篇文章`);
};

const processTimeline = async () => {
  const timelineFile = path.join(root, "Timeline.md");
  let origin = "";
  try {
    origin = await fs.readFile(timelineFile, "utf8");
  } catch {
    /* 首次生成时文件不存在 */
  }
  // 解析已有记录（日期 + 文章路径），新文章以今天日期插入
  const pathSet = new Set(allPaths);
  const record = [];
  let preLineDate = "";
  for (const line of origin.split("\n")) {
    const date = /(\d{4}-\d{2}-\d{2})/.exec(line);
    if (date) {
      preLineDate = date[1];
      continue;
    }
    // 兼容旧版「第 N 题」写法，统一输出为「第 N 篇」
    const data = /第.+?[题篇]：\[(.+?)\]\((.+?)\)/.exec(line);
    if (data && data[1] && data[2] && preLineDate) {
      const p = decodeURIComponent(data[2]).replace(/\.md$/, "");
      if (pathSet.has(p)) {
        pathSet.delete(p);
        record.push({ date: preLineDate, path: p, name: data[1] });
      }
    }
  }
  if (pathSet.size) {
    // 用本地日期（toISOString 是 UTC，东八区凌晨会被算成前一天）
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    for (const p of pathSet) {
      record.unshift({
        date: today,
        path: p,
        name: p.split("/").pop() || p,
      });
    }
  }
  const stats = await readStats(record.map((item) => item.path));
  const target = [
    "# Timeline",
    "",
    `学习笔记系列共有 ${stats.count} 篇文章，总计 ${stats.lines} 行， ${stats.words} 字， ${stats.characters} 字符。`,
    "",
  ];
  record.forEach((item, index) => {
    target.push(`### ${item.date}`);
    target.push(
      `第 ${stats.count - index} 篇：[${item.name.replace(/\.md$/, "")}](${encode(item.path)}.md)`
    );
    target.push("");
  });
  await fs.writeFile(timelineFile, target.join("\n"));
  console.log(`Timeline.md 已更新：${stats.count} 篇文章`);
};

(async () => {
  await processREADME();
  await processTimeline();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
