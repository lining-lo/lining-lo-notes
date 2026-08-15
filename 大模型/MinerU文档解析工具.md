# 第1章：认识MinerU



## 学习目标

学完这一章，你将知道：
- ✅ MinerU是什么？它能做什么？
- ✅ 为什么要用MinerU？它有什么好处？
- ✅ MinerU的基本工作原理
- ✅ 它适合用在哪些地方

---

## 1.1 MinerU是什么？

### 用一句话来说

**MinerU是一个"智能PDF阅读器"**。

它能帮你：
- 📖 把PDF文档变成电脑能懂的格式
- 📊 自动提取表格、公式、图片
- 🔍 支持多种语言（中文、英文、日文等）
- 🚀 处理速度很快，准确率很高

---

### 生活中的类比

想象一下：

**传统方式（不用MinerU）**：
你拿到一本技术手册（PDF），想要提取里面的表格数据。
- 你需要手动打开PDF
- 一个表格一个表格地复制
- 复制到Excel后再整理
- 如果表格跨页，还得手动拼接
- 100页的文档，可能需要几个小时

**使用MinerU**：
- 把PDF扔给MinerU
- 说："帮我提取所有表格"
- 几分钟后，所有表格都整理好了
- 直接导出成Excel，拿来就能用

**这就像**：
- 传统方式 = 手动抄书
- MinerU = 自动扫描+文字识别

---

### MinerU的诞生故事

MinerU是怎么来的？

**故事开始**：
有一天，科学家们想训练一个超级聪明的AI（叫InternLM）。
他们收集了很多科学论文（PDF格式），想让AI学习。

**遇到问题**：

- 论文里有很多表格、公式、图片
- 传统工具只能提取纯文字
- 表格变成乱七八糟的文本
- 公式看不懂，图片只当作图片

**解决办法**：
- 于是，他们开发了MinerU
- 专门处理复杂的PDF文档
- 把文档变成AI能懂的格式

**结果**：
- AI能正确理解论文内容
- 训练效果大大提升
- MinerU也就开源给大家用了！

---

### 名字由来

**MinerU** = **Miner**（矿工） + **U**（You/User）

意思就是：像矿工一样，帮你从文档的"矿藏"中挖出有价值的信息！

---

## 1.2 MinerU能做什么？

### 5大核心功能

#### 功能1：智能文字提取 📝

**能做什么**：
- ✅ 把PDF里的文字提取出来
- ✅ 按照正确的阅读顺序排列
- ✅ 自动识别中英文等109种语言
- ✅ 扫描版的PDF也能识别（像手机拍照后识别）

**举例**：
```
原始PDF（有表格、公式、图片混杂）：
┌──────────────────────────────────┐
│  产品技术手册                   │
│  ┌──────┬──────┬──────┐       │
│  │电压  │电流  │功率  │       │
│  ├──────┼──────┼──────┤       │
│  │220V  │10A   │2200W │       │
│  └──────┴──────┴──────┘       │
│  公式：P = U × I               │
│  [产品外观图]                  │
└──────────────────────────────────┘

MinerU提取后：
1. 产品技术手册
2. 表格1.1：技术参数
   电压  电流  功率
   220V  10A   2200W
3. 公式：P = U × I
4. 图片：产品外观图（附带文字描述）
```

---

#### 功能2：自动识别表格 📊

**能做什么**：
- ✅ 自动找到文档中的所有表格
- ✅ 把表格整理成Excel格式
- ✅ 自动识别表格标题
- ✅ 跨页的表格能自动合并

**举例**：
```
问题：一个表格在两页上怎么办？

传统工具：
第1页：┌──────┬──────┐
       │姓名  │年龄  │
       ├──────┼──────┤
       │张三  │25    │
       └──────┴──────┘

第2页：┌──────┬──────┐
       │李四  │30    │
       ├──────┼──────┤
       │王五  │28    │
       └──────┴──────┘
结果：识别成两个独立的表格 ❌

MinerU：
自动合并成一个完整表格 ✅
┌──────┬──────┐
│姓名  │年龄  │
├──────┼──────┤
│张三  │25    │
│李四  │30    │
│王五  │28    │
└──────┴──────┘
```

---

#### 功能3：智能公式识别 🔢

**能做什么**：
- ✅ 自动识别数学公式
- ✅ 转换成标准格式（LaTeX）
- ✅ 区分行内公式和单独的公式
- ✅ 支持复杂的数学符号

**举例**：
```
PDF中的公式：
      2
E = mc

MinerU转换后：
$E = mc^2$  (行内公式）

$$E = mc^2$$ (单独的公式）

这样电脑就能理解和搜索公式了！
```

---

#### 功能4：智能图片提取 🖼️

**能做什么**：
- ✅ 提取所有图片
- ✅ 自动生成图片描述（AI看图说话）
- ✅ 识别图片标题
- ✅ 支持图片搜索

**举例**：
```
PDF中的图片：
[一张手机产品的图片]

MinerU处理：
1. 提取图片 → phone_product.png
2. 生成描述："这是一款黑色智能手机，正面有6.5英寸屏幕，
   后置三摄相机，侧面有音量键和电源键"
3. 提取标题："图1.1 产品外观"

这样你就可以搜索"手机"找到这张图！
```

---

#### 功能5：支持多种语言 🌍

**能做什么**：
- ✅ 自动识别109种语言
- ✅ 中文、英文、日文、韩文、繁体中文等
- ✅ 阿拉伯语、泰语等小语种
- ✅ 自动选择正确的识别模型

**支持的常见语言**：
```
✅ 中文（简体）
✅ 英文
✅ 日文
✅ 韩文
✅ 繁体中文
✅ 泰语
✅ 阿拉伯语
... 还有100+种语言
```

---

## 1.3 为什么要用MinerU？

### 对比传统工具

| 功能 | 传统工具 | MinerU |
|------|---------|--------|
| **文字提取** | 乱序 | ✅ 按阅读顺序 |
| **表格提取** | 需要手动复制 | ✅ 自动提取 |
| **公式识别** | 看不懂 | ✅ 转换成标准格式 |
| **图片提取** | 只能看图 | ✅ 有文字描述 |
| **多语言** | 只能中文/英文 | ✅ 109种语言 |
| **扫描PDF** | 不支持 | ✅ 自动OCR |
| **处理速度** | 慢（手动） | ✅ 快（自动） |

---

### 实际应用场景

#### 场景1：整理公司文档

**问题**：
公司有100+份合同PDF，需要提取关键信息：
- 甲方、乙方是谁
- 合同金额
- 签署日期

**不用MinerU**：
- 打开每个PDF
- 手动查找信息
- 复制粘贴到Excel
- 100份文档，可能需要几天

**使用MinerU**：
- 批量处理100个PDF
- 几分钟内全部处理完成
- 直接导出Excel
- 省时省力，还不会出错

---

#### 场景2：技术文档检索

**问题**：
公司技术手册有500页，想要快速找到：
- 产品的技术参数
- 相关的公式
- 对应的图片

**不用MinerU**：
- 手动翻阅500页
- 逐个查找
- 可能需要几小时

**使用MinerU**：
- 搜索"技术参数" → 立即找到相关表格
- 搜索"公式" → 列出所有公式
- 搜索"产品图" → 找到所有产品图片
- 几秒钟搞定

---

#### 场景3：学术论文分析

**问题**：
需要分析10篇论文，提取：
- 论文标题、作者
- 核心公式
- 实验数据表格
- 关键图表

**不用MinerU**：
- 每篇论文单独处理
- 手动提取信息
- 整理成表格
- 需要很长时间

**使用MinerU**：
- 批量处理10篇论文
- 自动提取所有信息
- 直接导出结构化数据
- 大大提高效率

---

## 1.4 MinerU的工作原理

### 简单理解（用图书馆比喻）

想象一个智能图书馆：

```
1. 你给MinerU一本书（PDF）
        ↓
2. MinerU快速阅读这本书
   - 哪里是标题？
   - 哪里是表格？
   - 哪里是公式？
   - 哪里是图片？
        ↓
3. MinerU把内容整理好
   - 文字按顺序排列
   - 表格整理成Excel
   - 公式转换成标准格式
   - 图片加上文字说明
        ↓
4. 给你一个整齐的文件夹
   - README.md（完整文字）
   - tables/（所有表格）
   - formulas/（所有公式）
   - images/（所有图片）
```

---

### 技术原理（简化版）

MinerU主要用了3个核心技术：

#### 技术1：智能版面分析 👁️

**作用**：
像人眼一样，看懂PDF的版面布局

**怎么做**：
- 识别哪里是标题
- 识别哪里是正文
- 识别哪里是表格
- 识别哪里是图片
- 识别阅读顺序

**举例**：
```
PDF页面：
┌──────────────────┐
│  1. 产品介绍    │  ← 识别为标题
│                  │
│  这是产品介绍。  │  ← 识别为正文
│                  │
│  ┌──────────┐   │
│  │  表格1   │   │  ← 识别为表格
│  └──────────┘   │
│                  │
│  [图片1]        │  ← 识别为图片
└──────────────────┘
```

---

#### 技术2：OCR文字识别 🔍

**作用**：
像扫描仪一样，识别图片里的文字

**什么时候用**：
- 扫描版PDF（图片格式）
- 手机拍照的文档
- 图片中的文字

**怎么做**：
- 把图片里的文字"辨认"出来
- 支持109种语言
- 准确率高达95%+

**举例**：
```
扫描的图片：
┌──────────────────┐
│  产 品 手 册    │  ← 图片里的字
│                  │
│  电 压：220V    │
│  电 流：10A     │
└──────────────────┘

OCR识别后：
产品手册
电压：220V
电流：10A
```

---

#### 技术3：AI模型推理 🧠

**作用**：
像人脑一样，理解内容

**用于**：
- 识别表格结构
- 识别数学公式
- 生成图片描述
- 提取语义信息

**举例**：
```
AI看到一张产品图片 → 理解：这是手机，有屏幕、摄像头
AI看到一个复杂公式 → 理解：这是能量守恒公式
AI看到一个表格 → 理解：这是产品参数对比表
```

---

## 1.5 MinerU能帮我们做什么？

### 5大应用场景

#### 场景1：构建智能知识库 📚

**用途**：
- 把公司文档变成可搜索的知识库
- 员工可以快速找到需要的信息
- 搭配AI实现智能问答

**举例**：
```
传统方式：
员工问："产品A的功率是多少？"
管理员翻查 → "等等，我找一下文档..."

使用MinerU：
员工问："产品A的功率是多少？"
AI立即回答："产品A功率2200W"（自动从文档中检索）
```

---

#### 场景2：自动化数据提取 📊

**用途**：
- 批量提取合同信息
- 批量提取发票数据
- 批量整理表格数据

**举例**：
```
手动方式：
打开合同A → 复制甲方乙方 → 粘贴到Excel
打开合同B → 复制甲方乙方 → 粘贴到Excel
... 重复100次

使用MinerU：
把100个合同拖给MinerU → 等待几分钟
得到一个Excel，里面所有信息都整理好了
```

---

#### 场景3：文献分析系统 📖

**用途**：
- 分析学术论文
- 提取核心公式
- 整理实验数据

**举例**：
```
研究者需要找：
- 能量守恒的公式
- 对比实验的表格
- 实验结果的图表

使用MinerU：
搜索"能量守恒" → 立即找到所有相关公式
搜索"实验对比" → 立即找到所有相关表格
搜索"实验结果" → 立即找到所有相关图表
```

