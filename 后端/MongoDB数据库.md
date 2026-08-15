# MongoDB 入门实践

> 适用对象：有 Python 基础的开发者  
> 环境要求：Docker、Python 3.8+、MongoDB Compass

---

## 第一章 Docker 环境部署

### 1.1 为什么用 Docker？

手动安装 MongoDB 需要处理系统依赖、配置文件、服务注册等一系列步骤，而 Docker 只需一条命令就能启动一个隔离的 MongoDB 实例，用完即删，不污染宿主机环境。

### 1.2 拉取镜像

```bash
docker pull mongo:7.0
```

### 1.3 启动容器

```bash
docker run -d \
  --name my-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=123456 \
  -v mongo-data:/data/db \
  mongo:7.0
```

参数说明：

| 参数                            | 作用                             |
| ------------------------------- | -------------------------------- |
| `-d`                            | 后台运行                         |
| `--name my-mongo`               | 容器命名，方便后续操作           |
| `-p 27017:27017`                | 将容器的 27017 端口映射到宿主机  |
| `-e MONGO_INITDB_ROOT_USERNAME` | 设置 root 用户名                 |
| `-e MONGO_INITDB_ROOT_PASSWORD` | 设置 root 密码                   |
| `-v mongo-data:/data/db`        | 数据持久化，容器删除后数据不丢失 |

### 1.4 验证是否启动成功

```bash
# 查看容器状态
docker ps

# 进入容器内的 mongosh 交互终端
docker exec -it my-mongo mongosh -u admin -p 123456
```

看到 `test>` 提示符即表示连接成功，输入 `exit` 退出。

### 1.5 常用容器管理命令

```bash
docker stop my-mongo     # 停止
docker start my-mongo    # 启动
docker rm -f my-mongo    # 删除容器（数据卷目录仍保留）
docker volume rm mongo-data  # 删除数据卷（慎用）
```

---

## 第二章 MongoDB 基本概念

### 2.1 MongoDB 是什么？

MongoDB 是一个**文档型数据库**，数据以类似 JSON 的格式（BSON）存储，不需要预先定义表结构。

### 2.2 核心概念对照

| 关系型数据库（MySQL） | MongoDB            | 说明                       |
| --------------------- | ------------------ | -------------------------- |
| Database（数据库）    | Database           | 概念一致                   |
| Table（表）           | Collection（集合） | 存放同类文档的容器         |
| Row（行）             | Document（文档）   | 一条数据记录               |
| Column（列）          | Field（字段）      | 文档中的键值对             |
| Primary Key           | `_id`              | 每个文档自动生成的唯一标识 |

### 2.3 文档长什么样？

```json
{
  "_id": ObjectId("665a1f2b3c4d5e6f7a8b9c0d"),
  "name": "张三",
  "age": 25,
  "skills": ["Python", "MongoDB"],
  "address": {
    "city": "上海",
    "district": "浦东"
  }
}
```

几个关键特征：

- **`_id`** 是主键，不指定时 MongoDB 自动生成一个 ObjectId 
- 字段值可以是字符串、数字、数组、嵌套文档等多种类型
- 同一个集合中的文档**不要求结构完全一致**（灵活 schema）

### 2.4 什么时候适合用 MongoDB？

- 数据结构不固定或经常变化（如日志、用户行为数据）
- 需要存储嵌套结构（如商品信息含多级分类）
- 读写量大、对水平扩展有要求

---

## 第三章 MongoDB CRUD 命令

以下命令均在 `mongosh` 中执行。先切换到练习数据库：

```javascript
use mydb
```

### 3.1 Create（新增）

```javascript
// 插入单条文档
db.students.insertOne({
  name: "张三",
  age: 20,
  major: "计算机科学"
})

// 插入多条文档
db.students.insertMany([
  { name: "李四", age: 22, major: "软件工程" },
  { name: "王五", age: 21, major: "计算机科学" },
  { name: "赵六", age: 23, major: "人工智能" }
])
```

### 3.2 Read（查询）

```javascript
// 查询全部
db.students.find()

// 条件查询：专业为计算机科学
db.students.find({ major: "计算机科学" })

// 比较运算符：年龄大于 21
db.students.find({ age: { $gt: 21 } })

// 只返回 name 和 age 字段（投影）（1输出,0排除）
db.students.find({}, { name: 1, age: 1, _id: 0 })

// 排序：按年龄降序
db.students.find().sort({ age: -1 })

// 限制返回条数
db.students.find().limit(2)

// 查询单条
db.students.findOne({ name: "张三" })
```

常用比较运算符：

