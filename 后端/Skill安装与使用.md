﻿# Skill 安装与使用

> Skill（技能）是 Codex 里"把一类重复任务做成固定流程"的机制：放一堆说明文字和辅助脚本，Codex 遇到匹配的任务时自动照着做。

## 1. Skill 简介

**一句话**：Skill 是一个文件夹，里面至少有一个 `SKILL.md`，告诉 Codex"这类任务应该怎么做"。

一个典型 Skill 目录：

```text
my-skill/
├── SKILL.md            # 必选：技能说明 + 使用指令
├── agents/
│   └── openai.yaml     # 可选：App 界面显示的元数据（名称、简介、默认提示词）
├── scripts/            # 可选：可执行脚本
├── references/         # 可选：按需加载的参考资料
└── assets/             # 可选：模板、图标等资源
```

`SKILL.md` 由两部分组成：

- **YAML frontmatter**（必填）：只有 `name` 和 `description` 两个字段。这是 Codex 决定"什么时候用这个技能"的唯一依据。
- **正文**（Markdown 指令）：技能被触发后才会加载。

**关键机制——惰性加载（progressive disclosure）**：
Codex 平时只看到每个技能的 `name` 和 `description`（很小）；只有任务匹配时，才加载完整的正文指令。这样不会浪费上下文窗口。

**存放位置**：把技能文件夹放进自动发现目录即可全局生效：

- `$CODEX_HOME/skills/`（本机是 `D:\SoftwareData\Codex\home\skills\`）
- 未设置 `CODEX_HOME` 时默认是 `~/.codex/skills/`（Windows 即 `C:\Users\你的用户名\.codex\skills\`）
- 项目内还可以放 `.codex/skills/`，只对该项目生效

## 2. Skill 和 Plugin 的区别

| 维度 | Skill（技能） | Plugin（插件） |
|---|---|---|
| 本质 | 一段"工作流说明"，核心是 `SKILL.md` | 一个可安装、可分享的"打包单元" |
| 必选文件 | `SKILL.md` | `.codex-plugin/plugin.json`（清单） |
| 能包含什么 | 指令 + 脚本/参考/资源 | 技能、MCP 服务、Hooks、App 集成、资源 |
| 定位 | 个人/项目级复用 | 团队协作、版本化、公开发布 |
| 安装方式 | 复制文件夹到 `skills` 目录 | 通过 Marketplace 安装 |

**关系**：Plugin 可以**打包多个 Skill**。Skill 是"内容"，Plugin 是"分发包装"。

官方给出的选择建议：

- **只用 Skill**：现有工具 + 指令就足够完成工作流。
- **Skill + MCP**：工作流需要调用你的 MCP 工具时，用 Skill 指导模型怎么用这些工具。
- **Plugin**：需要把技能、MCP、Hooks 等打包分享给别人时。

## 3. 安装他人的 Skill

三种方式：

1. **让 Codex 帮你装（推荐）**：直接说"帮我安装 xxx 技能"。Codex 会用 `skill-installer` 从官方精选列表（`github.com/openai/skills` 的 `.curated`）或任意 GitHub 仓库路径安装到 `$CODEX_HOME/skills/`。安装后**下一轮对话生效**。
2. **手动复制**：`git clone` 或下载技能仓库 → 把技能文件夹放进 `~/.codex/skills/`（或 `$CODEX_HOME/skills/`），确保文件夹里有 `SKILL.md`。
3. **装插件顺带装技能**：从 Plugin Marketplace 安装包含技能的插件。

> 小提示：安装前先看目录里有没有 `SKILL.md`，frontmatter 的 `description` 是否写清楚了"何时该用"。

## 4. 手动创建自己的 Skill

**步骤**：

1. **建文件夹**：命名用小写短横线，如 `my-skill/`。
2. **写 `SKILL.md`**：开头是 YAML frontmatter，只写 `name` 和 `description`，后面接正文指令。

```markdown
---
name: my-skill
description: "为 XXX 场景生成 YYY。当用户需要 A、B、C 时使用本技能。"
---