---

#### 场景4：文档翻译 🌐

**用途**：
- 提取多语言文档内容
- 转换为统一格式
- 方便翻译工具处理

**举例**：
```
问题：有中英日三种语言的技术手册

传统方式：
分别用不同工具处理 → 格式混乱 → 难以整合

使用MinerU：
统一处理 → 统一格式 → 方便翻译
```

---

#### 场景5：内容管理 📁

**用途**：
- 归档文档
- 建立索引
- 便于检索

**举例**：
```
公司积累的文档：
- 产品手册（50份）
- 技术规格书（100份）
- 用户指南（200份）
- 合同协议（500份）

使用MinerU：
全部提取结构化数据
建立统一检索系统
快速找到需要的文档
```

---

## 1.6 本章小结

### 核心要点

1. **MinerU是什么**：
   - 智能PDF阅读器
   - 自动提取文字、表格、公式、图片
   - 支持109种语言

2. **核心功能**：
   - 智能文字提取
   - 自动识别表格
   - 智能公式识别
   - 智能图片提取
   - 支持多种语言

3. **为什么用MinerU**：
   - 比传统工具更智能
   - 自动化处理，省时省力
   - 准确率高

4. **工作原理**：
   - 版面分析 + OCR + AI模型
   - 像智能图书馆管理员

5. **应用场景**：
   - 智能知识库
   - 自动数据提取
   - 文献分析
   - 文档翻译
   - 内容管理

---

## 实践任务

### 任务1：理解MinerU

- [ ] 用自己的话，解释什么是MinerU
- [ ] 举一个生活中类似的例子
- [ ] 想一想，MinerU能帮你解决什么问题？

### 任务2：思考应用场景

**问题**：在你的学习或工作中，哪里可以用到MinerU？

# 第2章：系统要求与安装



## 学习目标

学完这一章，你将知道：

- ✅ 你的电脑能不能装MinerU
- ✅ 怎么安装MinerU（手把手教你）
- ✅ 怎么检查安装是否成功
- ✅ 遇到问题怎么解决

---

## 2.1 你的电脑能不能装MinerU？

### 先检查这几项

#### 检查项1：操作系统

MinerU支持的操作系统：

| 操作系统            | 版本要求                   | 能不能装 |
| ------------------- | -------------------------- | -------- |
| **Windows**         | Win10、Win11               | ✅ 能装   |
| **苹果电脑（Mac）** | macOS 14.0或更新           | ✅ 能装   |
| **Linux**           | Ubuntu 20.04+、CentOS 8+等 | ✅ 能装   |

**怎么查看系统版本？**

**Windows**：

```
方法1：点击"开始" → "设置" → "系统" → "关于"
       看到"Windows版本"就可以了

方法2：按键盘 Win + R
       输入 winver
       回车
       会弹出一个窗口显示版本
```

**Mac**：

```
点击左上角  图标 → "关于本机"
看"macOS"后面的版本号
```

**Linux**：

```bash
# 在终端输入以下命令
cat /etc/os-release
```

---

#### 检查项2：Python版本

MinerU需要Python 3.10到3.13版本。

**怎么检查Python版本？**

**方法1：命令行检查**

```bash
# 打开命令行（Windows按Win+R输入cmd）
# 然后输入：
python --version
# 或
python3 --version
```

**可能的输出：**

```
Python 3.11.0  ✅ 能装（在3.10-3.13范围内）
Python 3.9.0  ❌ 不能装（太老了，需要升级）
Python 3.14.0 ❌ 不能装（太新了，还不支持）
```

**方法2：如果没有Python**

如果你看到这样的提示：

```
'python' 不是内部或外部命令
```

说明你还没有安装Python，需要先安装。

---

#### 检查项3：电脑配置

**最基本的要求**：

| 配置            | 最低要求 | 推荐配置  |
| --------------- | -------- | --------- |
| **内存（RAM）** | 16GB     | 32GB      |
| **硬盘空间**    | 20GB     | 50GB      |
| **CPU**         | 4核      | 8核或更多 |

**怎么看配置？**

**Windows**：

```
1. 右键"此电脑" → "属性"
2. 看到系统信息
   - 处理器 = CPU
   - 安装内存(RAM) = 内存
```

**Mac**：

```
点击左上角  图标 → "关于本机"
直接显示内存、CPU等信息
```

**Linux**：

```bash
# 查看内存
free -h

# 查看CPU
lscpu

# 查看硬盘
df -h
```

---

#### 检查项4：显卡（GPU）【可选】

**MinerU可以用GPU加速，但不是必须的！**

**怎么检查有没有GPU？**

**Windows**：

```
方法1：
1. 右键"此电脑" → "属性"
2. 点击"设备管理器"
3. 找到"显示适配器"
4. 如果看到NVIDIA开头的，说明有NVIDIA显卡

方法2：
按键盘 Win + R
输入 dxdiag
回车
看"显示"选项卡
```

**Mac**：

```
Mac自带显卡（M1/M2/M3芯片）
不用另外检查
```

**Linux**：

```bash
# 如果有NVIDIA显卡
nvidia-smi

# 如果没有这个命令，说明没有NVIDIA显卡
```

**总结**：

- ✅ 有GPU → 可以用GPU加速，速度更快
- ⭕ 没有GPU → 也可以用，用CPU处理，速度慢一点

---

## 2.2 安装Python（如果需要）

### 如果你的Python版本不对

**情况1：Python太老（3.9或更早）**

需要升级Python。

**Windows用户**：

```
1. 访问 https://www.python.org/downloads/
2. 下载Python 3.10、3.11、3.12或3.13版本
3. 运行安装程序
4. ⚠️ 重要：勾选 "Add Python to PATH"
5. 点击 "Install Now"
6. 等待安装完成
7. 重启电脑
```

**Mac用户**：

```bash
# 使用Homebrew安装（如果没有Homebrew，先安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装Python
brew install python@3.11
```

**Linux用户**：

```bash
# 使用pyenv安装（推荐）

# 1. 安装pyenv
curl https://pyenv.run | bash

# 2. 添加到环境变量
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
source ~/.bashrc

# 3. 安装Python 3.11
pyenv install 3.11.0
pyenv global 3.11.0
```

---

**情况2：没有Python**

按照上面的方法安装Python 3.11（推荐）

---

## 2.3 安装MinerU

### 最简单的安装方法：用pip安装

**什么是pip？**

pip是Python的"应用商店"，专门用来安装Python软件的。

---

### 安装步骤（手把手）

#### 步骤1：打开命令行

**Windows**：

```
方法1：按键盘 Win + R
       输入 cmd
       回车

方法2：点击"开始" → 搜索"cmd"
       点击"命令提示符"
```

**Mac**：

```
打开"终端"（Terminal）
按键盘 Cmd + 空格，搜索"终端"
```

**Linux**：

```
打开终端（Terminal）
按键盘 Ctrl + Alt + T
```

---

#### 步骤2：升级pip（可选但推荐）

```bash
# 在命令行输入：
pip install --upgrade pip
```

**做什么**：

- 把pip升级到最新版本
- 确保后面安装MinerU时不会出问题

**可能看到的输出**：

```
Requirement already satisfied: pip in ...
(已经是最新的了，不用管）
```

---

#### 步骤3：安装MinerU

```bash
# 在命令行输入：
pip install "mineru[all]"
```

**这条命令在做什么？**

- `pip install`：用pip安装软件
- `"mineru[all]"`：安装MinerU及其所有功能（包括OCR等）

**可能看到的输出**：

```
Collecting mineru
  Downloading mineru-2.7.6-py3-none-any.whl (xxx kB)
Installing collected packages: mineru
Successfully installed mineru-2.7.6
```

**可能需要几分钟**，因为：

- 要下载MinerU软件（约2GB）
- 要下载模型文件（约5-10GB）
- 要安装各种依赖

---

#### 步骤4：等待安装完成

**安装过程中的提示**：

正常情况：

```
Downloading...  (正在下载）
Installing...  (正在安装）
Successfully installed...  (安装成功）
```

---

### 常见问题解决

#### 问题1：网络问题（下载失败）

**错误提示**：

```
ERROR: Could not find a version that satisfies the requirement...
Connection timeout
```

**原因**：
网络无法连接到国外服务器（Hugging Face）

**解决方法1：使用国内镜像（推荐）**

```bash
# 设置使用国内镜像
export MINERU_MODEL_SOURCE=modelscope

# 然后重新安装
pip install "mineru[all]"
```

**解决方法2：使用代理（如果你有）**

```bash
# 设置代理（替换成你的代理地址）
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890

# 然后安装
pip install "mineru[all]"
```

---

#### 问题2：权限问题（Windows）

**错误提示**：

```
ERROR: Could not install packages due to an EnvironmentError: [WinError 5] Access is denied
```

**原因**：
没有管理员权限

**解决方法**：

```
1. 右键点击"命令提示符"
2. 选择"以管理员身份运行"
3. 然后重新运行安装命令
```

---

#### 问题3：依赖冲突

**错误提示**：

```
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed
```

**原因**：
电脑里已经有其他Python包，和MinerU的包有冲突

**解决方法：使用虚拟环境（推荐）**

```bash
# 创建一个虚拟环境（就像给MinerU准备一个独立的房间）
python -m venv mineru_env

# 激活虚拟环境

# Windows:
mineru_env\Scripts\activate

# Mac/Linux:
source mineru_env/bin/activate

# 然后在虚拟环境中安装MinerU
pip install "mineru[all]"
```

---

## 2.4 检查安装是否成功

### 验证步骤

#### 验证1：查看版本

```bash
# 在命令行输入：
mineru --version
```

**预期输出**：

```
MinerU 2.7.6
```

**如果看到这个，说明安装成功！** ✅

**如果看到错误**：

```
'mineru' 不是内部或外部命令
```

说明安装失败，回到上面检查问题。

---

#### 验证2：查看帮助

```bash
# 在命令行输入：
mineru --help
```

**预期输出**（会显示很多帮助信息）：

```
Usage: mineru [OPTIONS]

  MinerU: 一站式文档解析解决方案

Options:
  -p, --pdf-path PATH        PDF文件路径或目录
  -o, --output-dir PATH      输出目录
  -b, --backend TEXT         解析后端（默认：hybrid-auto-engine）
  ...
```

**如果看到这些帮助信息，说明没问题！** ✅

---

## 2.5 第一次使用MinerU

### 测试解析一个PDF

#### 准备测试PDF

**如果没有测试PDF，可以下载一个**：

```bash
# 创建测试目录
mkdir mineru_test
cd mineru_test

# 下载测试PDF（示例）
wget https://arxiv.org/pdf/2409.18839 -O test.pdf
```

**或者用自己的PDF**：

```
1. 找一个PDF文件
2. 复制到mineru_test目录
3. 改名为test.pdf
```

---

#### 运行MinerU

```bash
# 在命令行输入：
mineru -p test.pdf -o output
```

**这条命令在做什么**：

- `-p test.pdf`：要处理的PDF文件是test.pdf
- `-o output`：输出到output目录

**可能看到的输出**：

```
[INFO] 开始解析文档...
[INFO] 使用hybrid-auto-engine后端...
[INFO] 检测文档类型：text PDF
[INFO] 解析进度：100%
[INFO] 解析完成！
[INFO] 输出目录: output
```