| 运算符 | 含义     | 示例                               |
| ------ | -------- | ---------------------------------- |
| `$gt`  | 大于     | `{ age: { $gt: 20 } }`             |
| `$gte` | 大于等于 | `{ age: { $gte: 20 } }`            |
| `$lt`  | 小于     | `{ age: { $lt: 25 } }`             |
| `$lte` | 小于等于 | `{ age: { $lte: 25 } }`            |
| `$ne`  | 不等于   | `{ major: { $ne: "数学" } }`       |
| `$in`  | 在列表中 | `{ major: { $in: ["AI", "CS"] } }` |

### 3.3 Update（更新）

```javascript
// 更新单条：把张三的年龄改为 21
db.students.updateOne(
  { name: "张三" },          
  { $set: { age: 21 } }     
)

db.students.updateOne(
  { name: "李四" },          
  { $set: { age: 21 } }     
)



// 更新多条：所有计算机科学的学生加一个 status 字段
db.students.updateMany(
  { major: "计算机科学" },
  { $set: { status: "在读" } }
)
db.students.updateMany(
  { age: 21 },
  { $set: { major: "在读" } }
)

// 数值自增：年龄 +1
db.students.updateOne(
  { name: "张三" },
  { $inc: { age: 1 } }
)
```

常用更新运算符：

| 运算符   | 作用           | 示例                            |
| -------- | -------------- | ------------------------------- |
| `$set`   | 设置字段值     | `{ $set: { age: 25 } }`         |
| `$unset` | 删除字段       | `{ $unset: { status: "" } }`    |
| `$inc`   | 数值增减       | `{ $inc: { age: 1 } }`          |
| `$push`  | 向数组追加元素 | `{ $push: { skills: "Java" } }` |
| `$pull`  | 从数组移除元素 | `{ $pull: { skills: "Java" } }` |

### 3.4 Delete（删除）

```javascript
// 删除单条
db.students.deleteOne({ name: "赵六" })

// 删除多条：删除所有年龄小于 21 的
db.students.deleteMany({ age: { $lt: 21 } })

// 清空整个集合（慎用）
db.students.deleteMany({})

// 删除集合本身
db.students.drop()
```

---

## 第四章 MongoDB Compass 客户端

### 4.1 什么是 MongoDB Compass？

MongoDB Compass 是 MongoDB 官方提供的**图形化管理工具**，可以直观地浏览数据库、执行查询、查看索引和性能指标，适合开发调试和学习阶段使用。

### 4.2 下载安装

访问官网下载页面：https://www.mongodb.com/try/download/compass

选择对应操作系统的版本，安装过程一路默认即可。

### 4.3 连接数据库

打开 Compass 后，在连接字符串输入框填入：

```
mongodb://admin:123456@localhost:27017/?authSource=admin
```

点击 **Connect** 即可连接到本地 Docker 中的 MongoDB。

### 4.4 常用功能

**浏览数据**：左侧选择数据库 → 选择集合，右侧以表格或 JSON 形式展示文档内容。

**执行查询**：在 Filter 输入框中输入查询条件，例如 `{ age: { $gt: 20 } }`，点击 Find 按钮。

**新增文档**：点击 **ADD DATA → Insert Document**，在编辑器中输入 JSON 格式的文档。

**编辑文档**：鼠标悬停在某条文档上，点击编辑图标，直接修改字段值。

**删除文档**：鼠标悬停在某条文档上，点击删除图标。

**查看索引**：切换到 **Indexes** 标签页，可以查看当前集合的所有索引信息。

---

## 第五章 Python 连接 MongoDB（PyMongo）

### 5.1 安装依赖

```bash
pip install pymongo
```

### 5.2 建立连接

```python
from pymongo import MongoClient

# 连接 MongoDB
client = MongoClient("mongodb://admin:123456@192.168.200.130:27017")
      
# 选择数据库（不存在则自动创建）
db = client["mydb"]

# 选择集合（不存在则自动创建）
collection = db["students"]

print("连接成功！")
```

### 5.3 新增数据

```python
# 插入单条
result = collection.insert_one({
    "name": "张三",
    "age": 20,
    "major": "计算机科学"
})
print(f"插入成功，ID: {result.inserted_id}")

# 插入多条
results = collection.insert_many([
    {"name": "李四", "age": 22, "major": "软件工程"},
    {"name": "王五", "age": 21, "major": "计算机科学"},
])
print(f"插入 {len(results.inserted_ids)} 条记录")
```

### 5.4 查询数据

```python
# 查询全部
for doc in collection.find():
    print(doc)

# 条件查询
for doc in collection.find({"major": "计算机科学"}):
    print(doc["name"], doc["age"])

# 查询单条
student = collection.find_one({"name": "张三"})
print(student)

# 带排序和限制
for doc in collection.find().sort("age", -1).limit(2):
    print(doc["name"], doc["age"])
```

