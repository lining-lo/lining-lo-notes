# 1.Git概述
Git 是一个免费的、开源的分布式版本控制系统，可以快速高效地处理从小型到大型的各种项目。

Git 易于学习，占地面积小，性能极快。它具有廉价的本地库，方便的暂存区域和多个工作流分支等特性。

其性能优于 Subversion、CVS、Perforce 和 ClearCase 等版本控制工具。

## 1.1.什么是版本控制
版本控制是一种记录文件内容变化，以便将来查阅特定版本修订情况的系统。

版本控制其实最重要的是可以记录文件修改历史记录，从而让用户能够查看历史版本， 方便版本切换。

 ![image-20260711211543.png](../image/image-20260711211543.png)

## 1.2.为什么需要版本控制
从个人开发过渡到团队协作。

![image-20260711211618.png](../image/image-20260711211618.png)

## 1.3.版本控制工具
### 1）集中式版本控制工具
集中化的版本控制系统诸如 CVS、SVN、VSS 等，都有一个单一的集中管理的服务器，保存 所有文件的修订版本，而协同工作的人们都通过客户端连到这台服务器，取出最新的文件或 者提交更新。多年以来，这已成为版本控制系统的标准做法。  

这种做法带来了许多好处，每个人都可以在一定程度上看到项目中的其他人正在做些什么。而管理员也可以轻松掌控每个开发者的权限，并且管理一个集中化的版本控制系统，要 远比在各个客户端上维护本地数据库来得轻松容易。  

事分两面，有好有坏。这么做显而易见的缺点是中央服务器的单点故障。如果服务器宕机一小时，那么在这一小时内，谁都无法提交更新，也就无法协同工作。

![image-20260711211806.png](../image/image-20260711211806.png)

### 2）分布式版本控制工具
像Git、Mercurial、Bazaar、Darcs等分布式版本控制工具，客户端提取的不是最新版本的文件快照，而是把代码 仓库完整地镜像下来（本地库）。

这样任何一处协同工作用的文件发生故障，事后都可以用 其他客户端的本地仓库进行恢复。因为每个客户端的每一次文件提取操作，实际上都是一次 对整个文件仓库的完整备份。  

分布式的版本控制系统出现之后,解决了集中式版本控制系统的缺陷: 

1. 服务器断网的情况下也可以进行开发（因为版本控制是在本地进行的）  
2. 每个客户端保存的也都是整个完整的项目（包含历史记录，更加安全）

 ![image-20260711211857.png](../image/image-20260711211857.png)

## 1.4.Git简史
![image-20260711211936.png](../image/image-20260711211936.png)

## 1.5.Git工作机制
![image-20260711212008.png](../image/image-20260711212008.png)

## 1.6.Git和代码托管中心
代码托管中心是基于网络服务器的远程代码仓库，一般我们简单称为远程库。 

+ **局域网** 
    - GitLab
+ **互联网** 
    - GitHub（外网） 
    - Gitee 码云（国内网站）