---

#### 查看输出结果

```bash
# 查看输出目录
ls -lh output/
```

**预期输出**：

```
output/
├── test.md                    # 这是处理后的文字
├── test_middle.json            # 这是中间数据
├── test_model.json            # 这是模型输出
├── test_content_list.json      # 这是内容列表
├── test_layout.pdf            # 这是布局可视化
├── test_span.pdf              # 这是文字可视化
├── test_origin.pdf            # 这是原始PDF
└── images/                   # 这里是提取的图片
    ├── image_0.png
    ├── image_1.png
    └── ...
```

**恭喜！如果看到这些文件，说明MinerU正常工作了！** 🎉

---

#### 查看处理结果

```bash
# 用文本编辑器打开test.md
# 或用命令行查看前几行
head test.md
```

**你会看到**：

- PDF里的文字都提取出来了
- 按照正确的顺序排列
- 表格、公式、图片都有标注

---

## 2.6 常见问题

### 问题1：安装很慢，一直卡住

**可能原因**：

- 正在下载模型文件（很大）
- 网络速度慢

**解决方法**：

1. 耐心等待（可能需要10-20分钟）
2. 换个网络试试（比如手机热点）
3. 使用国内镜像（见上面问题1的解决方法）

---

### 问题2：安装时提示磁盘空间不足

**错误提示**：

```
ERROR: No space left on device
```

**解决方法**：

1. 清理磁盘空间
2. 或者安装到其他磁盘

```bash
# 安装到其他磁盘（Windows）
# D盘改为你的目标盘
set PYTHONUSERBASE=D:\MinerU
pip install --user "mineru[all]"
```

---

### 问题3：运行mineru命令提示找不到

**错误提示**：

```
'mineru' 不是内部或外部命令
```

**解决方法**：

**方法1：检查Python路径**

```bash
# 查看Python安装位置
python -m site --user-base

# 查看Scripts目录
ls C:\Users\你的用户名\AppData\Roaming\Python\Python311\Scripts\
```

**方法2：添加Python到PATH（Windows）**

```
1. 搜索"环境变量"
2. 点击"编辑系统环境变量"
3. 点击"环境变量"
4. 在"系统变量"中找到"Path"
5. 点击"编辑"
6. 添加Python的Scripts目录
7. 点击"确定"
8. 重启命令行
```

---

### 问题4：想用GPU加速，但不知道怎么配置

**简单方法**：

如果你有NVIDIA显卡，MinerU会自动使用GPU（如果有的话）

**检查是否用了GPU**：

```bash
# 运行mineru时，观察CPU/GPU使用率
# Windows：打开任务管理器
# 如果GPU使用率上升，说明在用GPU
```

**如果没用到GPU**：

- 检查NVIDIA驱动是否安装
- 检查CUDA是否安装
- 或者在第3章会详细讲解

---

## 2.7 安装检查清单

完成安装后，请逐项检查：

### 基础检查

- [ ] 操作系统是Windows/Mac/Linux
- [ ] Python版本在3.10-3.13之间
- [ ] 内存≥16GB，硬盘空间≥20GB
- [ ] 运行`mineru --version`能看到版本号
- [ ] 运行`mineru --help`能看到帮助信息

### 功能检查

- [ ] 能解析一个测试PDF
- [ ] 输出目录正常生成
- [ ] test.md文件存在且不为空
- [ ] images目录存在

### GPU检查（可选）

- [ ] （有GPU）查看GPU使用率，确认在用GPU
- [ ] （无GPU）知道MinerU会自动用CPU

---

## 本章小结

### 核心要点

1. **系统要求**：
   - 操作系统：Win10+ / Mac14+ / Linux 20.04+
   - Python：3.10-3.13
   - 内存：≥16GB
   - 硬盘：≥20GB
   - GPU：可选，但推荐

2. **安装步骤**：
   - 打开命令行
   - 升级pip
   - 运行`pip install "mineru[all]"`
   - 等待完成

3. **验证安装**：
   - `mineru --version`：查看版本
   - `mineru --help`：查看帮助
   - 测试解析一个PDF

4. **常见问题**：
   - 网络问题 → 用国内镜像
   - 权限问题 → 用管理员运行
   - 依赖冲突 → 用虚拟环境
   - 命令找不到 → 检查PATH

---

## 实践任务

### 任务1：检查系统

- [ ] 查看操作系统版本
- [ ] 查看Python版本
- [ ] 查看内存和硬盘空间

### 任务2：安装MinerU

- [ ] 打开命令行
- [ ] 升级pip
- [ ] 安装MinerU
- [ ] 等待安装完成

### 任务3：验证安装

- [ ] 运行`mineru --version`
- [ ] 运行`mineru --help`
- [ ] 测试解析一个PDF

### 任务4：记录问题

**问题记录**：

| 问题 | 描述 | 解决方法 |
| ---- | ---- | -------- |
| 1    | ...  | ...      |
| 2    | ...  | ...      |

# 第3章：命令行快速入门



## 学习目标

学完这一章，你将知道：

- ✅ 怎么用MinerU处理PDF
- ✅ 常用的命令有哪些
- ✅ 怎么选择不同的处理方式
- ✅ 怎么看懂输出结果

---

## 3.1 最简单的使用方法

### 只需要记住一个命令

```bash
mineru -p 输入文件 -o 输出目录
```

**这条命令在说什么？**

- `mineru`：运行MinerU程序
- `-p 输入文件`：要处理的PDF文件在哪里（p代表path=路径）
- `-o 输出目录`：处理后保存到哪里（o代表output=输出）

---

### 举个例子

假设你有一个PDF文件叫`技术手册.pdf`，想处理后保存到`output`文件夹：

```bash
mineru -p 技术手册.pdf -o output
```

**MinerU会做什么？**

1. 打开`技术手册.pdf`
2. 分析这个文件
3. 提取文字、表格、公式、图片
4. 保存到`output`文件夹

---

### 实际操作（手把手）

#### 步骤1：准备一个PDF文件

```bash
# 1. 创建一个文件夹
mkdir test1

# 2. 进入这个文件夹
cd test1

# 3. 把你的PDF文件复制到这里
# 或者用一个测试PDF
wget https://arxiv.org/pdf/2409.18839 -O test.pdf
```

**如果没有wget命令**：
直接用你的文件管理器，把PDF文件复制到test1文件夹。

---

#### 步骤2：运行MinerU

```bash
# 在test1文件夹中，运行：
mineru -p test.pdf -o output
```

**你会看到的输出**：

```
[INFO] 开始解析文档...
[INFO] 使用hybrid-auto-engine后端...
[INFO] 检测文档类型：text PDF
[INFO] 解析进度：100%
[INFO] 解析完成！
[INFO] 输出目录: output
```

**这些输出是什么意思？**

| 输出                       | 意思                            |
| -------------------------- | ------------------------------- |
| [INFO] 开始解析文档...     | 开始处理PDF                     |
| 使用hybrid-auto-engine后端 | 用了哪种处理方式（后面会讲）    |
| 检测文档类型：text PDF     | 这是一个文字版PDF（不是扫描版） |
| 解析进度：100%             | 处理完成了                      |
| 输出目录: output           | 结果保存在output文件夹          |

---

#### 步骤3：查看结果

```bash
# 看看output文件夹里有什么
ls -lh output
```

**你会看到**：

```
output/
├── test.md                    # 这是处理后的文字
├── test_middle.json            # 这是中间数据
├── test_model.json            # 这是模型输出
├── test_content_list.json      # 这是内容列表
├── test_layout.pdf            # 这是布局可视化
├── test_span.pdf              # 这是文字可视化
├── test_origin.pdf            # 这是原始PDF
└── images/                   # 这里是提取的图片
    ├── image_0.png
    ├── image_1.png
    └── ...
```

---

#### 步骤4：打开处理结果

```bash
# 用文本编辑器打开test.md
# 可以用记事本、VSCode、或者其他编辑器

# 如果用命令行查看前几行：
head test.md
```

**你会看到什么？**

```markdown
# 技术手册

## 1. 产品介绍

这是产品介绍段落。

### 1.1 功能特点

- 特点1
- 特点2

**表格1.1**：技术参数

| 参数 | 值 |
|------|-----|
| 电压 | 220V |
| 功率 | 100W |

**公式**：$P = U \times I$
```

**这是什么格式？**

- 这是Markdown格式
- 是一种简单的文字格式
- 很多软件都能打开（记事本、VSCode等）

---

## 3.2 处理多个文件

### 方法1：一次处理一个文件夹里的所有PDF

假设你有一个文件夹叫`documents`，里面有很多PDF：

```bash
# 处理documents文件夹里的所有PDF
mineru -p documents -o output_all
```

**MinerU会做什么？**

- 自动找到documents文件夹里的所有PDF文件
- 逐个处理
- 把所有结果都放到output_all文件夹

**注意**：

- `-p`后面可以是单个文件，也可以是文件夹
- 如果是文件夹，会处理里面所有的PDF

---

### 方法2：只处理特定文件

```bash
# 只处理第一个PDF
mineru -p documents/产品手册.pdf -o output_1

# 只处理第二个PDF
mineru -p documents/技术规格.pdf -o output_2
```

---

## 3.3 不同的处理方式

### 5种"后端"（处理引擎）

MinerU有5种不同的处理方式，我们叫它们"后端"（backend）。

**用生活中的例子理解**：
就像你做菜，可以用不同的方法：

- 方法1：用煤气灶（快，但需要燃气）
- 方法2：用电饭煲（慢，但方便）
- 方法3：用微波炉（最快，但不是所有菜都适合）

MinerU的5种后端也是类似的道理。

---

| 后端                   | 速度 | 准确度      | 需要什么 | 什么时候用           |
| ---------------------- | ---- | ----------- | -------- | -------------------- |
| **pipeline**           | 较慢 | 一般（82%） | 纯CPU    | 没有GPU，快速测试    |
| **vlm-auto-engine**    | 快   | 很高（90%） | GPU/NPU  | 有GPU，要高准确度    |
| **vlm-http-client**    | 一般 | 很高（90%） | 服务器   | 用远程服务器处理     |
| **hybrid-auto-engine** | 最快 | 很高（90%） | GPU/NPU  | ⭐ 推荐用这个（默认） |
| **hybrid-http-client** | 一般 | 很高（90%） | 服务器   | 用远程服务器         |

---

### 选择哪个后端？

#### 情况1：你的电脑没有GPU

**用什么**：pipeline

**命令**：

```bash
mineru -p test.pdf -o output -b pipeline
```

**说明**：

- `-b`代表backend（后端）
- 用CPU处理，速度慢一点，但能用

---

#### 情况2：你的电脑有GPU（NVIDIA显卡）

**用什么**：hybrid-auto-engine（推荐）

**命令**：

```bash
mineru -p test.pdf -o output -b hybrid-auto-engine
```

**说明**：

- 这是默认的，不写`-b`也行
- 用GPU加速，速度快，准确度高

---

#### 情况3：你想用远程服务器

**用什么**：vlm-http-client 或 hybrid-http-client

**命令**：

```bash
mineru -p test.pdf -o output -b vlm-http-client -u http://服务器地址:端口
```

**说明**：

- `-u`指定服务器地址
- 适合本地资源不够的情况

---

### 后端对比（实际例子）

