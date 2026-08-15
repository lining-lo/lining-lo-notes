# lining-lo-notes 使用说明

这是一套「低摩擦写作 + 自动发布」的学习笔记系统：你只负责写 Markdown，脚本会自动扫描生成文章索引、维护 README 目录与统计、学习时间线，并把笔记（含图片）构建成博客自动发布到 GitHub Pages。

---

## 1. 项目结构

```
lining-lo-notes/
├─ 大模型/                        # 分类目录（自动识别：根目录下除忽略项外的目录都是分类）
│  ├─ LangChain框架.md            # 笔记正文
│  └─ images/                     # 可选：本分类的图片子目录
├─ 后端/
├─ 框架/
├─ CSS/
├─ JavaScript/
├─ Python/
├─ image/                         # 可选：公共图片目录，文章里用 ../image/xxx.png 引用
├─ .scripts/
│  ├─ docs.mjs                    # ★ 文章索引（scan-docs.mjs 自动生成，也可手改）
│  ├─ scan-docs.mjs               # 自动扫描分类目录，重新生成 docs.mjs
│  ├─ overview.mjs                # 更新 README.md 与 Timeline.md
│  └─ sync-site.mjs               # 同步文章+图片到 blog/docs（自动注入页面标题），并生成侧边栏
├─ blog/                          # 博客工程（Rspress）
│  ├─ rspress.config.ts           # 博客配置
│  ├─ sidebar.ts                  # 侧边栏，自动生成，勿手改
│  ├─ theme/                      # 自定义主题（提交入库）：右侧目录显示一级标题、高亮与缩进修复
│  ├─ docs/                       # 博客文章源，自动生成，勿手改
│  ├─ logo/                       # 站点 logo/favicon 源文件（提交入库，sync 时同步进 blog/docs/public）
│  └─ site-dev/                   # 构建产物，自动生成，勿手改
├─ README.md                      # 自动维护（Summary/Content 两个区块）
├─ Timeline.md                    # 自动维护（学习时间线）
├─ USAGE.md                       # 本说明文档
├─ update.cmd                     # 一键：扫描索引 + 更新 README/Timeline + 同步博客
├─ commit.cmd                     # 一键提交并推送
└─ package.json                   # 命令别名
```

## 1.5 环境准备（首次使用）

在终端先确认环境可用：

```
pnpm -v
```

- 能打印版本号（如 `11.16.0`）→ 直接进入下一节
- 提示「pnpm 不是内部或外部命令」→ pnpm 未安装或终端没刷新 PATH，**重开一个终端**再试
- 本机已通过 Node 自带的 corepack 安装好 pnpm（位于 `%LOCALAPPDATA%\pnpm`），正常重开终端即可使用；若以后换机器，安装方式见下方 FAQ

## 2. 快速上手（五步）

1. **写文章**：在某个分类目录新建 `.md` 文件，例如 `大模型/LangChain框架.md`；图片放文章同目录、分类的 `images/` 子目录，或根目录 `image/` 里
2. **扫描**：运行 `update.cmd`（或 `node .scripts/scan-docs.mjs`），自动扫描分类目录生成文章索引，不用手动登记
3. **同步**：`update.cmd` 会继续执行 `overview.mjs` 和 `sync-site.mjs`，README、时间线、博客源文件（含图片）全部自动更新
4. **预览**：`pnpm --dir blog dev`，浏览器打开 http://localhost:3000/lining-lo-notes/
5. **发布**：满意后运行 `commit.cmd`，自动提交并推送到 GitHub，线上博客随之更新

## 3. 日常写作流程（详细）

### 第 1 步：新建文章

- 文件位置：`分类名/标题.md`，例如 `算法/两数之和.md`
- 建议用能看懂的中文文件名，文件名就是文章入口
- **浏览器标签页标题 = 文件名**：`sync-site.mjs` 会自动注入 `title: 文件名`（与左侧侧边栏一致），无需手动写；想自定义标题时在文章开头加 frontmatter（见下）
- 文章推荐格式（含图片示例）：