### 5.5 更新数据

```python
# 更新单条
result = collection.update_one(
    {"name": "张三"},           # 查询条件
    {"$set": {"age": 21}}       # 更新操作
)
print(f"匹配 {result.matched_count} 条，修改 {result.modified_count} 条")

# 更新多条
result = collection.update_many(
    {"major": "计算机科学"},
    {"$set": {"status": "在读"}}
)
print(f"修改 {result.modified_count} 条")
```

### 5.6 删除数据

```python
# 删除单条
result = collection.delete_one({"name": "王五"})
print(f"删除 {result.deleted_count} 条")

# 删除多条
result = collection.delete_many({"age": {"$lt": 21}})
print(f"删除 {result.deleted_count} 条")
```

### 5.7 完整示例

```python
"""
学生管理小程序 —— 演示 PyMongo 的完整 CRUD 操作
"""

from pymongo import MongoClient


def get_collection():
    """获取数据库集合。"""
    client = MongoClient("mongodb://admin:123456@192.168.200.130:27017")
    return client["school"]["students"]


def add_student(coll, name: str, age: int, major: str):
    """新增学生。"""
    result = coll.insert_one({"name": name, "age": age, "major": major})
    print(f"[新增] {name}，ID: {result.inserted_id}")


def list_students(coll):
    """列出所有学生。"""
    students = list(coll.find({}, {"_id": 0}))
    if not students:
        print("[查询] 暂无学生记录")
        return
    print(f"[查询] 共 {len(students)} 名学生：")
    for s in students:
        print(f"  - {s['name']}，{s['age']} 岁，{s['major']}")


def update_student_age(coll, name: str, new_age: int):
    """修改学生年龄。"""
    result = coll.update_one({"name": name}, {"$set": {"age": new_age}})
    if result.matched_count:
        print(f"[更新] {name} 的年龄已改为 {new_age}")
    else:
        print(f"[更新] 未找到学生 {name}")


def delete_student(coll, name: str):
    """删除学生。"""
    result = coll.delete_one({"name": name})
    if result.deleted_count:
        print(f"[删除] 已删除 {name}")
    else:
        print(f"[删除] 未找到学生 {name}")


if __name__ == "__main__":
    coll = get_collection()

    # 清空旧数据，从头演示
    coll.delete_many({})

    # C - 新增
    add_student(coll, "张三", 20, "计算机科学")
    add_student(coll, "李四", 22, "软件工程")
    add_student(coll, "王五", 21, "人工智能")

    # R - 查询
    list_students(coll)

    # U - 更新
    update_student_age(coll, "张三", 21)

    # D - 删除
    delete_student(coll, "王五")

    # 最终结果
    print("\n--- 最终数据 ---")
    list_students(coll)
```

运行输出：

```
[新增] 张三，ID: 665a...
[新增] 李四，ID: 665a...
[新增] 王五，ID: 665a...
[查询] 共 3 名学生：
  - 张三，20 岁，计算机科学
  - 李四，22 岁，软件工程
  - 王五，21 岁，人工智能
[更新] 张三 的年龄已改为 21
[删除] 已删除 王五

--- 最终数据 ---
[查询] 共 2 名学生：
  - 张三，21 岁，计算机科学
  - 李四，22 岁，软件工程
```

---

## 第六章 总结

### 6.1 本课回顾

| 章节   | 核心内容                                           |
| ------ | -------------------------------------------------- |
| 第一章 | 用 Docker 一条命令部署 MongoDB，学会容器的启停管理 |
| 第二章 | 理解文档、集合、数据库的概念，与关系型数据库做类比 |
| 第三章 | 掌握 mongosh 中的 CRUD 命令和常用运算符            |
| 第四章 | 使用 Compass 图形化工具直观操作数据库              |
| 第五章 | 用 PyMongo 在 Python 中完成完整的增删改查          |

### 6.2 进阶方向

学完本课之后，可以继续探索以下主题：

- **索引优化**：为高频查询字段创建索引，理解复合索引和覆盖查询
- **聚合管道**：使用 `aggregate()` 进行分组统计、数据转换等复杂操作
- **副本集与分片**：了解 MongoDB 的高可用和水平扩展方案
- **数据建模**：学习嵌套文档 vs 引用的设计取舍
- **事务支持**：MongoDB 4.0+ 支持多文档 ACID 事务

### 6.3 常用资源

- MongoDB 官方文档：https://www.mongodb.com/docs/manual/
- PyMongo 文档：https://pymongo.readthedocs.io/