**测试同一个PDF（10页）**：

| 后端               | 处理时间 | 准确度 | 适用情况            |
| ------------------ | -------- | ------ | ------------------- |
| pipeline           | 30秒     | 82%    | 没GPU，快速测试     |
| hybrid-auto-engine | 12秒     | 90%    | 有GPU，推荐用这个 ⭐ |
| vlm-auto-engine    | 15秒     | 92%    | 有GPU，要最高准确度 |

**结论**：

- 有GPU就用`hybrid-auto-engine`（默认）
- 没GPU就用`pipeline`
- 没GPU但想提高准确度 → 换个有GPU的电脑，或者用远程服务器

---

## 3.4 处理不同类型的PDF

### 3种PDF类型

| 类型        | 说明                  | 怎么判断               |
| ----------- | --------------------- | ---------------------- |
| **文字PDF** | 可以直接复制文字的PDF | 选中文字，能复制粘贴   |
| **扫描PDF** | 整个是图片的PDF       | 选中文字，复制的是空白 |
| **混合PDF** | 有文字有图片          | 部分能复制，部分不能   |

---

### 自动检测 vs 手动指定

**默认情况**：

```bash
mineru -p test.pdf -o output -m auto
```

**说明**：

- `-m auto`：自动检测PDF类型（默认）
- MinerU会自己判断是文字PDF还是扫描PDF
- 自动选择最合适的处理方式

---

**强制指定**：

如果MinerU判断错了，你可以手动指定：

```bash
# 强制当文字PDF处理（不OCR）
mineru -p test.pdf -o output -m txt

# 强制当扫描PDF处理（用OCR）
mineru -p test.pdf -o output -m ocr
```

**什么时候需要手动指定？**

- 你很确定这个PDF是扫描版，但MinerU没识别出来
- 你知道这个PDF是文字版，想跳过OCR（更快）

---

### OCR是什么？

**OCR = 光学字符识别**

**简单说**：

- 把图片里的文字"认"出来
- 就像扫描仪扫描文件后，识别里面的文字

**什么时候需要OCR？**

- 扫描版PDF（整个是图片）
- 手机拍照的文档
- 图片里的文字

---

## 3.5 处理不同语言的PDF

### 109种语言支持

MinerU支持109种语言，包括：

| 语言                 | 命令参数         | 说明                 |
| -------------------- | ---------------- | -------------------- |
| **中文（简体）**     | `-l ch`          | 默认                 |
| **中文（服务器版）** | `-l ch_server`   | 准确度更高，速度稍慢 |
| **中文（轻量版）**   | `-l ch_lite`     | 速度更快，准确度稍低 |
| **英文**             | `-l en`          | 英文文档             |
| **日文**             | `-l japan`       | 日文文档             |
| **韩文**             | `-l korean`      | 韩文文档             |
| **繁体中文**         | `-l chinese_cht` | 港台文档             |

---

### 怎么指定语言？

```bash
# 中文文档（默认，不用写）
mineru -p test.pdf -o output

# 英文文档
mineru -p test.pdf -o output -l en

# 日文文档
mineru -p test.pdf -o output -l japan
```

**说明**：

- `-l`代表language（语言）
- 如果知道是什么语言，最好指定一下
- 这样识别更准确

---

### 自动语言检测

**不指定语言会怎样？**

```bash
# 不指定语言
mineru -p test.pdf -o output
```

**MinerU会做什么？**

- 默认用中文模型处理
- 如果是英文，也能识别（但可能不那么准确）

**建议**：

- 如果知道是什么语言，最好指定`-l`
- 例如英文文档写`-l en`

---

## 3.6 只处理部分页面

### 什么时候需要？

**场景1**：文档太大

- 有100页的PDF
- 你只想看看前面10页
- 不想等太久

**场景2**：跳过封面和目录

- 前3页是封面、目录
- 正文从第4页开始
- 只想处理正文

**场景3**：测试效果

- 看看处理效果怎么样
- 不想等全部处理完

---

### 怎么指定页面范围？

```bash
# 只处理前10页（从第1页到第10页）
mineru -p test.pdf -o output --end-page-id 9

# 从第5页开始处理（跳过前4页）
mineru -p test.pdf -o output --start-page-id 4

# 只处理第5页到第10页
mineru -p test.pdf -o output --start-page-id 4 --end-page-id 9
```

**注意**：

- 页码是从0开始算的（不是1）
- 第1页 = page 0
- 第5页 = page 4
- 第10页 = page 9

**例子**：

```
--start-page-id 4    从第5页开始（page 4）
--end-page-id 9      到第10页结束（page 9）
```

---

### 页码对照表

| 你说的 | 命令里写的 | 例子                |
| ------ | ---------- | ------------------- |
| 第1页  | 0          | `--start-page-id 0` |
| 第5页  | 4          | `--start-page-id 4` |
| 第10页 | 9          | `--end-page-id 9`   |

---

## 3.7 完整命令示例

### 示例1：最简单的用法

```bash
# 处理一个PDF，用默认设置
mineru -p test.pdf -o output
```

**等价于**：

```bash
mineru -p test.pdf -o output -b hybrid-auto-engine -m auto -l ch
```

**说明**：

- 默认后端：hybrid-auto-engine
- 默认方法：auto（自动检测）
- 默认语言：ch（中文）

---

### 示例2：处理英文PDF

```bash
# 英文PDF，用GPU加速
mineru -p manual_en.pdf -o output_en -l en -b hybrid-auto-engine
```

**分解**：

- `-p manual_en.pdf`：输入文件是manual_en.pdf
- `-o output_en`：输出到output_en文件夹
- `-l en`：是英文文档
- `-b hybrid-auto-engine`：用GPU加速

---

### 示例3：只处理前10页

```bash
# 处理前10页，扫描PDF
mineru -p manual.pdf -o output_10pages -m ocr --end-page-id 9
```

**分解**：

- `-p manual.pdf`：输入文件
- `-o output_10pages`：输出目录
- `-m ocr`：强制用OCR（扫描PDF）
- `--end-page-id 9`：只处理到第10页

---

### 示例4：批量处理文件夹

```bash
# 处理documents文件夹里所有PDF
mineru -p documents -o output_all
```

**说明**：

- `-p documents`：documents是一个文件夹
- 会处理这个文件夹里所有的PDF

---

## 3.8 常用参数总结

### 必需参数

| 参数 | 说明             | 例子          |
| ---- | ---------------- | ------------- |
| `-p` | 输入文件或文件夹 | `-p test.pdf` |
| `-o` | 输出目录         | `-o output`   |

---

### 常用可选参数

| 参数              | 说明                | 默认值             | 例子                |
| ----------------- | ------------------- | ------------------ | ------------------- |
| `-b`              | 处理后端            | hybrid-auto-engine | `-b pipeline`       |
| `-m`              | 处理方法            | auto               | `-m ocr`            |
| `-l`              | 语言                | ch                 | `-l en`             |
| `--start-page-id` | 起始页码（从0开始） | 0                  | `--start-page-id 4` |
| `--end-page-id`   | 结束页码（不包含）  | 全部               | `--end-page-id 9`   |

---

## 3.9 输出文件详解

### 输出目录里有什么？

```
output/
├── test.md                    # ⭐ 这是最重要的：处理后的文字
├── test_middle.json            # 中间数据（给程序用的）
├── test_model.json            # 模型输出（给调试用的）
├── test_content_list.json      # 内容列表（按顺序排列）
├── test_layout.pdf            # 布局可视化（看布局的）
├── test_span.pdf              # 文字可视化（看文字的）
├── test_origin.pdf            # 原始PDF（备份）
└── images/                   # 提取的图片
    ├── image_0.png
    ├── image_1.png
    └── ...
```

---

### 哪些文件最重要？

**最重要的文件**：