````markdown
# 两数之和

## 思路

先讲清楚解题思路。

## 实现

```js
const twoSum = (nums, target) => { /* ... */ };
```

## 效果

![运行截图](./screenshot-2026-08-14.png)
````

#### 关于标题（页面标题 / 浏览器标签页）

- **浏览器标签页标题**默认取**文件名**（与左侧侧边栏完全一致），由 `sync-site.mjs` 自动注入 frontmatter `title`，不用手动维护
- 想给某篇文章用自定义标题时，在文章开头加一段 frontmatter 即可，脚本会保留、不覆盖：
  ```markdown
  ---
  title: 我的自定义标题
  ---

  # 章节一
  ```
- 文章里的 `#` 一级标题（如「1.理论概述」）会正常显示在正文，并自动出现在右侧「目录」里（含正确缩进与滚动高亮），由 `blog/theme/` 自定义主题处理，无需额外操作
- 若文章没有 `#` 标题，页面顶部会自动显示文件名作为大标题；有 `#` 标题时正文按原文渲染

### 第 2 步：添加图片

图片有三种放法，任选：

1. **文章同目录**：`算法/screenshot.png`，引用 `![图](./screenshot.png)`
2. **分类的 images/ 子目录**：`算法/images/运行截图.png`，引用 `![图](./images/运行截图.png)`
3. **根目录公共 image/**：`image/架构图.png`，引用 `![图](../image/架构图.png)`（多篇文章共用一张图时最方便；`images/` 目录也兼容）
4. **HTML `<img>` 写法也可以**：`<img src="../image/架构图.png" style="zoom:60%;" />`。`sync-site.mjs` 会自动把它转成 Markdown 写法并同步图片；注意 `style`/`zoom` 等属性**不会**保留（Rspress 不渲染裸 HTML `<img>`，图片会按博客列宽显示）

规则与说明：

- 支持格式：`png / jpg / jpeg / gif / webp / svg / avif / bmp / ico`，子目录会一并同步
- **中文文件名也可以**：博客构建不支持中文文件名，`sync-site.mjs` 会自动把中文名图片改为 ASCII 名（如 `架构图.png` → `img-bfbeb75c.png`）再同步进博客，仓库里的源文件和引用不用改。同步时终端会打印类似日志：
  ```
  [info] 图片已自动改为 ASCII 名同步：image/架构图.png -> image/img-bfbeb75c.png
  ```
- 英文文件名保持原名不动，最省心；引用指向的图片文件不存在时终端会给出 `[warn]` 提示，写完后留意检查
- 小图片会被博客构建内联成 base64；大图片输出到 `static/` 下并自动带 `/lining-lo-notes/` 前缀，无需手动处理
- 建议单张图控制在 1MB 以内；大量大图会拖慢博客首屏

页面底部的 **Last Updated** 显示的是仓库里对应源文章的修改时间（`blog/docs` 由脚本生成、不入库，git 拿不到历史，所以用文件 mtime）；每次保存文章后更新时间会自动变化，无需手动处理。

### 第 3 步：自动扫描索引（不用手动登记）

在仓库根目录运行：

```
node .scripts/scan-docs.mjs
```

它会把仓库根目录下所有分类目录（除 `.git/.github/.scripts/blog/images/node_modules`）里的 `.md` 文件全部扫描进 `.scripts/docs.mjs`：

- **新增文章** → 自动进索引；**删除文章** → 自动从索引消失
- **新建分类** → 建个目录放文章即可，自动识别
- 想调整顺序 → 在文件名前加数字（`01-xxx.md`、`02-xxx.md`），按文件名排序
- 需要精确控制时，也可以手动编辑 `.scripts/docs.mjs`（但会被下次扫描覆盖）

### 第 4 步：运行脚本

一条命令搞定（等价于依次执行 scan-docs + overview + sync）：

```
update.cmd
```

或分开执行：

```
node .scripts/scan-docs.mjs
node .scripts/overview.mjs
node .scripts/sync-site.mjs
```

- `overview.mjs`：重新统计全部文章，重写 `README.md`（文章数/行数/字数/字符数 + 分类目录）和 `Timeline.md`（按「第 N 篇」倒序，新文章以今天日期插入）
- `sync-site.mjs`：把**已登记**的文章和图片复制到 `blog/docs/`，生成博客首页 `blog/docs/index.md` 和侧边栏 `blog/sidebar.ts`

### 第 5 步：本地预览

```
pnpm --dir blog dev
```

打开 http://localhost:3000/lining-lo-notes/ 查看效果。端口被占用时 Rspress 会自动换端口，以终端输出为准。按 `Ctrl+C` 停止。

### 第 6 步：提交推送（发布）

在仓库根目录执行 `commit.cmd`，等价于：

```
git add -A
git commit -m "2026/08/15"
git push
```

推送到 GitHub 的 `master` 分支后，GitHub Actions 会自动构建并发布，几分钟后线上生效。

## 4. 常用命令速查

| 命令 | 作用 |
| --- | --- |
| `update.cmd` | 一键：扫描索引 + 更新 README/Timeline + 同步博客 |
| `node .scripts/scan-docs.mjs` | 自动扫描分类目录，重新生成文章索引 |
| `node .scripts/overview.mjs` | 更新 README 统计/目录 + Timeline |
| `node .scripts/sync-site.mjs` | 同步文章与图片到博客 + 生成侧边栏 |
| `pnpm --dir blog dev` | 本地预览（开发服务器） |
| `pnpm --dir blog build` | 本地构建（产物在 `blog/site-dev/`） |
| `pnpm --dir blog preview` | 本地预览构建产物 |
| `node blog/script/sitemap.mjs` | 生成 `sitemap.xml`（CI 会自动执行） |
| `commit.cmd` | 一键 add + commit + push |
| `pnpm build:site` | 等效 `pnpm --dir blog build` |

## 5. 脚本原理（了解即可）

### README 的两个「魔法区块」

README 里有两段被注释包裹的区域，脚本**只重写**它们，其余内容你可以随便改：

```
<!-- Summary Start --> ... <!-- Summary End -->
<!-- Content Start --> ... <!-- Content End -->
```

### 统计规则

- 行数：按换行符统计
- 字数 = 中文字符数 + 英文单词数（连续的字母/数字/下划线算一个词，统计时不计代码反引号）
- 字符数 = 去掉所有空白字符后的总字符数

### Timeline 规则

- 每次运行会把「索引里有但时间线里没有」的文章以今天日期插入到最上面
- 编号按总数倒序：最新一篇是「第 N 篇」，最早是「第 1 篇」
- 删除文章（删文件 + 重跑扫描）后重跑脚本，条目会自动消失

### 图片同步规则

- 同步时复制各分类目录和根目录 `image/`（或 `images/`）下的所有支持格式图片（含子目录）到 `blog/docs/`
- 文章里引用的中文名图片会额外生成一个 ASCII 名副本（`img-<8位哈希>.png`）并改写博客文章里的引用，仓库源文件不变
- 相对引用（`./`、`./images/`、`../image/`、`../images/` 等指向仓库内图片的写法）都会正确处理；站外 URL、以 `/` 开头的绝对路径保持原样

## 6. 发布到 GitHub Pages（一次性配置）

前提：GitHub 用户名是 `lining-lo`，脚本与配置里已经写死了这个地址。

1. 在 GitHub 网页新建一个**公开**仓库，名字必须叫 `lining-lo-notes`
2. 本地关联远程仓库并推送：
   ```
   git remote add origin https://github.com/lining-lo/lining-lo-notes.git
   git branch -M master
   git push -u origin master
   ```
3. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**
4. 等 Actions 跑完（绿色对勾），访问：
   ```
   https://lining-lo.github.io/lining-lo-notes/
   ```

之后每次 `commit.cmd` 推送都会自动重新构建发布，无需手动操作。

## 7. 常见问题 FAQ

**Q：写完文章执行脚本，README 里没有？**
A：先运行 `node .scripts/scan-docs.mjs` 生成索引（或直接跑 `update.cmd`），再确认分类目录和文件名没问题。

**Q：索引还要手动登记吗？**
A：不用。`scan-docs.mjs` 会自动扫描所有分类目录生成 `.scripts/docs.mjs`，新增/删除文章、新建分类都自动同步。

**Q：浏览器标签页标题（页面标题）为什么是文件名？想改怎么办？**
A：`sync-site.mjs` 同步时会自动给文章注入 `title: 文件名`，所以标签页标题默认和左侧侧边栏一致。想用自定义标题时，在文章开头加 frontmatter：

  ```markdown
  ---
  title: 我的自定义标题
  ---
  ```

脚本会保留你的 `title`，不会覆盖。

**Q：文章删了，但 README / Timeline 里还在？**
A：删掉文件后，运行 `update.cmd`（会自动扫描 + 更新），条目就会消失。

**Q：文章里怎么放图片？图片名能写中文吗？**
A：图片放在文章同目录、分类的 `images/` 子目录或根目录 `image/` 里，用相对路径 `![说明](./文件名.png)` 或 `![说明](../image/文件名.png)` 引用即可。中文文件名也支持：`sync-site.mjs` 会自动把中文名图片改为 ASCII 名（如 `img-xxx.png`）再进博客，源文件无需改名。

**Q：图片在 GitHub 上正常，但博客里显示裂图？**
A：确认 ① 跑过 `update.cmd`（或至少 `node .scripts/sync-site.mjs`）；② 引用路径与图片实际位置一致（注意 `./` 前缀和 `../` 层级）；③ 图片文件已提交（`git add -A` 会包含图片）。改完重新同步 + 推送即可。

**Q：怎么新增一个分类？**
A：直接建一个目录放文章（例如 `工程化/xxx.md`），跑 `update.cmd` 即可自动识别，不用手动登记。

**Q：README 里自己写的内容被覆盖了？**
A：自定义内容请写在 `<!-- Summary Start/End -->` 和 `<!-- Content Start/End -->` 两个区块之外，这两个区块由脚本全量重写。

**Q：本地端口被占用怎么办？**
A：换端口启动，例如 `pnpm --dir blog dev --port 8080`。线上部署不受本地端口影响。

**Q：推送后线上没更新？**
A：去仓库 Actions 页面看 workflow 是否报错；首次部署还需要先在 Settings → Pages 选择「GitHub Actions」。

**Q：提示 pnpm 不是内部或外部命令？**
A：说明 pnpm 没在全局 PATH 里。本机已用 corepack 装到 `%LOCALAPPDATA%\pnpm` 并写入用户 PATH，重开终端即可；新机器可用 `corepack enable --install-directory "$env:LOCALAPPDATA\pnpm"` + `corepack prepare pnpm@11.16.0 --activate` 安装（无需管理员权限）。

**Q：npm 命令用不了（执行策略限制）？**
A：这台机器请一律用 `node` 或 `pnpm`，不要用 `npm run` / `npx`。

**Q：怎么停止后台的 dev 服务器？**
A：在 PowerShell 执行（端口以实际为准）：
```
Get-NetTCPConnection -LocalPort 3000 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## 8. 写作约定（建议）

- 文件名就是文章入口（浏览器标签页标题、左侧侧边栏都取文件名）；文章里的 `#` 用作章节标题，会进右侧「目录」
- 想显示与文件名不同的标题时，用 frontmatter `title:` 覆盖（见上文「关于标题」）
- 代码示例尽量「复制即可运行」，并标注语言（```js、```html、```css）
- 涉及环境配置时，注明操作系统与版本
- 算法题建议记录：思路、复杂度分析、至少一种实现
- 图片用相对路径（`./`、`./images/`、`../image/`、`../images/`），别用绝对路径（`/xxx.png`）或本机路径（`C:\...`）
- 随笔不求体系完整，贵在真实与持续