# 2.Git安装
+ 官网地址： [https://git-scm.com/](https://git-scm.com/)

查看 GNU 协议，可以直接点击下一步

![image-20260711212121.png](../image/image-20260711212121.png)

选择 Git 安装位置，要求是非中文并且没有空格的目录，然后下一步 

![image-20260711212151.png](../image/image-20260711212151.png)

Git 选项配置，推荐默认设置，然后下一步

![image-20260711212228.png](../image/image-20260711212228.png)

Git 安装目录名，不用修改，直接点击下一步

![image-20260711212255.png](../image/image-20260711212255.png)

Git 的默认编辑器，建议使用默认的 Vim 编辑器，然后点击下一步

![image-20260711212347.png](../image/image-20260711212347.png)

默认分支名设置，选择让 Git 决定，分支名默认为 master，下一步

![image-20260711212416.png](../image/image-20260711212416.png)

修改 Git 的环境变量，选第一个，不修改环境变量，只在 Git Bash 里使用 Git

![image-20260711212437.png](../image/image-20260711212437.png)

选择后台客户端连接协议，选默认值 OpenSSL，然后下一步

![image-20260711212520.png](../image/image-20260711212520.png)

配置 Git 文件的行末换行符，Windows 使用 CRLF，Linux 使用 LF，选择第一个自动 转换，然后继续下一步

![image-20260711212545.png](../image/image-20260711212545.png)

选择 Git 终端类型，选择默认的 Git Bash 终端，然后继续下一步

![image-20260711212705.png](../image/image-20260711212705.png)

选择 Git pull 合并的模式，选择默认，然后下一步

![image-20260711212853.png](../image/image-20260711212853.png)

选择 Git 的凭据管理器，选择默认的跨平台的凭据管理器，然后下一步

![image-20260711212927.png](../image/image-20260711212927.png)

其他配置，选择默认设置，然后下一步

![image-20260711212948.png](../image/image-20260711212948.png)

实验室功能，技术还不成熟，有已知的 bug，不要勾选，然后点击右下角的 Install 按钮，开始安装 Git

![image-20260711213004.png](../image/image-20260711213004.png)

点击 Finsh 按钮，Git 安装成功

![image-20260711213042.png](../image/image-20260711213042.png)

右键任意位置，在右键菜单里选择 Git Bash Here 即可打开 Git Bash 命令行终端

![image-20260711213116.png](../image/image-20260711213116.png)

在 Git Bash 终端里输入 `git --version` 查看 git 版本，如图所示，说明 Git 安装成功

![image-20260711213136.png](../image/image-20260711213136.png)

# 3.Git常用命令
| 命令名称 | 作用 |
| --- | --- |
| `git config --global user.name 用户名 ` | 设置用户签名 |
| `git config --global user.email 邮箱 ` | 设置用户签名 |
| `git init ` | 初始化本地库 |
| `git status ` | 查看本地库状态 |
| `git add 文件名 ` | 添加到暂存区 |
| `git commit -m "日志信息" 文件名 ` | 提交到本地库 |
| `git reflog ` | 查看历史记录 |
| `git reset --hard ` | 版本号 版本穿梭 |


## 3.1.设置用户签名
**基本语法**

```shell
git config --global user.name 用户名 
git config --global user.email 邮箱 
```

**案例实操**

![image-20260711213212.png](../image/image-20260711213212.png)

查看`C:\Users\asus的.gitconfig`文件

![image-20260711213227.png](../image/image-20260711213227.png)

说明：  签名的作用是区分不同操作者身份。用户的签名信息在每一个版本的提交信息中能够看 到，以此确认本次提交是谁做的。Git 首次安装必须设置一下用户签名，否则无法提交代码。  

注意：这里设置用户签名和将来登录 GitHub（或其他代码托管中心）的账号没有任 何关系。

## 3.2.初始化本地库
**基本语法**

```shell
git init 
```

**案例实操**

![image-20260711213305.png](../image/image-20260711213305.png)

**结果查看**

![image-20260711213331.png](../image/image-20260711213331.png)

## 3.3.查看本地库状态
**基本语法** 

```shell
git status
```

**案例实操**

首次查看（工作区没有任何文件）

![image-20260711213410.png](../image/image-20260711213410.png)

新增文件（hello.txt）

![image-20260711213437.png](../image/image-20260711213437.png)

![image-20260711213509.png](../image/image-20260711213509.png)

再次查看（检测到未追踪的文件）

![image-20260711213531.png](../image/image-20260711213531.png)

## 3.4.添加暂存区
**基本语法**

```shell
git add 文件名 
```

**案例实操**

<img src="../image/1728010360156-4926f063-a7dd-4ef2-8201-d62707687ff5.png" width="1457" title="" crop="0,0,1,1" id="u0b8c5a3c" class="ne-image">

查看状态

<img src="../image/1728010423012-c7c9cc48-d276-4b34-ad26-89d383390d35.png" width="1454" title="" crop="0,0,1,1" id="u6bf1593c" class="ne-image">

删除暂存区的文件

<img src="../image/1728010444890-cc18722d-14fc-4b6a-8d7a-70d877cb8e4e.png" width="1444" title="" crop="0,0,1,1" id="u97ccdb06" class="ne-image">

再次查看状态

<img src="../image/1728010467810-f95199b2-8dee-436d-953f-c299b63049ac.png" width="1452" title="" crop="0,0,1,1" id="u85682348" class="ne-image">

查看工作区文件

<img src="../image/1728010487734-4602b85b-e65d-4109-9c68-ff29dd2c8fc8.png" width="1454" title="" crop="0,0,1,1" id="uc82313da" class="ne-image">

## 3.5.提交本地库
**基本语法**

```shell
git commit -m "日志信息" 文件名 
```

**案例实操**

<img src="../image/1728010603246-4780060d-46d8-4e23-a0c2-e2e9b0116e64.png" width="1447" title="" crop="0,0,1,1" id="uc483f479" class="ne-image">

查看状态

<img src="../image/1728010624933-e702ac1c-72b2-41da-973c-6d9ae12164d4.png" width="1441" title="" crop="0,0,1,1" id="u1b4d8144" class="ne-image">

查看日志

<img src="../image/1728010716604-1d642e41-a13b-40a8-8c17-27fa10cf6ef8.png" width="1453" title="" crop="0,0,1,1" id="ubb2a8b03" class="ne-image">

查看详细日志

<img src="../image/1728010730411-d309cd6e-d302-4343-b856-05b21ed0b196.png" width="1449" title="" crop="0,0,1,1" id="u41f356aa" class="ne-image">

## 3.6.修改文件
**基本语法**

```shell
vim 文件名
```

**案例实操**

查看文件内容

<img src="../image/1728010766883-ce3b0f50-4a0a-4949-9f94-2d2140467a0d.png" width="1594" title="" crop="0,0,1,1" id="uba515674" class="ne-image">

修改文件

<img src="../image/1728010791050-0c05bb3b-3256-402e-b519-fe808016650d.png" width="1588" title="" crop="0,0,1,1" id="u19567a20" class="ne-image">

<img src="../image/1728010806278-550187d9-2bd5-4c59-bfea-fca046e9d788.png" width="1587" title="" crop="0,0,1,1" id="u543b41e0" class="ne-image">

查看状态

<img src="../image/1728010832598-858468ff-7d3d-4845-acea-ca8e99a76904.png" width="1588" title="" crop="0,0,1,1" id="u165e3bb8" class="ne-image">

添加到暂存区

<img src="../image/1728010849871-69f47661-a582-41db-b37b-f7b97a53959a.png" width="1588" title="" crop="0,0,1,1" id="uee3bd7b1" class="ne-image">

再次查看状态

<img src="../image/1728010867076-e5901631-224a-4490-acf0-f0ab5b5e0c7f.png" width="1594" title="" crop="0,0,1,1" id="uc46238b6" class="ne-image">

提交到本地库

<img src="../image/1728010886942-c4f935cb-b7a1-4426-a25c-8076aeca2968.png" width="1588" title="" crop="0,0,1,1" id="ua48cc448" class="ne-image">

再次查看状态

<img src="../image/1728010908535-158cf6c2-995c-448e-b7af-c463731768af.png" width="1581" title="" crop="0,0,1,1" id="u2f1b1a83" class="ne-image">

查看日志

<img src="../image/1728010927266-50ab1512-3a69-4714-bb72-d8fdce003da0.png" width="1586" title="" crop="0,0,1,1" id="u5efa963c" class="ne-image">

再次查看文件内容

<img src="../image/1728010948781-c3379130-590e-40df-932f-87f797f9292c.png" width="1589" title="" crop="0,0,1,1" id="u9067e972" class="ne-image">

## 3.7.历史版本
### 1）查看历史版本
**基本语法**

```shell
git reflog  #查看版本信息 
git log  #查看版本详细信息
```

**案例实操**

<img src="../image/1728010989344-886841df-5305-4462-aa91-027419316dd6.png" width="1270" title="" crop="0,0,1,1" id="uc4e6988c" class="ne-image">

<img src="../image/1728011003194-6749922a-a82f-4afe-928a-afaa8f2c1fe3.png" width="1589" title="" crop="0,0,1,1" id="ubbfd446c" class="ne-image">

### 2）版本穿梭
Git 切换版本，底层其实是移动的 HEAD 指针，具体原理如下图所示

<img src="../image/1728011020492-b1c9a136-d1db-4513-aa31-236cbd43dffe.png" width="1183" title="" crop="0,0,1,1" id="u09f57ba2" class="ne-image">

**基本语法**

```shell
git reset --hard 版本号
```

**案例实操**

查看历史版本信息

<img src="../image/1728011052427-24164f8e-406f-472c-91ab-a27eeb0926fd.png" width="1216" title="" crop="0,0,1,1" id="uc85472c3" class="ne-image">

穿梭版本

<img src="../image/1728011066244-0e06341f-702e-41c4-82a4-a75ed878c24f.png" width="1230" title="" crop="0,0,1,1" id="uad354649" class="ne-image">

再次查看历史版本信息

<img src="../image/1728011080446-a83404c9-7df3-4e97-b1de-240a03b0a085.png" width="1272" title="" crop="0,0,1,1" id="u7e77de6d" class="ne-image">

查看文件内容

<img src="../image/1728011094574-246ff311-2ec8-4225-9f54-caa27fb62b71.png" width="1331" title="" crop="0,0,1,1" id="u4285fa81" class="ne-image">

# 4.Git分支操作
<img src="../image/1728011111588-111639f7-d2dc-466e-9576-712811803e8b.png" width="1266" title="" crop="0,0,1,1" id="ue2d023e5" class="ne-image">

## 4.1.什么是分支
在版本控制过程中，同时推进多个任务，为每个任务，我们就可以创建每个任务的单独分支。

使用分支意味着程序员可以把自己的工作从开发主线上分离开来，开发自己分支的时候，不会影响主线分支的运行。

对于初学者而言，分支可以简单理解为副本，一个分支就是一个单独的副本（分支底层其实也是指针的引用） 。

<img src="../image/1728011132331-15f5596c-2d7e-4eca-b2b4-bb7e17d8465f.png" width="1232" title="" crop="0,0,1,1" id="u4bc2f201" class="ne-image">

## 4.2.分支的好处
同时并行推进多个功能开发，提高开发效率。  

各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任何影响。失败的分支删除重新开始即可。

## 4.3.分支的操作
| 命令名称 | 作用 |
| --- | --- |
| `git branch 分支名  ` | 创建分支 |
| `git branch -v ` | 查看分支 |
| `git checkout 分支名 ` | 切换分支 |
| `git merge 分支名  ` | 把指定的分支合并到当前分支上 |


### 1）查看分支
**基本语法**

```shell
git branch -v 
```

**案例实操**

<img src="../image/1728011165606-a5e07fc8-2303-47aa-b589-277c5e4766b1.png" width="1258" title="" crop="0,0,1,1" id="ud03d9f68" class="ne-image">

### 2）创建分支
**基本语法**

```shell
git branch 分支名
```

**案例实操**

<img src="../image/1728011206545-55442fb2-4a2e-4640-acee-04b880cd460e.png" width="1229" title="" crop="0,0,1,1" id="u89dad3a6" class="ne-image">

查看分支

<img src="../image/1728011221333-f9be425d-af85-4112-89e9-4e02498fd3ab.png" width="1208" title="" crop="0,0,1,1" id="ub8b669f1" class="ne-image">

### 3）切换分支
**基本语法**

```shell
git checkout 分支名 
```

**案例实操**

<img src="../image/1728011246603-7500eaf8-d382-4b81-a025-638c59964159.png" width="1274" title="" crop="0,0,1,1" id="u7dbab4ca" class="ne-image">

查看分支

<img src="../image/1728011261762-7b74c61f-5435-4109-a9ea-1768d23d75e2.png" width="1230" title="" crop="0,0,1,1" id="u6ea5d957" class="ne-image">

### 4）修改分支
**案例实操**

修改hello.txt的内容

<img src="../image/1728011283138-50d9aa62-c9f5-4648-9a87-6a936ffbc17c.png" width="1244" title="" crop="0,0,1,1" id="u0c42133c" class="ne-image">

<img src="../image/1728011298214-18f28680-ba57-4a38-912f-c7da5d37ff7e.png" width="1023" title="" crop="0,0,1,1" id="u69b86044" class="ne-image">

查看状态

<img src="../image/1728011313735-ea64ebe0-354b-478d-9490-830b1de1aaec.png" width="1464" title="" crop="0,0,1,1" id="u37d6893e" class="ne-image">

添加到暂存区

<img src="../image/1728011330368-2d26f24b-c62a-4d47-b5ba-82374c06fe50.png" width="1228" title="" crop="0,0,1,1" id="ub727b0fe" class="ne-image">

提交到本地库

<img src="../image/1728011344309-5b2e2340-6e16-41d0-ae6d-67e99d7aeb13.png" width="1214" title="" crop="0,0,1,1" id="u1f0e63d6" class="ne-image">

查看文件内容

<img src="../image/1728011362335-16ffa18a-ba68-4ac5-9e00-ca2cffdd76a2.png" width="1463" title="" crop="0,0,1,1" id="u981d30d5" class="ne-image">

查看版本信息

<img src="../image/1728011377338-67f77483-7ae7-4e8f-a05a-1590f9bad02f.png" width="1415" title="" crop="0,0,1,1" id="u00e94a32" class="ne-image">

### 5）合并分支（正常）
**基本语法**

```shell
git merge 分支名 
```

**案例实操**

切换到master分支

<img src="../image/1728011401620-7afe7c29-abce-4e9a-960f-be458d39b224.png" width="1231" title="" crop="0,0,1,1" id="ucfc08f1e" class="ne-image">

查看hello.txt的内容

<img src="../image/1728011420779-8f970bb3-3283-454a-a8d2-7e4663f62b60.png" width="1458" title="" crop="0,0,1,1" id="u3e93e4fb" class="ne-image">

合并分支

<img src="../image/1728011435022-db58ff83-570b-4d61-82ac-72383b3f9ca1.png" width="1309" title="" crop="0,0,1,1" id="u84fff9bb" class="ne-image">

再次查看文件内容

<img src="../image/1728011448025-8fde95f4-b030-40d3-a9f1-c3bcd02810a2.png" width="1321" title="" crop="0,0,1,1" id="ud3ac9036" class="ne-image">

### 6）合并分支（冲突）
+ 冲突产生的表现：后面状态为 `MERGING` 。
+ 冲突产生的原因：  合并分支时，两个分支在同一个文件的同一个位置有两套完全不同的修改，Git 无法替 我们决定使用哪一个，必须人为决定新代码内容。
+ 解决冲突的步骤：
    1. 编辑有冲突的文件，删除特殊符号，决定要使用的内容
    2. 添加到暂存区
    3. 提交到本地库（注意：此时使用 `git commit` 命令时不能带文件名）

**案例实操**

master修改hello.txt的内容

<img src="../image/1728011477409-ef4d745c-fdc5-4b81-91a0-85c946cb1088.png" width="1266" title="" crop="0,0,1,1" id="ub6d5fd5e" class="ne-image">

<img src="../image/1728011491555-1470ed3f-b8dc-42a1-acd0-7b1fa63fb38d.png" width="1565" title="" crop="0,0,1,1" id="u3a8b084c" class="ne-image">

master添加到暂存区并提交到版本库

<img src="../image/1728011507564-2d3f347a-360e-432f-977f-6c0b01f1f19d.png" width="1333" title="" crop="0,0,1,1" id="uf6217159" class="ne-image">

master 查看hello.text文件的内容

<img src="../image/1728011525591-1afc5a53-d62f-4faf-a594-4f866d5d0c73.png" width="1402" title="" crop="0,0,1,1" id="u86818166" class="ne-image">

切换到 hot-fix 分支

<img src="../image/1728011543367-2adbaef0-2fb6-44a4-8426-47dd632cbd63.png" width="1294" title="" crop="0,0,1,1" id="ue2401972" class="ne-image">

hot-fix 分支修改hello.txt文件的内容

<img src="../image/1728011557597-911ada84-47c2-4e13-98d2-c26b59903400.png" width="1275" title="" crop="0,0,1,1" id="u3a5b2795" class="ne-image">

<img src="../image/1728011573484-87f24cdb-43cc-43fe-8135-a9175d55ba8b.png" width="1380" title="" crop="0,0,1,1" id="u70623478" class="ne-image">

hot-fix 分支添加到暂存区并提交到版本库

<img src="../image/1728011595886-0895134b-950c-41d9-8363-0fb7461fde6c.png" width="1343" title="" crop="0,0,1,1" id="ufe66f6e7" class="ne-image">

切换到master分支

<img src="../image/1728011609833-cf5c8ae1-9847-4dfd-b7c2-99c1ddf6233f.png" width="1301" title="" crop="0,0,1,1" id="u65143d2a" class="ne-image">

master 合并分支，发现产生冲突

<img src="../image/1728011624226-15bf32bc-0ebe-4fa1-b9e2-89e82d6437a4.png" width="1478" title="" crop="0,0,1,1" id="u7a5d2132" class="ne-image">

master 查看状态

<img src="../image/1728011637657-cf02b733-ae37-4dfa-b6ae-7a5450212fb0.png" width="1493" title="" crop="0,0,1,1" id="u12babf81" class="ne-image">

master 手动合并 ==> 编辑有冲突的文件

<img src="../image/1728011651792-56714577-f465-4455-bc54-1a0c9d451097.png" width="1291" title="" crop="0,0,1,1" id="uabcdd233" class="ne-image">

<img src="../image/1728011665396-892f7df6-da77-4338-8408-fcf7b0aae096.png" width="1493" title="" crop="0,0,1,1" id="ue529c406" class="ne-image">

master 手动合并 ==> 添加到暂存区

<img src="../image/1728011679352-8d617fe9-5f2f-434d-bd73-f2501bacc347.png" width="1407" title="" crop="0,0,1,1" id="u932fe3e4" class="ne-image">

master 手动合并 ==> 提交到本地库

<img src="../image/1728011691678-52827776-2b47-4ab8-ba9e-0d8a30d69510.png" width="1486" title="" crop="0,0,1,1" id="ue6cf04d7" class="ne-image">

master 查看hello.txt内容

<img src="../image/1728011705368-5db5e05d-5770-440d-8390-7dd55b3dddbb.png" width="1296" title="" crop="0,0,1,1" id="u8b9f602f" class="ne-image">

## 4.4.创建、切换分支图解

<img src="../image/1728011719707-659350f6-73a0-4734-bf7f-863aa5924f07.png" width="1531" title="" crop="0,0,1,1" id="u56972639" class="ne-image">

master、hot-fix 其实都是指向具体版本记录的指针。

当前所在的分支，其实是由 HEAD 决定的，所以创建分支的本质就是多创建一个指针。  

HEAD 如果指向 master，那么我们现在就在 master 分支上。  HEAD 如果执行 hotfix，那么我们现在就在 hotfix 分支上。

# 5.Git团队协作机制
## 5.1.团队内协作
<img src="../image/1728011738900-73c6c5fe-1f41-4fa4-ba59-5ba4e2fec914.png" width="1417" title="" crop="0,0,1,1" id="ud308c12d" class="ne-image">

## 5.2.跨团队协作
<img src="../image/1728011753265-af5750a8-25e6-4399-9f5b-25e714013650.png" width="1435" title="" crop="0,0,1,1" id="u0a187553" class="ne-image">

# 6.GitHub操作
+ GitHub 网址：[https://github.com/](https://github.com/)

Ps:全球最大同性交友网站，技术宅男的天堂，新世界的大门，你还在等什么? 

| 账号 | 姓名 | 验证邮箱 |
| --- | --- | --- |
| atguiguyueyue | 岳不群 | atguiguyueyue@aliyun.com |
| atguigulinghuchong | 令狐冲 | atguigulinghuchong@163.com |
| atguigudongfang1 | 东方不败 | atguigudongfang@163.com |


注：此三个账号为讲师使用账号，同学请自行注册，然后三个同学为一组进行团队协作！

## 6.1.创建远程仓库
<img src="../image/1728011789624-72f06e0d-373d-47a4-a4d7-dda2a34df6de.png" width="1718" title="" crop="0,0,1,1" id="ue50452c9" class="ne-image">

<img src="../image/1728011812116-b7d13c3e-db5e-4482-a3ca-adb01c99c2a8.png" width="1195" title="" crop="0,0,1,1" id="uaa0f54d5" class="ne-image"><img src="../image/1728011853631-2ed55cbf-6691-40b1-a984-2e9950eb4b52.png" width="2254" title="" crop="0,0,1,1" id="ua5850628" class="ne-image">

## 6.2.远程仓库操作
| 命令名称 | 作用 |
| --- | --- |
| `git remote -v ` | 查看当前所有远程地址别名 |
| `git remote add 别名 远程地址  ` | 起别名 |
| `git push 别名 分支 ` | 推送本地分支上的内容到远程仓库 |
| `git clone 远程地址 ` | 将远程仓库的内容克隆到本地 |
| `git pull 远程库地址别名 远程分支名` | 将远程仓库对于分支最新内容拉下来后与 当前本地分支直接合并 |


### 1）创建远程仓库别名
**基本语法**

```shell
git remote -v  #查看当前所有远程地址别名 
git remote add 别名 远程地址  #取别名
```

**案例实操**

<img src="../image/1728011905097-d4cc0580-9e74-48c4-bfd9-82420cf99d14.png" width="1506" title="" crop="0,0,1,1" id="u5ae52d8b" class="ne-image">

<img src="../image/1728011922570-5002472b-5d38-46c7-8569-d7989494e3bc.png" width="1433" title="" crop="0,0,1,1" id="uf0f8438a" class="ne-image">

### 2）推送本地库到远程库
**基本语法**

```shell
git push 别名 分支 
```

**案例实操**

<img src="../image/1728011948234-7b86a3cf-dedc-4633-8fb3-8801d6bf29b6.png" width="1507" title="" crop="0,0,1,1" id="u77017af4" class="ne-image">

此时发现已将我们 master 分支上的内容推送到 GitHub 创建的远程仓库

<img src="../image/1728011963538-f1e8fed2-39d0-4071-83bf-d22c0e07abfb.png" width="1338" title="" crop="0,0,1,1" id="u3f0b7c16" class="ne-image">

### 3）拉取远程库到本地库
**基本语法**

```shell
git pull 别名 分支 
```

**案例实操**

在 GitHub 的 git-demo 库修改 hello.txt

<img src="../image/1728012091226-a0202770-e04d-4e3f-8a32-0ba2797eef9b.png" width="1409" title="" crop="0,0,1,1" id="u8e61e90c" class="ne-image">

拉取远程库到本地库

<img src="../image/1728012127321-077e156b-faf9-48e5-9195-b0be4b3184a2.png" width="1375" title="" crop="0,0,1,1" id="u1c253e22" class="ne-image">

查看状态

<img src="../image/1728012202637-1f24d806-0403-4d6d-972a-4a4eb05977b7.png" width="1387" title="" crop="0,0,1,1" id="uf817436b" class="ne-image">

查看hello.txt的内容

<img src="../image/1728012217286-c68ed57e-3855-4423-acb1-c9f039d2529e.png" width="1430" title="" crop="0,0,1,1" id="u6b97fb48" class="ne-image">

### 4）克隆远程库到本地
**基本语法**

```shell
git clone 远程地址
```

**案例实操**

在 GitHub 上获取远程库链接

<img src="../image/1728012248279-639bc12a-04b4-40e0-9a71-dad19678157f.png" width="1758" title="" crop="0,0,1,1" id="u9abbad27" class="ne-image">

克隆远程库到本地

<img src="../image/1728012275678-c94a06b5-64b4-477e-9beb-d3c99e0d0fa6.png" width="1423" title="" crop="0,0,1,1" id="u3839c519" class="ne-image">

查看当前所有远程地址别名

<img src="../image/1728012295314-c18b83e8-9053-4b56-bf7d-bf26576ec2ff.png" width="1387" title="" crop="0,0,1,1" id="uaba4582a" class="ne-image">

+ 小结1：clone 会做如下操作：
    - 拉取代码
    - 初始化本地仓库
    - 创建别名
+ 小结2：克隆和拉取的区别：
    - 克隆：本地完全没有文件得到所有的文件  
    - 拉取：本地已经有文件了，需要更新最新的

## 6.3.邀请加入团队
用户atguigulinghuchong  修改hello.txt文件

<img src="../image/1728012319126-61a5dea7-b0a3-458a-8cbe-44b090dadd8b.png" width="1220" title="" crop="0,0,1,1" id="u57ba645b" class="ne-image">

<img src="../image/1728012333879-922c9a0e-caf7-4e69-bd97-98730085e29a.png" width="1405" title="" crop="0,0,1,1" id="u08186ac4" class="ne-image">

用户atguigulinghuchong  添加暂存区并提交到版本库

<img src="../image/1728012356881-1360ec12-ce83-46ed-a702-f8772456b7e3.png" width="1398" title="" crop="0,0,1,1" id="u52fc6fcc" class="ne-image">

用户atguigulinghuchong  推送本地仓库到远程仓库，推送失败，因为没有权限

<img src="../image/1728012374748-82cc86f8-7c8a-4f14-b05f-c9366f4a9f7c.png" width="1629" title="" crop="0,0,1,1" id="ua2998ddb" class="ne-image">

用户atguiguyueyue 需要在GitHub 将 lhc 加入团队才能让其拥有权限

<img src="../image/1728012390716-933adb6e-e943-4541-9c8f-2be0df517cef.png" width="1420" title="" crop="0,0,1,1" id="u4244b5bc" class="ne-image">

用户atguiguyueyue 填入想要合作的人

<img src="../image/1728012416599-af86ad85-2077-4702-bb77-68dbe04f5daf.png" width="560" title="" crop="0,0,1,1" id="ucef58716" class="ne-image">

用户atguiguyueyue 复制地址并通过微信钉钉等方式发送给用户atguigulinghuchong 

<img src="../image/1728012441387-c956e3fa-5df4-4405-9f40-7da613c56c7d.png" width="1137" title="" crop="0,0,1,1" id="u469d70a2" class="ne-image">

用户atguigulinghuchong  在 Github 的地址栏复制收到邀请的链接，点击接受邀请

<img src="../image/1728012464727-de3e61fb-d51b-41be-a6dd-cb4c6e6a0f5f.png" width="479" title="" crop="0,0,1,1" id="ufcf009b6" class="ne-image">

用户atguigulinghuchong  接受邀请之后可以在 Github账号上看到 git-Demo 的远程仓库

<img src="../image/1728012504839-58917017-31c7-4e11-af18-ce1c55f75aab.png" width="1764" title="" crop="0,0,1,1" id="u3751bd84" class="ne-image">

用户atguigulinghuchong  再次推送本地仓库到远程仓库

<img src="../image/1728012519432-39bce99e-ffe0-4253-a991-eac18ceb9bfe.png" width="1469" title="" crop="0,0,1,1" id="ue2895f6e" class="ne-image">

用户atguigulinghuchong  在Github上可以看到推送的信息

<img src="../image/1728012532073-4764b7c0-dc90-45c8-b337-b2eb36983831.png" width="1753" title="" crop="0,0,1,1" id="u43d0231e" class="ne-image">

用户atguiguyueyue 拉取远程库到本地库

<img src="../image/1728012554034-3f5ce25b-5d13-428f-a37f-68d98c57b289.png" width="1571" title="" crop="0,0,1,1" id="ud15015ac" class="ne-image">

此时用户atguiguyueyue 查看hello.txt文件

<img src="../image/1728012566945-7415fdaa-a014-492c-ae74-785d4678ca73.png" width="1603" title="" crop="0,0,1,1" id="u6dfff91e" class="ne-image">

## 6.4.跨团队协作
用户atguiguyueyue 将远程仓库的地址复制发给邀请跨团队协作的 用户atguigudongfang1

<img src="../image/1728012584462-21f7f597-ccbc-4037-afb6-40e36f2f0344.png" width="1187" title="" crop="0,0,1,1" id="ufac7fd1e" class="ne-image">

用户atguigudongfang1在 GitHub 账号里的地址栏黏贴收到的链接，然后点击 Fork 将项目叉到自己的本地仓库

<img src="../image/1728012604990-4f94e4f8-37c6-47f0-9247-e9e644139c88.png" width="1386" title="" crop="0,0,1,1" id="u4eb2e9a2" class="ne-image">

用户atguigudongfang1 叉成功后可以看到当前仓库信息

<img src="../image/1728012631488-77024563-d8ef-4646-8d5a-47e09d487589.png" width="1566" title="" crop="0,0,1,1" id="ud08e3d5d" class="ne-image">

用户atguigudongfang1 就可以在线编辑叉取过来的文件

<img src="../image/1728012653296-15533c11-7d82-49c2-8fbf-9722f6d332de.png" width="1184" title="" crop="0,0,1,1" id="u5bb7cf5e" class="ne-image">

<img src="../image/1728012672423-39551f8b-1600-4558-9f15-ba70849c091a.png" width="2020" title="" crop="0,0,1,1" id="ufce272b2" class="ne-image">

用户atguigudongfang1 编辑完毕后，填写描述信息并点击左下角绿色按钮提交

<img src="../image/1728012695945-18088694-f3f9-487a-9738-75f4ba773d6f.png" width="2050" title="" crop="0,0,1,1" id="ua4246fa4" class="ne-image">

用户atguigudongfang1 接下来点击上方的 Pull 请求，并创建一个新的请求

<img src="../image/1728012760748-335a49a3-3a39-4e15-a7fe-9a705f7cb6bf.png" width="1153" title="" crop="0,0,1,1" id="ua4c34d21" class="ne-image"><img src="../image/1728012737535-cf586acb-1b04-4c44-89ba-3c2679d320b2.png" width="2021" title="" crop="0,0,1,1" id="u6c2a64c2" class="ne-image">

<img src="../image/1728012790096-c83ca352-6890-4bdd-b28b-6ee40bdbaf25.png" width="1612" title="" crop="0,0,1,1" id="u141b6e64" class="ne-image">

用户atguiguyueyue 在GitHub 账号可以看到有一个 Pull request 请求

<img src="../image/1728012892138-e4f7b2bc-6908-493b-a053-a639df11572e.png" width="1573" title="" crop="0,0,1,1" id="u534a1a46" class="ne-image">

<img src="../image/1728012911514-0cc126c6-a122-48ff-88db-f5b635c3bff3.png" width="2039" title="" crop="0,0,1,1" id="ufdc4df6e" class="ne-image">

用户atguiguyueyue 进入到聊天室，可以讨论代码相关内容

<img src="../image/1728012936053-5ee95562-ff98-48f7-b38a-cb72dbbbf612.png" width="1211" title="" crop="0,0,1,1" id="u6a46d68d" class="ne-image">

用户atguiguyueyue 如果代码没有问题，可以点击 Merge pull reque 合并代码

<img src="../image/1728012968120-3421233a-924b-4645-bf92-46e6cf1efa3a.png" width="1041" title="" crop="0,0,1,1" id="ubd421416" class="ne-image">

<img src="../image/1728012987033-2c6d8dba-1fe9-4976-ad46-4dac6c3f60e9.png" width="945" title="" crop="0,0,1,1" id="u46c6e18e" class="ne-image">

## 6.5.SSH免密登录
我们可以看到远程仓库中还有一个 SSH 的地址，因此我们也可以使用 SSH 进行访问

<img src="../image/1728013013151-c3597ab1-60fc-4013-8b2d-44418992fd56.png" width="319" title="" crop="0,0,1,1" id="u2390816c" class="ne-image">

首先进入`C:\用户\asus\.ssh`，将以前生成的公钥和私钥删除

<img src="../image/1728013048418-a71c574e-f330-40b4-9053-64331423ace2.png" width="1286" title="" crop="0,0,1,1" id="ub6d55dba" class="ne-image">

生成新的公钥和私钥

<img src="../image/1728013066170-81887b64-22e3-450d-af86-f1e11d4390ea.png" width="1240" title="" crop="0,0,1,1" id="ua98915c4" class="ne-image">

获取公钥

<img src="../image/1728013079825-5ce21ec7-65ab-4c18-8bb0-10834b55b70b.png" width="1214" title="" crop="0,0,1,1" id="ub86f644f" class="ne-image">

复制 id_rsa.pub 文件内容，登录 GitHub，点击用户头像→Settings→SSH and GPG keys 

<img src="../image/1728013096755-e29df4b5-24a8-4e4f-a868-ca604253fe8f.png" width="248" title="" crop="0,0,1,1" id="u97dac16e" class="ne-image">

<img src="../image/1728013125915-9a1346a6-4c2e-4b56-a17a-c9927c514e7c.png" width="1017" title="" crop="0,0,1,1" id="u932f43b8" class="ne-image">

<img src="../image/1728013146136-7a34b955-6dea-4d91-93b6-71a5dfa836b6.png" width="744" title="" crop="0,0,1,1" id="u42b0810d" class="ne-image">

接下来再往远程仓库 push 东西的时候使用 SSH 连接就不需要登录了

<img src="../image/1728013168631-c8186f22-cf22-4c65-9497-d9c9200b6c09.png" width="1536" title="" crop="0,0,1,1" id="uf2912033" class="ne-image">

# 7.PyCharm集成Git（本地库）

说明：前面命令行的方式，需要了解。真正开发的时候，都是在IDE中操作。

前提：创建PyCharm中的一个Python Project：

<img src="../image/Snipaste_2026-07-07_20-40-16.jpg" alt="image-20250725000617021" style="zoom: 150%;" />

## 7.1.定位Git程序

<img src="../image/Snipaste_2026-07-07_20-42-45.jpg" alt="image-20250725000431419" style="zoom:150%;" />



## 7.2.初始化本地库

<img src="../image/Snipaste_2026-07-07_20-43-39.jpg" alt="image-20250725000706802" style="zoom:150%;" />

选择要创建Git本地仓库的工程（选中项目的根目录）

![image-20250725000754783](../image/Snipaste_2026-07-07_20-45-22.jpg)

此时的项目就被初始化了。在物理磁盘当前项目的目录下，会生成.git的文件目录。

![Snipaste_2026-07-07_20-46-38.jpg](../image/Snipaste_2026-07-07_20-46-38.jpg)

## 7.3. 配置Git忽略文件

**什么是忽略文件？**与项目的实际功能无关，不参与服务器上部署运行的文件。避免管理不必要的文件。

忽略配置文件名称为：**.gitignore**

PyCharm创建的项目中，.idea和.venv目录下就已经定义好了忽略配置文件

<img src="../image/Snipaste_2026-07-07_20-49-19.jpg" alt="img" style="zoom:150%;" />

注意：

我们需要在工作区根目录下创建.gitignore，并配置项目中需要忽略的其文件或目录，

比如：/.env来忽略项目中的环境配置文件

 

## 7.4.添加到暂存区

新建文件

![Snipaste_2026-07-07_20-52-08.jpg](../image/Snipaste_2026-07-07_20-52-08.jpg)

右键点击项目选择Git -> Add将项目添加到暂存区。

<img src="../image/Snipaste_2026-07-07_20-55-13.jpg" alt="image-20250725001050981" style="zoom:150%;" />

此前红色的代码，此时就变成了绿色。

![](../image/Snipaste_2026-07-07_20-56-15.jpg)

## 7.5.提交到本地库

![image-20250725001525058](../image/Snipaste_2026-07-07_20-57-11.jpg)

此时，勾选的即为要提交的代码。

我们可以选择commit的粒度，可以是整个项目、一个module或者一个文件，都可以。

此外，在PyCharm中不需要每次commit之前进行add操作，因为PyCharm会在commit之前自动给我们add。

![](../image/Snipaste_2026-07-07_20-59-22.jpg)

可以多修改几次文件，多提交几个版本，接下来练习版本穿梭。

## 7.6.切换版本（版本穿梭）

1）查看历史版本

<img src="../image/Snipaste_2026-07-07_21-03-24.jpg" alt="image-20250725001829872" style="zoom:150%;" />

![img](../image/Snipaste_2026-07-07_21-05-00.jpg)

2）右键选择要切换的版本，然后在菜单里点击Checkout Revision。

<img src="../image/Snipaste_2026-07-07_21-08-15.jpg" alt="image-20250725001928798" style="zoom:150%;" />



## 7.7.创建分支

1）选择Git，在Repository里面，点击Branches按钮。

<img src="../image/Snipaste_2026-07-07_21-09-50.jpg" alt="image-20250725002044189" style="zoom:150%;" />

2）在弹出的Git Branches框里，点击New Branch按钮。

<img src="../image/image258.gif" alt="image-20250725002119008"  />

3）填写分支名称，创建dev01分支。

<img src="../image/Snipaste_2026-07-07_21-10-27.jpg" alt="image-20250725002146774" style="zoom:87%;" />

说明：如果创建完，就立即切换到分支上去，那就勾选。

![](../image/Snipaste_2026-07-07_21-11-34.jpg)

4）然后看到dev01，说明分支创建成功，并且当前已经切换成dev01分支

<img src="../image/Snipaste_2026-07-07_21-12-35.jpg" alt="image-20250725002316306"  />

此时dev01分支和master分支上的代码都是相同的。

修改dev01分支代码并提交。

## 7.8.切换分支

1）切换到master分支

<img src="../image/Snipaste_2026-07-07_21-14-43.jpg" alt="image-20250725002557875" style="zoom:150%;" />



## 7.9.合并分支

1）使用dev01分支，修改或添加文件，然后commit。（操作略）

2）接着切换到master分支，将dev01分支合并到当前master分支。

<img src="../image/image266.gif" alt="image-20250725002943734" style="zoom:150%;" />

如果代码没有冲突，分支直接合并成功，分支合并成功以后，代码自动提交，无需手动提交本地库。



## 7.10.解决冲突

如果master分支和dev01分支都修改了同一块代码，在合并分支的时候就会发生冲突。如图所示

1）master分支：

![image-20250725003924405](../image/Snipaste_2026-07-07_21-21-25.jpg)

2）dev01分支：

![image-20250725003833874](../image/Snipaste_2026-07-07_21-21-53.jpg)

3）我们现在站在master分支上合并dev01分支，就会发生代码冲突。解决方案：

Ø 方案1：Accept Yours

Ø 方案2：Accept Theirs

Ø 方案3：Merge （下图的选择）

<img src="../image/Snipaste_2026-07-07_21-24-50.jpg" alt="image-20250725003124726" style="zoom:150%;" />

4）点击Conflicts框里的Merge按钮，进行手动合并代码。

<img src="../image/Snipaste_2026-07-07_21-20-28.jpg" alt="image-20250725003432331" style="zoom:150%;" />

5）手动合并完代码以后，点击右下角的Apply按钮。

<img src="../image/Snipaste_2026-07-07_21-26-03.jpg" alt="image-20250725003522042" style="zoom:150%;" />

6）代码冲突解决，自动提交本地库，无须再次提交。

<img src="../image/Snipaste_2026-07-07_21-27-46.jpg" alt="image-20250725004027029" style="zoom:150%;" />



# 8.PyCharm集成Gitee（码云）

## 8.1.PyCharm安装码云插件并关联账号

### 8.1.1.在Pycharm中安装Gitee插件

PyCharm默认不带码云插件，我们需要手动安装Gitee插件

1）如图所示，在PyCharm插件商店搜索Gitee，然后点击右侧的Install按钮。

<img src="../image/Snipaste_2026-07-07_21-29-21.jpg" alt="image-20250725084509867" style="zoom:150%;" />

2）安装成功后，若有提示重启，则重启PyCharm

3）PyCharm重启以后在Version Control设置里面看到Gitee，说明码云插件安装成功

<img src="../image/Snipaste_2026-07-07_21-31-39.jpg" alt="image-20250725084648232" style="zoom:150%;" />

4）然后在码云插件里面添加码云帐号，我们就可以用PyCharm连接码云了。

5）多种设置方式：

<img src="../image/Snipaste_2026-07-07_21-32-47.jpg" alt="image-20250721232625063" style="zoom:150%;" />

### 8.1.2.关联账号

1）演示Log In with Tokens：使用Token，这里需要私人令牌

Ø 在gitee的设置中申请。

<img src="../image/Snipaste_2026-07-07_21-36-06.jpg" alt="image-20250725085008338" style="zoom: 87%;" />

 



Ø 生成新令牌

<img src="../image/image290.gif" alt="image-20250725085724436" style="zoom:150%;" />

Ø 这里还可以设置令牌的权限

<img src="../image/Snipaste_2026-07-07_21-35-26.jpg" alt="image-20250725085846311" style="zoom:150%;" />

Ø 提交后，需要填写账号密码，填上即可

<img src="../image/image294.gif" alt="image-20250725085932962" style="zoom:100%;" />

Ø 务必复制，并保存好令牌

<img src="../image/image296.gif" alt="image-20250725090040681" style="zoom:100%;" />

Ø 生成好的令牌在PyCharm中填写好即可

<img src="../image/Snipaste_2026-07-07_21-38-50.jpg" alt="img" style="zoom:150%;" />

这里的is private token可以不用勾选。

2）演示Log In with password：使用用户名和密码的方式。此时的login必须使用邮箱。

<img src="../image/Snipaste_2026-07-07_21-41-39.jpg" alt="image-20250725090430478" style="zoom:150%;" />

说明：这里推荐使用方式Tokens，避免将用户名和密码交由PyCharm保管。而且，远程推送也推荐使用令牌的方式。



## 8.2.push：推送本地库到远程库

在PyCharm里面创建一个工程，初始化git工程，然后将代码添加到暂存区，提交到本地库，这些步骤上面已经讲过，此处不再赘述。

1）第1次push，需要将当前项目“共享”给Gitee，如下操作：

<img src="../image/Snipaste_2026-07-07_21-43-58.jpg" alt="image-20250725102434307" style="zoom:150%;" />

注意：此时不需要提前在Gitee上创建好一个远程库来接收。

2）填写提交到Gitee上的仓库的名称，url别名，以及必要的说明

<img src="../image/Snipaste_2026-07-07_21-45-47.jpg" alt="image-20250725100906398" style="zoom:150%;" />

3）接着回到Gitee官网，即能看到push过来的项目

<img src="../image/Snipaste_2026-07-07_21-48-11.jpg" alt="image-20250725103046066" style="zoom:150%;" />

<img src="../image/Snipaste_2026-07-07_21-47-12.jpg" alt="image-20250725103103683" style="zoom:150%;" />

4）在当前仓库管理中，可以设置是否开源(默认是私有的)

<img src="../image/Snipaste_2026-07-07_21-49-07.jpg" alt="image-20250725103159990" style="zoom:150%;" />



5）后续在PyCharm中修改了代码，需要先commit提交

<img src="../image/Snipaste_2026-07-07_21-50-48.jpg" alt="image-20250725104032332" style="zoom:150%;" />

6）commit以后，还可以在如下的位置进行远程push

<img src="../image/Snipaste_2026-07-07_21-52-06.jpg" alt="image-20250725104120715" style="zoom:150%;" />

<img src="../image/Snipaste_2026-07-07_21-53-15.jpg" alt="image-20250725104306587" style="zoom:150%;" />

7）去码云远程库查看更新的代码

<img src="../image/Snipaste_2026-07-07_21-54-13.jpg" alt="image-20250725104351126" style="zoom:150%;" />



## 8.3.pull：拉取远程库到本地库

1）在码云上直接修改代码内容，之后提交，为了进行测试

<img src="../image/Snipaste_2026-07-07_21-56-05.jpg" alt="image-20250725104853352" style="zoom:150%;" />

<img src="../image/Snipaste_2026-07-07_21-57-32.jpg" alt="image-20250725104940836" style="zoom:150%;" />

编写完以后，进行提交即可。

2）回到PyCharm，右键点击项目，可以将远程仓库的内容pull到本地仓库。

<img src="../image/Snipaste_2026-07-07_21-58-33.jpg" alt="image-20250725105047768" style="zoom:150%;" />

3）选择远程库

![image-20250725105144078](../image/Snipaste_2026-07-07_21-59-06.jpg)

4）pull了远程库中最新内容

<img src="../image/Snipaste_2026-07-07_21-59-52.jpg" alt="image-20250725105215210" style="zoom:150%;" />

**注意：pull****是拉取远端仓库代码到本地，如果远程库代码和本地库代码不一致，会自动合并，如果自动合并失败，还会涉及到手动解决冲突的问题。**

![image-20250722144046454](../image/image334.gif)



## 8.4.clone：克隆远程库到本地

1）如果clone的是Gitee上其他人的开源项目，建议先fork。

<img src="../image/Snipaste_2026-07-07_22-08-20.jpg" alt="image-20250725105819573" style="zoom:150%;" />

这里我们演示下载自己的开源项目

2）选择Clone

<img src="../image/Snipaste_2026-07-07_22-09-26.jpg" alt="image-20250725105340722" style="zoom:150%;" />

3）输入远程码云仓库地址

<img src="../image/Snipaste_2026-07-07_22-13-45.jpg" alt="image-20250725105552023" style="zoom:150%;" />

上面的地址来自于：

<img src="../image/Snipaste_2026-07-07_22-10-35.jpg" alt="image-20250725105434757" style="zoom:150%;" />

<img src="../image/Snipaste_2026-07-07_22-11-31.jpg" alt="image-20250725105452821" style="zoom:150%;" />

4）完成clone操作

<img src="../image/Snipaste_2026-07-07_22-14-28.jpg" alt="image-20250725105656135" style="zoom:150%;" />

## 8.5.小结

### 8.5.1.小结1：关于冲突

1）总结：容易冲突的操作方式

- 多个人同时操作了同一个文件
- 一个人一直写不提交
- 修改之前不更新最新代码
- 擅自修改同事代码

2）减少冲突的操作方式

- 养成良好的操作习惯，先pull，再修改，修改完立即commit和push
- 一定要确保自己正在修改的文件是最新版本的
- 各自开发各自的模块
- 如果要修改公共文件，一定要先确认有没有人正在修改
- 下班前一定要提交代码，上班第一件事拉取最新代码
- 一定不要擅自修改同事的代码

### 8.5.2.小结2：Git提交流程

<img src="../image/image-20260623215336264.jpg" alt="image-20260623215336264" style="zoom:150%;" />