# 使用步骤
1. 先做……
2. 再调用 scripts/xxx.py ……
```

3. **可选加资源**：`scripts/`、`references/`、`assets/`，以及 `agents/openai.yaml`（给 App 界面显示用）。
4. **校验**：可用官方 `skill-creator` 里的脚本检查格式：

```bash
python scripts/quick_validate.py <你的技能文件夹>
```

5. **放入自动发现目录**（见第 1 节），新开对话后即可使用。

**写作原则**：

- `description` 是触发器的核心：写"做什么 + 什么时候用"，别写成宣传语。
- 正文尽量精简：上下文是公共资源，只写 Codex 本来不知道的东西。
- "何时使用"一定要写进 `description`，不要只写在正文里（正文触发后才加载）。
- 复杂任务用 `scripts/` 处理确定性步骤，说明文字负责引导。

## 5. 控制 Skill 的触发行为

- **自动触发（默认）**：Codex 把任务和每个技能的 `name`/`description` 比对，匹配就自动使用。所以 `description` 写得越准确，触发越可靠。
- **手动指定**：在请求里直接点名技能，例如 `$skill-creator`，或说"使用 xxx 技能"。
- **不想让它触发**：改 `description` 收紧触发条件；或临时把技能文件夹移出发现目录。
- **加载时机**：只有触发后才读正文——所以不要依赖正文里的"何时使用"段落来触发。

## 6. Skill 的查看和管理

- **文件系统**：直接看 `$CODEX_HOME/skills/`（本机 `D:\SoftwareData\Codex\home\skills\`），一个文件夹 = 一个技能。里面 `.system` 是系统内置技能。
- **对话中列出**：让 Codex 用 `skill-installer` 的 `list-skills.py` 列出"可选/已安装"，会标注哪些已装。
- **桌面 App**：技能通过 `agents/openai.yaml` 里的 `display_name`、`short_description`、`default_prompt` 显示在界面上。
- **管理即文件操作**：查看 = 读文件夹；改名/移动 = 停用；删除文件夹 = 删除技能。

## 7. Skill 的停用和删除

- **临时停用**：把技能文件夹移出 `skills/` 发现目录（改名加后缀、移到备份目录都行），Codex 就看不到了。
- **删除**：直接删除对应文件夹。系统内置技能（`.system`）不建议删。
- **关闭系统内置技能**：可在配置里关闭，例如 `config.toml` 中的 `[skills.bundled] enabled = false`（对应官方实现）。
- **注意事项**：技能会随提示词进入模型上下文，删之前先确认不再需要；安装类操作通常在**下一轮对话**生效。

## 8. 找优质 Skill 的渠道

- **官方仓库**：[openai/skills](https://github.com/openai/skills)
  - `skills/.curated`：官方精选，安装首选
  - `skills/.experimental`：实验性技能
  - `skills/.system`：系统预装技能
- **对话内安装**：直接让 Codex 用 `skill-installer` 拉取上面的列表并安装。
- **GitHub 搜索**：搜 `codex skill` 或 `SKILL.md`，看社区开源技能。
- **Marketplace**：在 Codex 的插件市场里找带技能的 Plugin（技能会随插件一起分发）。
- **官方博客 / Cookbook**：OpenAI 官方博客和示例会提到实战技能。

**判断一个技能好不好**：

- `SKILL.md` 存在，frontmatter 只有 `name` + `description`；
- `description` 明确写了"什么时候用、干什么"；
- 正文精简、步骤清晰；
- 有配套 `scripts/` 或 `references/`，且 README/示例完整。

## 参考来源

- 官方文档：Skills – Plugins（developers.openai.com/plugins/concepts/skills）
- 官方文档：Plugins – Codex（developers.openai.com/codex/plugins）
- 官方系统技能：skill-creator、skill-installer（本机 `D:\SoftwareData\Codex\home\skills\.system\`）
- 官方仓库：github.com/openai/skills
