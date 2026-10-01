/**
 * Prism 代码高亮的语言配置。
 *
 * Rspress 默认用 Prism（react-syntax-highlighter）高亮，有两个坑：
 * 1. 语言名大小写敏感，```Java 这种写法会被当成未知语言直接丢掉；
 * 2. 只注册「文章里原样出现过的语言名」，别名（sh / mysql / vue…）并不是 Prism
 *    真实存在的语法名，写上去只会渲染成没有着色的纯文本。
 *
 * 处理办法：围栏语言统一转小写 -> 用别名表映射到 Prism 规范名 -> 构建时把文章里
 * 实际用到的语言追加到页面的 extraHighlightLanguages（见 rspress.config.ts）。
 */

/** remark 插件里用到的 mdast 节点，只声明这里关心的字段 */
interface MdastNode {
  type?: string;
  lang?: string;
  children?: MdastNode[];
}

/** 行首的 ``` / ~~~ 围栏，第一组是紧跟围栏的语言标记 */
const FENCE_LANGUAGE_RE = /^[ \t]*(?:`{3,}|~{3,})[ \t]*([^\s`~]*)/gm;

/**
 * [别名, Prism 规范名]。
 * 别名是大家习惯写、但 Prism 里不存在的名字，规范名必须是
 * react-syntax-highlighter/dist/cjs/languages/prism 下真实存在的模块。
 */
export const highlightLanguageAliases: [string, string][] = [
  // JS / TS 家族
  ["js", "javascript"],
  ["mjs", "javascript"],
  ["cjs", "javascript"],
  ["node", "javascript"],
  ["nodejs", "javascript"],
  ["node.js", "javascript"],
  ["ts", "typescript"],
  ["mts", "typescript"],
  ["cts", "typescript"],
  ["jsx", "tsx"],
  ["md", "markdown"],
  ["mdx", "tsx"],
  ["yml", "yaml"],
  // Shell / 终端
  ["sh", "bash"],
  ["shell", "bash"],
  ["shellscript", "bash"],
  ["zsh", "bash"],
  ["console", "bash"],
  ["terminal", "bash"],
  ["curl", "bash"],
  ["ps1", "powershell"],
  ["bat", "batch"],
  ["cmd", "batch"],
  // C 家族与其它语言别名
  ["c++", "cpp"],
  ["cplusplus", "cpp"],
  ["c#", "csharp"],
  ["cs", "csharp"],
  ["objective-c", "objectivec"],
  ["objc", "objectivec"],
  ["f#", "fsharp"],
  ["vb", "vbnet"],
  ["golang", "go"],
  ["py", "python"],
  ["rb", "ruby"],
  ["rs", "rust"],
  ["kt", "kotlin"],
  // 数据库
  ["mysql", "sql"],
  ["mariadb", "sql"],
  ["postgres", "sql"],
  ["postgresql", "sql"],
  ["pgsql", "sql"],
  ["sqlite", "sql"],
  ["mssql", "sql"],
  ["sqlserver", "sql"],
  ["tsql", "sql"],
  ["pl/sql", "plsql"],
  // 标记与模板语言（Prism 里 HTML/XML/Vue 都属于 markup 语法）
  ["html", "markup"],
  ["html5", "markup"],
  ["htm", "markup"],
  ["xhtml", "markup"],
  ["xml", "markup"],
  ["svg", "markup"],
  ["vue", "markup"],
  ["svelte", "markup"],
  ["astro", "markup"],
  ["jinja", "django"],
  ["jinja2", "django"],
  ["hbs", "handlebars"],
  ["mustache", "handlebars"],
  // 配置与基础设施
  ["dockerfile", "docker"],
  ["docker-compose", "yaml"],
  ["k8s", "yaml"],
  ["kubernetes", "yaml"],
  ["make", "makefile"],
  ["mk", "makefile"],
  ["terraform", "hcl"],
  ["tf", "hcl"],
  ["proto", "protobuf"],
  ["regexp", "regex"],
  ["jsonc", "json5"],
  ["env", "ini"],
  ["dotenv", "ini"],
  // 文档排版
  ["patch", "diff"],
  ["rest", "http"],
  ["tex", "latex"],
];

/** 从 Markdown 文本里取出所有代码围栏语言：去空白、转小写、去重 */
export function collectFenceLanguages(markdown: string): string[] {
  const langs = new Set<string>();
  for (const match of markdown.matchAll(FENCE_LANGUAGE_RE)) {
    const lang = match[1].trim().toLowerCase();
    if (lang) langs.add(lang);
  }
  return [...langs];
}

/** remark 插件：把代码块的语言标记转成小写，Prism 只认小写语法名 */
export const remarkNormalizeCodeLang = () => (tree: MdastNode) => {
  const walk = (node: MdastNode) => {
    if (node.type === "code" && typeof node.lang === "string") {
      node.lang = node.lang.toLowerCase();
    }
    for (const child of node.children ?? []) walk(child);
  };
  walk(tree);
};