1. **test.md** - 处理后的文字（你需要这个！）
2. **images/** - 提取的图片（如果有图片）

**给程序用的文件**：

3. **test_middle.json** - 中间数据
4. **test_content_list.json** - 内容列表

**调试用的文件**：

5. **test_model.json** - 模型输出
6. **test_layout.pdf** - 布局可视化
7. **test_span.pdf** - 文字可视化
8. **test_origin.pdf** - 原始PDF

---

## 本章小结

### 核心要点

1. **最简单命令**：

   ```bash
   mineru -p 输入文件 -o 输出目录
   ```

2. **后端选择**：

   - 有GPU → hybrid-auto-engine（默认）
   - 没GPU → pipeline

3. **方法选择**：

   - 自动检测 → `-m auto`（默认）
   - 强制OCR → `-m ocr`

4. **语言选择**：

   - 中文 → 不用写
   - 英文 → `-l en`

5. **页面控制**：

   - 只处理前N页 → `--end-page-id N-1`
   - 从第N页开始 → `--start-page-id N-1`

---

## 实践任务

### 任务1：处理你的第一个PDF

- [ ] 准备一个PDF文件
- [ ] 运行`mineru -p 你的PDF -o output`
- [ ] 查看output目录
- [ ] 打开.md文件查看

### 任务2：尝试不同参数

- [ ] 用不同的后端试试（`-b`）
- [ ] 指定页面范围（`--start-page-id`和`--end-page-id`）
- [ ] 对比处理结果

### 任务3：处理文件夹

- [ ] 准备一个有多个PDF的文件夹
- [ ] 运行`mineru -p 文件夹 -o output`
- [ ] 查看处理了多少个PDF

# 第4章：输出文件详解



## 学习目标

学完这一章，你将知道：

- ✅ 输出文件有哪些？都是什么？
- ✅ 最重要的文件是什么？怎么看？
- ✅ 其他文件是用来做什么的？
- ✅ 怎么用这些文件

---

## 4.1 输出文件一览

### 运行MinerU后会得到什么？

```bash
mineru -p test.pdf -o output
```

**output文件夹里会有这些文件**：

```
output/
├── test.md                    # ⭐ 最重要：处理后的文字
├── test_middle.json            # 中间数据
├── test_model.json            # 模型输出
├── test_content_list.json      # 内容列表
├── test_layout.pdf            # 布局可视化
├── test_span.pdf              # 文字可视化
├── test_origin.pdf            # 原始PDF
└── images/                   # 图片文件夹
    ├── image_0.png
    ├── image_1.png
    └── ...
```

---

### 用生活例子类比

**MinerU处理PDF就像整理书房**：

| 步骤          | MinerU做的是         | 得到的文件             | 用途               |
| ------------- | -------------------- | ---------------------- | ------------------ |
| 1. 把书拆开   | 识别文字、表格、公式 | test.md                | ⭐ 最重要，直接阅读 |
| 2. 分类整理   | 按类型归类           | test_middle.json       | 给程序处理用       |
| 3. 记录过程   | 记录识别结果         | test_model.json        | 调试用             |
| 4. 按顺序排列 | 按阅读顺序整理       | test_content_list.json | 搜索用             |
| 5. 标记位置   | 标记每个部分在哪     | test_layout.pdf        | 检查用             |
| 6. 提取图片   | 把图片单独保存       | images/                | 查看图片用         |

---

## 4.2 最重要的文件：test.md

### 这是什么？

**test.md** - 处理后的文字文件

**为什么最重要？**

- ✅ 这是你要用的文件
- ✅ 里面包含了所有文字、表格、公式、图片的描述
- ✅ 可以直接用记事本打开看
- ✅ 可以导入到其他软件里

---

### test.md里有什么？

打开test.md，你会看到类似这样的内容：

```markdown
# 技术手册

## 1. 产品介绍

这是产品介绍段落，告诉你这个产品是用来做什么的。

### 1.1 功能特点

这个产品有以下特点：

- 功能1：自动识别文字
- 功能2：提取表格数据
- 功能3：识别数学公式
- 功能4：提取图片并生成描述

### 1.2 技术参数

**表格1.1**：技术参数表

| 参数 | 数值 | 单位 |
|------|------|------|
| 电压 | 220 | V |
| 电流 | 10 | A |
| 功率 | 2200 | W |
| 频率 | 50 | Hz |

### 1.3 计算公式

这个产品使用的计算公式是：

**公式**：$P = U \times I$

其中：
- P 是功率（单位：W）
- U 是电压（单位：V）
- I 是电流（单位：A）

也可以写成更完整的形式：

$$
P = U \times I
$$

### 1.4 产品外观

**图1.1**：产品外观图

![产品外观图](images/image_0.png)

这是一款黑色智能手机，正面有6.5英寸屏幕，
后置三摄相机，侧面有音量键和电源键。
```

---

### Markdown格式是什么？

**Markdown** = 一种简单的文字格式

**特点**：

- ✅ 用符号标记格式
- ✅ 人可以直接阅读
- ✅ 很多软件都能打开
- ✅ 很容易转换成其他格式（比如PDF、HTML）

---

### Markdown常用符号

| 符号                              | 用途       | 例子           | 显示效果     |
| --------------------------------- | ---------- | -------------- | ------------ |
| `#`                               | 一级标题   | `# 标题`       | 大标题       |
| `##`                              | 二级标题   | `## 小标题`    | 中标题       |
| `###`                             | 三级标题   | `### 更小标题` | 小标题       |
| `-`                               | 无序列表   | `- 项目1`      | • 项目1      |
| `**文字**`                        | 加粗       | `**重要**`     | **重要**     |
| `$公式$`                          | 行内公式   | `$E=mc^2$`     | 公式在行内   |
| `$$公式$$`                        | 独立公式   | `$$E=mc^2$$`   | 公式单独一行 |
| `![描述](图片路径)`                | 插入图片   | `![alt](图片路径)` | 显示图片     |
| `![图](img.png)`                   | 显示图片   | `![图](img.png)`   | 显示图片     |
| `|`                               | 表格分割线 | \|列1\|列2\|   | 表格         |

---

### 怎么打开test.md？

**方法1：用记事本**

```
1. 右键点击 test.md
2. 选择"打开方式"
3. 选择"记事本"
```

**方法2：用VSCode（推荐）**

```
1. 安装VSCode（如果还没有）
2. 右键点击 test.md
3. 选择"Open with Code"
```

**方法3：用Typora（最好看）**

```
1. 安装Typora（Markdown编辑器）
2. 双击 test.md
3. 会看到排版好的效果（就像Word文档一样）
```

---

## 4.3 images文件夹

### 这是什么？

**images/** - 提取的图片

**里面有什么？**

```
images/
├── image_0.png    # 第1张图片
├── image_1.png    # 第2张图片
├── image_2.png    # 第3张图片
└── ...
```

---

### 图片是怎么命名的？

- `image_0.png`：第1张图片
- `image_1.png`：第2张图片
- `image_2.png`：第3张图片
- ...

**注意**：是从0开始数的，不是1！

---

### 怎么看这些图片？

**方法1：直接双击打开**

```
1. 打开images文件夹
2. 双击 image_0.png
3. 会用默认的图片查看器打开
```

**方法2：在test.md里看**

在test.md里，会看到这样的内容：

```markdown
![产品外观图](images/image_0.png)
```

**如果在Typora里打开test.md**：

- 会直接显示图片（不用单独打开）
- 鼠标悬停可以看到图片路径

---

## 4.4 其他文件（给程序用的）

### test_middle.json

**这是什么？**

- 中间格式数据
- 给程序处理用的
- 包含了所有提取的信息（文字、表格、公式、图片）

---

**里面有什么？**

```json
{
  "pdf_info": {
    "title": "技术手册",
    "authors": [],
    "page_count": 10,
    "language": "ch",
    "sections": [
      {
        "text": "1. 产品介绍",
        "level": 1,
        "content": "这是产品介绍段落...",
        "children": [...]
      }
    ],
    "tables": [...],
    "images": [...],
    "formulas": [...]
  }
}
```

---

**用来做什么？**

- ⭕ 提取表格数据
- ⭕ 提取公式
- ⭕ 提取图片描述
- ⭕ 做二次开发（比如构建搜索系统）

**普通人需要这个吗？**

- 不需要！
- 如果你只是想看看PDF里的内容，用test.md就够了
- 如果你想用程序处理PDF，才需要这个

---

### test_content_list.json

**这是什么？**

- 内容列表
- 按阅读顺序排列
- 适合用来搜索

---

**里面有什么？**

```json
[
  {
    "type": "text",
    "content": "这是段落内容..."
  },
  {
    "type": "table",
    "content": "<table>...</table>",
    "caption": "表格1.1"
  },
  {
    "type": "image",
    "content": "产品外观图，展示正面视图"
  },
  {
    "type": "formula",
    "content": "P = U × I"
  }
]
```

---

**用来做什么？**

- ⭕ 构建搜索系统
- ⭕ 快速查找内容
- ⭕ 做内容分析

**普通人需要这个吗？**

- 不需要！
- 除非你要做搜索系统

---

### test_model.json

**这是什么？**

- 模型输出
- 调试用
- 包含了模型识别的详细信息

---

**用来做什么？**

- ⭕ 调试（看看模型识别得对不对）
- ⭕ 分析识别结果

**普通人需要这个吗？**

- 不需要！
- 除非你要调试问题

---

## 4.5 可视化文件（检查用）

### test_layout.pdf

**这是什么？**

- 布局可视化
- 把PDF的版面布局画出来

---

**用来做什么？**

- ⭕ 检查MinerU识别的版面对不对
- ⭕ 看看哪块被识别成标题、正文、表格

---

**举例**：

```
原始PDF：
┌──────────────────────────────────┐
│  1. 产品介绍                                              │
│                                                          │
│  这是段落内容。                                            │
│                                                          │
│  ┌──────────┐                                   │
│  │  表格1           │                                   │
│  └──────────┘                                    │
└──────────────────────────────────┘

test_layout.pdf：
┌──────────────────────────────────┐
│  [标题框] 1. 产品介绍                                      │
│                                                          │
│  [文本框] 这是段落内容。                                    │
│                                                          │
│  ┌──────────┐                                   │
│  │[表格框] │                                            │
│  └──────────┘                                    │
└──────────────────────────────────┘

说明：
- 红框 = 标题
- 蓝框 = 正文
- 绿框 = 表格
```

---

**普通人需要这个吗？**

- 一般不需要
- 除非你想检查识别效果

---

### test_span.pdf

**这是什么？**

- 文字span可视化
- 显示每个文字片段的位置

---

**用来做什么？**

- ⭕ 检查文字提取的位置对不对
- ⭕ 调试文字提取问题

---

**普通人需要这个吗？**

- 不需要！
- 除非要调试文字提取问题

---

### test_origin.pdf

**这是什么？**

- 原始PDF
- 备份

---

**用来做什么？**

- ⭕ 对比处理前后的差异
- ⭕ 作为备份

---

**普通人需要这个吗？**

- 不需要！
- 只是一个备份文件

---

## 4.6 文件大小参考

### 一个10页的PDF，输出文件大概多大？

| 文件                   | 大小       | 说明          |
| ---------------------- | ---------- | ------------- |
| test.md                | 10KB       | 很小，纯文字  |
| images/                | 5MB        | 看图片多少    |
| test_middle.json       | 2MB        | 中等          |
| test_content_list.json | 1MB        | 较小          |
| test_model.json        | 3MB        | 中等          |
| test_layout.pdf        | 1MB        | 和原PDF差不多 |
| test_span.pdf          | 1MB        | 和原PDF差不多 |
| test_origin.pdf        | 1MB        | 原始PDF       |
| **总计**               | **约15MB** |               |

---

## 4.7 实际操作：查看输出

### 步骤1：处理一个PDF

```bash
# 假设你已经处理了一个PDF
mineru -p test.pdf -o output
```

---

### 步骤2：查看文件列表

```bash
# 进入output文件夹
cd output

# 查看所有文件
ls -lh
```

**你会看到**：

```
-rw-rw-r-- 1 user user  12K  2月20 16:00 test.md
-rw-rw-r-- 1 user user 2.1M  2月20 16:00 test_middle.json
-rw-rw-r-- 1 user user 1.5M  2月20 16:00 test_model.json
-rw-rw-r-- 1 user user 980K  2月20 16:00 test_content_list.json
-rw-rw-r-- 1 user user 1.1M  2月20 16:00 test_layout.pdf
-rw-rw-r-- 1 user user 1.1M  2月20 16:00 test_span.pdf
-rw-rw-r-- 1 user user 1.1M  2月20 16:00 test_origin.pdf
drwxrwxr-x 2 user user 4.0K  2月20 16:00 images
```

---

### 步骤3：打开test.md

```bash
# 用文本编辑器打开
# 假设你用nano（命令行编辑器）
nano test.md

# 或者直接用记事本打开（在Windows文件管理器里）
```

**你会看到**：

- 整齐的文字
- 表格
- 公式
- 图片引用

---

### 步骤4：查看图片

```bash
# 进入images文件夹
cd images

# 查看图片
ls -lh

# 用图片查看器打开
# Linux: eog image_0.png
# Windows: 直接双击
# Mac: open image_0.png
```

---

### 步骤5：对比原始PDF

```bash
# 打开原始PDF
# 和test.md对比一下

# 你会发现：
# - 文字提取出来了
# - 表格整理好了
# - 公式转换成标准格式了
# - 图片单独保存了
```

---

## 4.8 文件选择指南

### 你需要什么文件？

| 你的需求           | 需要的文件       | 说明                      |
| ------------------ | ---------------- | ------------------------- |
| **只想看PDF内容**  | test.md          | 这就够了！                |
| **想看图片**       | images/          | 图片文件夹                |
| **想用程序处理**   | test_middle.json | 或 test_content_list.json |
| **想检查识别效果** | test_layout.pdf  | 查看版面识别              |
| **想调试问题**     | test_model.json  | 查看模型输出              |

---

### 推荐的使用方式

**普通用户**：

1. 只需要 `test.md`
2. 如果有图片，还需要 `images/`

**开发者**：

1. 需要 `test_middle.json` 或 `test_content_list.json`
2. 可能需要 `test_model.json` 调试

**调试者**：

1. 需要 `test_layout.pdf` 和 `test_span.pdf`
2. 对比 `test_origin.pdf`

---

## 本章小结

### 核心要点

1. **最重要的文件**：
   - `test.md` - 处理后的文字（你需要这个）
   - `images/` - 提取的图片

2. **给程序用的文件**：
   - `test_middle.json` - 中间数据
   - `test_content_list.json` - 内容列表

3. **调试用的文件**：
   - `test_model.json` - 模型输出
   - `test_layout.pdf` - 布局可视化
   - `test_span.pdf` - 文字可视化

4. **Markdown格式**：
   - 简单的文字格式
   - 用符号标记
   - 人可以直接阅读

5. **文件选择**：
   - 普通用户 → test.md + images/
   - 开发者 → test_middle.json
   - 调试者 → 可视化文件

---

## 实践任务

### 任务1：查看所有文件

- [ ] 处理一个PDF
- [ ] 列出所有输出文件
- [ ] 打开test.md查看

### 任务2：查看图片

- [ ] 进入images文件夹
- [ ] 打开所有图片
- [ ] 在test.md里找到图片引用

### 任务3：对比文件

- [ ] 对比test.md和原始PDF
- [ ] 看看文字提取得对不对
- [ ] 看看表格整理得对不对

# 第5章：实战案例1 - 简单文档解析



## 学习目标

学完这一章，你将能够：

- ✅ 完成一个完整的MinerU处理流程
- ✅ 评估MinerU的处理效果
- ✅ 解决常见问题
- ✅ 记录自己的学习笔记

---

## 5.1 案例背景

### 我们要做什么？

**目标**：处理一份技术手册PDF

**需要**：

1. 提取文档内容（文字、表格、公式、图片）
2. 评估MinerU的处理效果
3. 提取表格数据到Excel

---

### 为什么选择这个案例？

**原因**：

- ✅ 简单易上手
- ✅ 涵盖了MinerU的主要功能
- ✅ 适合第一次练习
- ✅ 容易看到效果

---

## 5.2 准备工作

### 步骤1：创建工作文件夹

```bash
# 创建一个专门的文件夹
mkdir mineru_demo

# 进入这个文件夹
cd mineru_demo

# 创建子文件夹
mkdir pdfs
mkdir output
```

**文件夹结构**：

```
mineru_demo/
├── pdfs/          # 放PDF文件
└── output/        # 放处理结果
```

---

### 步骤2：准备测试PDF

**选项1：用自己的PDF**

```bash
# 把你的PDF文件复制到pdfs文件夹
# 改名为 manual.pdf
```

**选项2：下载测试PDF**

```bash
# 下载一个测试PDF
cd pdfs
wget https://arxiv.org/pdf/2409.18839 -O manual.pdf
cd ..
```

**选项3：用你手头的任何PDF**

```bash
# 只要是PDF就可以，内容不重要
# 重要的是你能看到处理过程
```

---

### 步骤3：确认PDF文件存在

```bash
# 查看pdfs文件夹
ls -lh pdfs/

# 应该能看到 manual.pdf
```

---

## 5.3 第一次处理

### 运行MinerU

```bash
# 在mineru_demo文件夹里，运行：
mineru -p pdfs/manual.pdf -o output
```

> 注意：第一次运行会下载对应的模型，MinerU使用 `HuggingFace` 和 `ModelScope` 作为模型仓库，用户可以根据需要切换模型源或使用本地模型。
>
> - `HuggingFace` 是默认的模型源，在全球范围内提供了优异的加载速度和极高稳定性。
> - `ModelScope` 是中国大陆地区用户的最佳选择，提供了无缝兼容的SDK模块，适用于无法访问`HuggingFace`的用户。

如果遇到模型下载失败的情况，在当前命令行终端窗口设置一下国内的模型源，这样下载模型会快很多。

Windows: ：

```bash
set MINERU_MODEL_SOURCE=modelscope
```

Linux/MacOS：

```bash
export MINERU_MODEL_SOURCE=modelscope
```



**运行后大概会看到以下内容**

```
2026-02-20 17:15:56.887 | INFO     | mineru.backend.vlm.vlm_analyze:get_model:218 - get mlx-engine predictor cost: 2.19s
2026-02-20 17:15:59.033 | INFO     | mineru.backend.hybrid.hybrid_analyze:get_batch_ratio:365 - hybrid batch ratio (auto, vram=1GB): 1
Predict:   0%|                                                                                                                                        | 0/14 [00:00<?, ?it/s]mx.metal.device_info is deprecated and will be removed in a future version. Use mx.device_info instead.
Predict: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 14/14 [01:10<00:00,  5.00s/it]
Predict: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 6/6 [00:10<00:00,  1.73s/it]
Downloading Model from https://www.modelscope.cn to directory: /Users/zhangzhe/.cache/modelscope/hub/models/OpenDataLab/PDF-Extract-Kit-1.0
2026-02-20 17:17:21,021 - modelscope - INFO - Target directory already exists, skipping creation.
Downloading Model from https://www.modelscope.cn to directory: /Users/zhangzhe/.cache/modelscope/hub/models/OpenDataLab/PDF-Extract-Kit-1.0
2026-02-20 17:17:22,090 - modelscope - INFO - Target directory already exists, skipping creation.
Downloading Model from https://www.modelscope.cn to directory: /Users/zhangzhe/.cache/modelscope/hub/models/OpenDataLab/PDF-Extract-Kit-1.0
2026-02-20 17:17:24,611 - modelscope - INFO - Target directory already exists, skipping creation.
Downloading Model from https://www.modelscope.cn to directory: /Users/zhangzhe/.cache/modelscope/hub/models/OpenDataLab/PDF-Extract-Kit-1.0
2026-02-20 17:17:26,048 - modelscope - INFO - Target directory already exists, skipping creation.
MFD Predict: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 14/14 [00:04<00:00,  3.08it/s]
MFR Predict: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 5/5 [00:03<00:00,  1.58it/s]
OCR-det: 100%|███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 14/14 [00:09<00:00,  1.51it/s]
OCR-rec Predict: 100%|█████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 2/2 [00:00<00:00,  6.06it/s]
2026-02-20 17:17:45.694 | INFO     | mineru.cli.common:_process_output:168 - local output dir is output/test/hybrid_auto
```



### 处理时间参考

| 文档页数 | 处理时间   | 说明     |
| -------- | ---------- | -------- |
| 10页     | 30秒-1分钟 | 很快     |
| 50页     | 2-3分钟    | 还可以   |
| 100页    | 5-10分钟   | 需要等待 |

---

## 5.4 查看处理结果

### 步骤1：查看输出文件

```bash
# 查看output文件夹
ls -lh output/
```

**你会看到**：

```
output/
├── manual.md
├── manual_middle.json
├── manual_model.json
├── manual_content_list.json
├── manual_layout.pdf
├── manual_span.pdf
├── manual_origin.pdf
└── images/
    ├── image_0.png
    ├── image_1.png
    └── ...
```

---

### 步骤2：打开manual.md

```bash
# 用文本编辑器打开
# 方法1：用nano（命令行）
nano output/manual.md

# 方法2：用记事本（Windows文件管理器）
# 直接双击manual.md
```

**你会看到什么？**

打开manual.md，你会看到类似这样的内容：

```markdown
# 文档标题

## 1. 章节标题

这是段落内容，可以包含多个句子。

### 1.1 子章节标题

**列表项1**
**列表项2**

**表格1.1**：表格标题

| 列1 | 列2 | 列3 |
|------|------|------|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

**公式**：$E = mc^2$（行内公式）

**公式**：$$
\int_0^1 f(x) dx
$$（块级公式）

![图片1](images/image_0.png)
```

---

### 步骤3：查看提取的图片

```bash
# 进入images文件夹
cd output/images

# 查看所有图片
ls -lh

# 用图片查看器打开
# Windows：直接双击
# Linux: eog image_0.png
# Mac: open image_0.png
```

---

### 步骤4：对比原始PDF

```bash
# 打开原始PDF
# output/manual_origin.pdf

# 和你处理后的manual.md对比
# 看看文字提取得对不对
# 看看表格整理得对不对
```

---

## 5.5 评估处理效果

### 评估表格

#### 检查项1：表格完整性

**怎么检查？**

1. 在manual.md里找到表格
2. 对比原始PDF
3. 看看有没有遗漏的单元格

**示例**：

```
原始PDF的表格：
┌──────┬──────┬──────┐
│      姓名 │      年龄 │      城市 │
├──────┼──────┼──────┤
│ 张三      │ 25        │     北京 │
│ 李四      │ 30        │     上海 │
└──────┴──────┴──────┘

manual.md里的表格：
| 姓名 | 年龄 | 城市 |
|------|------|------|
| 张三 | 25   | 北京 |
| 李四 | 30   | 上海 |

✅ 对上了！表格提取完整
```

---

**评估记录表**：

| 检查项       | 结果  | 说明       |
| ------------ | ----- | ---------- |
| 表格完整性   | ✅ / ❌ | 是否有遗漏 |
| 单元格正确性 | ✅ / ❌ | 内容对不对 |
| 表格标题     | ✅ / ❌ | 标题对不对 |

---

#### 检查项2：跨页表格

**如果你的PDF有跨页表格**：

**检查**：

- 表格是否合并成一个完整表格？
- 数据是否完整？

**预期结果**：

- ✅ MinerU 2.7.2+版本会自动合并跨页表格
- ⚠️ 旧版本可能不会合并

---

### 评估文字

#### 检查项1：文字完整性

**怎么检查？**

1. 在manual.md里找一段文字
2. 在原始PDF里找对应的位置
3. 对比看看文字是否一样

**示例**：

```
原始PDF：
"这款产品采用最新的AI技术，能够自动识别文档中的文字、表格、公式和图片。"

manual.md：
"这款产品采用最新的AI技术，能够自动识别文档中的文字、表格、公式和图片。"

✅ 对上了！文字提取正确
```

---

**评估记录表**：

| 检查项     | 结果  | 说明       |
| ---------- | ----- | ---------- |
| 文字完整性 | ✅ / ❌ | 是否有遗漏 |
| 乱码情况   | ✅ / ❌ | 有没有乱码 |
| 标题层级   | ✅ / ❌ | 层级对不对 |
| 段落顺序   | ✅ / ❌ | 顺序对不对 |

---

### 评估公式

#### 检查项1：公式识别

**怎么检查？**

1. 在manual.md里找公式
2. 对比原始PDF
3. 看看公式是否识别正确

**示例**：

```
原始PDF的公式：
      2
E = mc

manual.md里的公式：
$E = mc^2$

✅ 对上了！公式识别正确
```

---

**评估记录表**：

| 检查项      | 结果  | 说明            |
| ----------- | ----- | --------------- |
| 公式识别    | ✅ / ❌ | 是否识别出公式  |
| LaTeX准确性 | ✅ / ❌ | LaTeX格式对不对 |

---

### 评估图片

#### 检查项1：图片提取

**怎么检查？**

1. 打开images文件夹
2. 看看有多少张图片
3. 对比原始PDF

**示例**：

```
原始PDF有3张图片：
- 第1页：产品外观图
- 第3页：技术原理图
- 第5页：使用示例图

images文件夹有3张图片：
- image_0.png
- image_1.png
- image_2.png

✅ 对上了！图片提取完整
```

---

**评估记录表**：

| 检查项   | 结果  | 说明         |
| -------- | ----- | ------------ |
| 图片数量 | ✅ / ❌ | 数量对不对   |
| 图片描述 | ✅ / ❌ | 描述准不准确 |

---

## 5.6 提取表格数据到Excel

### 为什么需要这个？

**场景**：

- 表格数据很有用
- 想在Excel里分析
- 想导入到数据库

---

### 方法1：手动复制粘贴（最简单）

**步骤**：

1. 打开manual.md
2. 找到表格
3. 选中表格内容
4. 复制（Ctrl+C）
5. 打开Excel
6. 粘贴（Ctrl+V）

**优点**：

- ✅ 最简单
- ✅ 不需要写代码

**缺点**：

- ❌ 只能一张一张表格处理
- ❌ 如果有很多表格，会很慢

---

### 方法2：用脚本批量提取（推荐）

**如果你不会Python，可以跳过这部分**

如果你会Python，可以用这个脚本：

```python
import json
import csv

# 读取中间格式JSON
with open('output/manual_middle.json', 'r', encoding='utf-8') as f:
    middle = json.load(f)

# 提取表格
tables = middle['pdf_info'].get('tables', [])

print(f"找到 {len(tables)} 个表格")

# 把每个表格保存成CSV
for i, table in enumerate(tables):
    html = table['html']
    caption = table['caption']

    print(f"\n表格{i+1}: {caption}")

    # 简单的HTML表格解析（实际应该用BeautifulSoup）
    # 这里用简单的方式提取

    # 保存到CSV
    filename = f"output/table_{i+1}.csv"
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # 这里简化了，实际应该用BeautifulSoup解析HTML
        writer.writerow(["表格内容"])

    print(f"  已导出: {filename}")

print("\n表格提取完成！")
```

---

**说明**：

- 这个脚本会读取middle.json
- 提取所有表格
- 保存成CSV文件（Excel能打开）

---

## 5.7 记录学习笔记

### 创建学习笔记文件

```bash
# 在mineru_demo文件夹创建笔记
touch 学习笔记.md

# 用文本编辑器打开
nano 学习笔记.md
```

---

### 写下你的学习笔记

**模板**：

```markdown
# MinerU学习笔记

## 日期
2026-02-20

## 处理的PDF
文件名：manual.pdf
页数：10页

## 处理时间
开始：16:00
结束：16:05
耗时：5分钟

## 处理效果评估

### 文字提取
- 完整性：✅
- 乱码：无
- 顺序：✅

### 表格提取
- 完整性：✅
- 正确性：✅
- 跨页：无

### 公式识别
- 识别：✅
- 准确性：✅

### 图片提取
- 数量：3张
- 描述：✅

## 遇到的问题

1. 无

2. 无

## 解决方法

1. 无

2. 无

## 学习心得

1. MinerU很好用，处理速度很快
2. 表格提取很准确
3. 公式识别很方便

## 下一步计划

1. 尝试处理更多的PDF
2. 学习Python API
3. 构建搜索系统
```

---

## 5.8 常见问题

### 问题1：处理速度慢

**现象**：

- 处理一个PDF需要很长时间
- 看起来卡住了

**原因**：

- PDF页数多
- 没有GPU加速
- PDF内容复杂（表格、公式多）

**解决方法**：

**方法1：只用CPU**

```bash
# 用pipeline后端（纯CPU）
mineru -p pdfs/manual.pdf -o output -b pipeline
```

**方法2：只处理部分页面**

```bash
# 只处理前10页
mineru -p pdfs/manual.pdf -o output --end-page-id 9
```

**方法3：等待**

- 耐心等待，MinerU正在处理
- 不要中断，否则要重新来

---

### 问题2：表格识别不准确

**现象**：

- 表格识别不全
- 单元格内容错了
- 跨页表格没合并

**解决方法**：

**方法1：升级MinerU**

```bash
# 升级到最新版本
pip install --upgrade mineru
```

**方法2：换后端**

```bash
# 用vlm-auto-engine（更高准确度）
mineru -p pdfs/manual.pdf -o output -b vlm-auto-engine
```

**方法3：手动调整**

- 在Excel里手动修正表格
- 或者在manual.md里手动调整

---

### 问题3：公式没识别

**现象**：

- 公式没有被识别
- 还是普通文字

**解决方法**：

**方法1：检查公式格式**

- 确认PDF里确实是公式
- 不是只是数字或符号

**方法2：用更高级的后端**

```bash
# 用vlm-auto-engine
mineru -p pdfs/manual.pdf -o output -b vlm-auto-engine
```

---

### 问题4：图片没提取

**现象**：

- images文件夹是空的
- 或者图片数量不对

**解决方法**：

**方法1：检查PDF里有没有图片**

- 打开原始PDF
- 看看是不是真的有图片

**方法2：检查images文件夹**

```bash
# 查看images文件夹
ls -lh output/images/
```

**方法3：重新处理**

```bash
# 重新运行MinerU
mineru -p pdfs/manual.pdf -o output
```

---

## 本章小结

### 你做了什么？

1. ✅ 创建工作文件夹
2. ✅ 准备测试PDF
3. ✅ 用MinerU处理PDF
4. ✅ 查看处理结果
5. ✅ 评估处理效果
6. ✅ 提取表格数据
7. ✅ 写学习笔记

---

### 你学到了什么？

1. **MinerU的基本使用**：
   - 怎么运行
   - 怎么看结果

2. **效果评估**：
   - 怎么评估文字、表格、公式、图片

3. **问题解决**：
   - 处理速度慢怎么办
   - 识别不准确怎么办

---

### 下一步

**完成这个案例后**：

- ✅ 你已经会用MinerU了
- ✅ 知道怎么评估效果
- ✅ 知道怎么解决常见问题

**可以继续**：

- 学习Python API（第6章）
- 尝试处理更多的PDF
- 尝试更复杂的案例

---

## 实践任务

### 任务1：完成基本流程

- [ ] 创建工作文件夹
- [ ] 准备测试PDF
- [ ] 运行MinerU
- [ ] 查看结果

### 任务2：评估效果

- [ ] 评估文字提取
- [ ] 评估表格提取
- [ ] 评估公式识别
- [ ] 评估图片提取

### 任务3：提取表格

- [ ] 复制表格到Excel
- [ ] 或用脚本批量提取

### 任务4：写学习笔记

- [ ] 记录处理过程
- [ ] 记录遇到的问题
- [ ] 记录学习心得

# MinerU 模型架构与解析流程全解

> MinerU 是一个将 PDF 高质量转换为 Markdown 的开源工具。
> 本文档从整体架构到底层模型、从后端引擎到配置文件，完整梳理 MinerU 的解析体系。

---

## 1、整体架构概览

MinerU 提供了**两套解析方法**，搭配**三种运行方式**，组合出 5 种后端引擎。

```
MinerU 解析体系
├── 解析方法（做什么）
│   ├── Pipeline / Hybrid ── 传统流水线，8 个专业小模型协作
│   └── VLM ──────────────── 端到端视觉语言大模型，一步到位
│
└── 运行方式（怎么跑）
    ├── pipeline ─────────── 纯传统流水线，本地运行
    ├── auto-engine ──────── 本地自动引擎（hybrid / vlm）
    └── http-client ──────── 远程 API 调用（hybrid / vlm）
```

### 两套解析方法对比

| 对比项       | Pipeline / Hybrid（传统）                        | VLM（新一代）                      |
| ------------ | ------------------------------------------------ | ---------------------------------- |
| **模型目录** | `PDF-Extract-Kit-1.0`                            | `MinerU2.5-2509-1.2B`              |
| **核心思路** | 8 个专业小模型流水线协作                         | 1 个 1.2B 参数端到端大模型         |
| **处理方式** | PDF → 图片 → 切块 → 分类 → 各模型处理 → 排序拼接 | PDF → 图片 → VLM 直接输出 Markdown |
| **精度指标** | 82+                                              | 90+                                |
| **优势**     | 成熟稳定，各模块可单独调优                       | 架构简洁，上下文理解更强           |
| **适用场景** | 复杂排版、高精度表格/公式                        | 通用文档快速解析                   |

---

## 2、五种后端引擎详解

### 引擎对比表

| 对比项           | pipeline                         | auto-engine hybrid | auto-engine vlm | http-client hybrid       | http-client vlm          |
| ---------------- | -------------------------------- | ------------------ | --------------- | ------------------------ | ------------------------ |
| **解析方法**     | 传统流水线                       | 本地混合引擎       | 本地 VLM 引擎   | 远程混合引擎             | 远程 VLM 引擎            |
| **后端特性**     | 兼容性好                         | 硬件要求较高       | 硬件要求较高    | 适用于 OpenAI 兼容服务器 | 适用于 OpenAI 兼容服务器 |
| **精度指标**     | 82+                              | 82+                | 90+             | 82+                      | 90+                      |
| **纯 CPU 支持**  | ✅                                | ✅                  | ❌               | ✅                        | ✅                        |
| **GPU 加速**     | Volta 及以后架构 / Apple Silicon | 同左               | 同左            | 不需要                   | 不需要                   |
| **显存最低要求** | 6GB                              | 10GB               | 8GB             | 3GB                      | 不需要                   |
| **内存要求**     | 最低 16GB，推荐 32GB             | 同左               | 同左            | 最低 8GB                 | 最低 8GB                 |
| **磁盘空间**     | 20GB+，推荐 SSD                  | 同左               | 同左            | 至少 2GB                 | 至少 2GB                 |
| **Python 版本**  | 3.10 - 3.13                      | 同左               | 同左            | 同左                     | 同左                     |

### 三大类引擎说明

**pipeline（传统流水线）**
最经典的模式。8 个专业模型按流水线顺序处理，兼容性最好，纯 CPU 也能跑，精度 82+，显存最低 6GB。

**auto-engine（本地自动引擎）**
模型在本地运行，分两种方法：`hybrid` 混合模式（显存 10GB，精度 82+）和 `vlm` 端到端模式（显存 8GB，精度 90+，必须有 GPU）。

**http-client（远程客户端）**
模型不在本地运行，调用远程 OpenAI 兼容 API。本地硬件要求极低（内存 8GB、磁盘 2GB），不需要 GPU。同样分 `hybrid` 和 `vlm` 两种方法。

### 命令行切换

```bash
# Pipeline 模式（默认）
mineru -p input.pdf -o output_dir --source local

# VLM 模式
mineru -p input.pdf -o output_dir --source local --method vlm
```

---

## 3、VLM 引擎

`MinerU2.5-2509-1.2B` 是一个 **1.2B 参数的视觉语言模型（Vision-Language Model）**，采用端到端架构。

### 3.1 工作原理

```
PDF 页面 → 渲染为图片 → VLM 模型一次性处理 → 直接输出 Markdown
```

与传统 Pipeline 不同，VLM 不需要先切块再分类，而是像一个"全能选手"一样，一次性完成版面理解、文字识别、表格还原、公式转换等所有任务。

### 3.2 核心优势

- **架构简洁**：不需要 8 个模型的复杂调度，部署和维护更简单。
- **上下文感知强**：大模型能理解页面的整体语义，不会因为切块而丢失上下文。
- **持续进化**：受益于视觉语言模型的快速发展，后续版本能力提升空间大。

---

## 4、Pipeline 引擎 

### 4.1 8 大模型职责一览

| 模型             | 全称                          | 角色定位   | 核心职责                                             |
| ---------------- | ----------------------------- | ---------- | ---------------------------------------------------- |
| **OriCls**       | Orientation Classification    | 方向分类器 | 判断页面是否旋转（0°/90°/180°/270°），将歪斜页面摆正 |
| **Layout**       | Layout Analysis               | 版面分析   | 画包围框，识别正文、标题、插图、页眉页脚等区域       |
| **MFD**          | Math Formula Detection        | 公式检测   | 扫描数学公式位置，区分行内公式与行间公式             |
| **MFR**          | Math Formula Recognition      | 公式识别   | 将公式截图转换为标准 LaTeX 代码                      |
| **TabCls**       | Table Classification          | 表格分类   | 判断表格类型：有线表、无线表、三线表等               |
| **TabRec**       | Table Recognition             | 表格识别   | 还原行列结构和合并单元格，输出 HTML/Markdown 表格    |
| **OCR**          | Optical Character Recognition | 文字识别   | 将"普通文本"区域的像素转换为可编辑文本               |
| **ReadingOrder** | Reading Order                 | 阅读顺序   | 决定所有区块的排列顺序，处理分栏、图文混排           |

### 4.2 处理流程（以复杂 PDF 页面为例）

**步骤 1：预处理与纠正**

```
PDF 页面 → 渲染为高清图片 → OriCls 检测方向 → 旋转摆正
```

**步骤 2：版面切割（定位区域）**

```
摆正后的页面图片
    ├── Layout  → 识别：段落、标题、图片、页眉页脚、表格等区块
    └── MFD     → 识别：行内公式、行间公式的位置
```

两个模型并行工作，将页面切成若干带标签的小方块。

**步骤 3：分类处理（各显神通）**

流水线在此处**分叉**，不同标签的区块交给对应的专家：

```
标签为「段落/标题」的区块  ──→  OCR      ──→  输出纯文本
标签为「公式」的区块        ──→  MFR      ──→  输出 LaTeX 代码
标签为「表格」的区块        ──→  TabCls   ──→  判断表格类型
                                  └──→  TabRec   ──→  输出 Markdown/HTML 表格
标签为「图片」的区块        ──→  直接提取保存为图片文件
```

**步骤 4：排序重组（最终输出）**

```
所有提取结果（文本 + LaTeX + 表格 + 图片引用）
    └── ReadingOrder → 按正确的阅读顺序排列 → 拼接为最终 Markdown
```

### 4.3 整体流水线图

```
┌─────────────────────────────────────────────────────────┐
│                    PDF 文件输入                                                                   │
└────────────────────────┬────────────────────────────────┘
                                           ▼
                  ┌──────────────┐
                  │   页面渲染              │  PDF → 高清图片
                  └──────┬───────┘
                              ▼
                  ┌──────────────┐
                  │   OriCls               │  方向检测 & 纠正
                  └──────┬───────┘
                              ▼
              ┌──────────┴──────────┐
              ▼                                   ▼
       ┌────────────┐       ┌────────────┐
       │   Layout            │       │    MFD             │
       │  版面分析            │       │  公式检测           │
       └─────┬──────┘       └─────┬──────┘
             │                                 │
             └────────┬───────────┘
                            ▼
            ┌─────────┴─────────┐
            │   区块分发中心     │
            └──┬────┬────┬───┬──┘
               │    │    │   │
    ┌──────┐ ┌─┴──┐ │ ┌──┴───┴──┐
    │ OCR      │ │MFR    │ │ │ TabCls        │
    │文字       │ │公式   │ │ │表格分类        │
    └──┬───┘ └─┬──┘ │ └───┬─────┘
       │       │    │                ▼
       │       │    │ ┌────────┐
       │       │    │ │ TabRec       │
       │       │    │ │表格识别       │
       │       │    │ └───┬────┘
       │       │    │        │
       └───────┴────┴─────┘
                             ▼
           ┌───────────────┐
           │ ReadingOrder            │  阅读顺序排列
           └───────┬───────┘
                         ▼
           ┌───────────────┐
           │  Markdown 输出            │
           └───────────────┘
```

---

## 5、mineru.json 配置文件

`mineru.json` 是 MinerU 的**全局配置文件**，控制模型路径、输出格式、LLM 辅助等核心行为。

### 5.1 完整配置示例

```json
{
    "bucket_info": {
        "bucket-name-1": ["ak", "sk", "endpoint"],
        "bucket-name-2": ["ak", "sk", "endpoint"]
    },
    "latex-delimiter-config": {
        "display": { "left": "$$", "right": "$$" },
        "inline":  { "left": "$",  "right": "$" }
    },
    "llm-aided-config": {
        "title_aided": {
            "api_key": "your_api_key",
            "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
            "model": "qwen3-next-80b-a3b-instruct",
            "enable_thinking": false,
            "enable": false
        }
    },
    "models-dir": {
        "pipeline": "",
        "vlm": ""
    },
    "config_version": "1.3.1"
}
```

### 5.2 说明

**`models-dir` — 本地模型路径（最关键）**

指定两套模型在本地磁盘的存放路径，连接"配置"与"模型目录"的桥梁：

```json
"models-dir": {
    "pipeline": "/path/to/PDF-Extract-Kit-1.0",
    "vlm": "/path/to/MinerU2.5-2509-1.2B"
}
```

- `pipeline`：指向传统 8 模型目录（第四节的 PDF-Extract-Kit-1.0）
- `vlm`：指向 VLM 端到端模型目录（第三节的 MinerU2.5-2509-1.2B）
- 留空则使用默认的 ModelScope 缓存路径

**`bucket_info` — 对象存储配置**

配置云端对象存储（如阿里云 OSS、AWS S3），解析出的图片可自动上传，Markdown 中的图片引用替换为云端 URL：

- `bucket-name`：存储桶名称
- `ak`：Access Key（访问密钥）
- `sk`：Secret Key（秘密密钥）
- `endpoint`：存储服务接入点地址
- 不需要上传图片到云端则留空即可

**`latex-delimiter-config` — LaTeX 公式定界符**

控制输出 Markdown 中数学公式的包裹符号：

- `display`：行间公式（块级，独占一行），默认 `$$...$$`
- `inline`：行内公式（与文字混排），默认 `$...$`
- 影响下游工具（Typora、Obsidian 等）能否正确渲染公式

**`llm-aided-config` — LLM 辅助增强**

调用外部 LLM 辅助优化解析结果：

- `title_aided`：标题辅助识别，当 PDF 标题层级不清晰时，调用 LLM 判断标题级别（H1/H2/H3...）
- `api_key`：LLM 服务的 API 密钥
- `base_url`：接入地址（兼容 OpenAI 协议）
- `model`：使用的模型名称
- `enable_thinking`：是否开启"思考模式"（部分模型支持）
- `enable`：**总开关**，`false` 则不启用（默认关闭）

**`config_version` — 配置文件版本**

标识当前配置版本号（`1.3.1`），MinerU 升级时用于判断是否需要迁移配置。

---

## 6、模型目录结构与软链接

### 6.1 目录结构

```
models/OpenDataLab/
├── MinerU2.5-2509-1.2B          ← 真实目录（VLM 端到端模型，见第三节）
├── MinerU2__5-2509-1__2B        ← 软链接 → MinerU2.5-2509-1.2B
├── PDF-Extract-Kit-1.0          ← 真实目录（Pipeline 8 模型，见第四节）
└── PDF-Extract-Kit-1__0         ← 软链接 → PDF-Extract-Kit-1.0
```

`PDF-Extract-Kit-1.0` 内部的 8 个模型子目录：

```
PDF-Extract-Kit-1.0/models/
├── Layout          版面分析模型
├── MFD             公式检测模型
├── MFR             公式识别模型
├── OCR             文字识别模型
├── OriCls          方向分类模型
├── ReadingOrder    阅读顺序模型
├── TabCls          表格分类模型
└── TabRec          表格识别模型
```

### 6.2 软链接的作用

带双下划线的文件夹（如 `PDF-Extract-Kit-1__0`）是 MinerU 自动创建的**兼容性软链接**：

1. **原因**：ModelScope 的缓存机制等系统组件会把文件名中的 `.`（点号）误认为文件扩展名分隔符，导致路径解析出错。
2. **做法**：MinerU 下载模型后，自动创建一个将 `.` 替换为 `__` 的软链接。例如 `PDF-Extract-Kit-1.0` → `PDF-Extract-Kit-1__0`。
3. **结论**：两个文件夹指向完全相同的内容，代码内部通过带下划线的路径引用模型。**你不需要手动操作这些软链接**。

---

## 7、模型下载与自定义存储路径

### 7.1 默认下载行为

使用 `mineru-models-download` 命令下载模型时，默认会存储到系统用户目录下的缓存文件夹：

```
# Windows 默认路径
C:\Users\<用户名>\.cache\modelscope\hub\models\OpenDataLab\

# Linux 默认路径
~/.cache/modelscope/hub/models/OpenDataLab/
```

模型体积很大，默认全部塞进 C 盘的 `~/.cache` 会导致系统盘空间不足。

### 7.2 自定义下载目录

通过设置环境变量，可以将模型下载到指定磁盘：

**PowerShell（Windows）：**

```powershell
# 第一步：设置 ModelScope 缓存路径（当前终端窗口有效）
$env:MODELSCOPE_CACHE = "D:/ai_models/modelscope_cache"

# 第二步：执行下载
mineru-models-download
# 选择 modelscope 源，选择 all 下载全部模型
```

**Bash（Linux / macOS）：**

```bash
# 第一步：设置 ModelScope 缓存路径
export MODELSCOPE_CACHE="/ai_models/modelscope_cache"

# 第二步：执行下载
mineru-models-download
```

如果使用 HuggingFace 作为下载源，对应的环境变量是：

```powershell
# Windows
$env:HF_HOME = "D:/ai_models/huggingface_cache"

# Linux
export HF_HOME="/ai_models/huggingface_cache"
```

### 7.3 下载完成后必须更新 mineru.json

模型下载到自定义目录后，**必须**同步修改 `mineru.json` 中的 `models-dir`，否则 MinerU 运行时仍会去默认路径找模型，报 `FileNotFound` 错误。

`mineru.json` 的位置通常在用户根目录下（如 `C:\Users\Administrator\mineru.json` 或 `~/mineru.json`）。

修改 `models-dir` 字段，路径要指到包含模型文件的实际目录：

```json
{
    "bucket_info": {
        "bucket-name-1": [
            "ak",
            "sk",
            "endpoint"
        ],
        "bucket-name-2": [
            "ak",
            "sk",
            "endpoint"
        ]
    },
    "latex-delimiter-config": {
        "display": {
            "left": "$$",
            "right": "$$"
        },
        "inline": {
            "left": "$",
            "right": "$"
        }
    },
    "llm-aided-config": {
        "title_aided": {
            "api_key": "your_api_key",
            "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
            "model": "qwen3.5-plus",
            "enable_thinking": false,
            "enable": false
        }
    },
    "models-dir": {
        "pipeline": "D:\\ai_models\\modelscope_cache\\models\\OpenDataLab--PDF-Extract-Kit-1.0\\snapshots\\master",
        "vlm": "D:\\ai_models\\modelscope_cache\\models\\OpenDataLab--MinerU2.5-Pro-2605-1.2B\\snapshots\\master"
    },
    "config_version": "1.3.1"
}
```

> **注意**：路径中建议使用正斜杠 `/` 或双反斜杠 `\\`，避免 JSON 中单反斜杠被转义。具体路径层级以实际下载后的文件夹结构为准。

### 7.4 完整操作流程总结

```
1. 设置环境变量     →  指定下载目录（避免 C 盘爆满）
       ▼
2. mineru-models-download  →  下载 Pipeline + VLM 模型
       ▼
3. 修改 mineru.json →  更新 models-dir 指向新路径
       ▼
4. mineru -p xx.pdf →  正常使用，模型从自定义路径加载
```