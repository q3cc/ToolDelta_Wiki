# utils.tempjson 模块

**tempjson** 模块提供了加载、卸载、读取和写入JSON文件到 **缓存区** 的方法的类，让 JSON 的读取写入更加迅速，磁盘操作更少。

并且，它还大大加速了操作 json 文件的效率，一个函数就可以读取 / 写入 json 文件。

获取方法：
```python
from tooldelta.utils import tempjson
```

## load_and_read {#load_and_read}
对缓存区中的 json 进行读取。如果不存在，则尝试从磁盘打开对应路径的 json 文件。在限定时间后自动存盘卸载。
- 参数：
    | 参数 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | json 文件路径 |
    | need_file_exists | bool | 当从磁盘读取文件时，是否允许目标文件不存在。默认为 `False` |
    | default | Any | 当文件不存在时，向空文件写入的默认内容，默认为 `None` |
    | timeout | int | 经过多长时间（秒）后自动将打开的 json 文件从缓存区卸载，默认为 `30` |
- 返回：
    | 类型 | 说明 |
    | --- | --- |
    | Any | json 文件经过 json.loads() 处理的内容 |
- 报错：  
    | 类型 | 说明 |
    | --- | --- |
    | FileNotFoundError | 在 `need_file_exists=False` 时 json 文件不存在 |
- 示例：
```python
# test.json 已存在
json_data = tempjson.load_and_read("test.json")
print(json_data)

# foo.json 不存在
json_data2 = tempjson.load_and_read(
    "foo.json",
    need_file_exists=False,
    default={"bar": "baz"}
)
print(json_data2)
```

## load_and_write {#load_and_write}
对 json 文件内容进行覆写。如果不存在，则尝试从磁盘打开对应路径的json文件。在限定时间后自动存盘卸载。  
- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | json 文件的路径 |
    | obj | Any | 待写入的任意 json 对象 |
    | need_file_exists | bool | 当从磁盘读取文件时，是否允许目标文件不存在。默认为 `False` |
    | timeout | int | 经过多长时间（秒）后自动将打开的 json 文件从缓存区卸载，默认为 `30` |
- 报错：  
    | 类型 | 说明 |
    | --- | --- |
    | FileNotFoundError | 在 `need_file_exists=False` 时 json 文件不存在 |
- 示例：
```python
# test.json 已存在
tempjson.load_and_write("test.json", {"bar": "baz"})

# foo.json 不存在
tempjson.load_and_write(
    "foo.json",
    {"bar": "baz"},
    need_file_exists=False,
)
```


## load {#load}
从磁盘路径加载 json 文件到缓存区，用于快速读写。  
在缓存文件已加载的情况下，再使用一次该方法不会有任何作用。  
- 参数：   
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | 文件路径
    | need_file_exists | bool | 是否需要文件存在 |
    | default | Any | 当文件不存在时，向空文件写入的默认内容 |
    | timeout | int | 经过多长时间（秒）后自动将打开的 json 文件从缓存区卸载，默认为 `30` |
- 报错：  
    | 类型 | 说明 |
    | --- | --- |
    | FileNotFoundError | 在 `need_file_exists=False` 时 json 文件不存在 |


## unload {#unload}
将 json 文件从缓冲区卸载并存盘。
- 参数：
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | 文件路径 |
- 返回：  
    | 返回类型 | 说明 |
    | --- | --- |
    | bool | 是否成功卸载 |


## read {#read}
对缓存区中的 json 文件进行读取。
- 参数：
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | json 文件的路径 |
    | deepcopy | bool | 是否需要深拷贝。默认为 `True` |
- 返回：
    | 返回类型 | 说明 |
    | --- | --- |
    | Any | json 文件经过 json.loads() 处理的内容 |
- 报错：  
    | 类型 | 说明 |
    | --- | --- |
    | ValueError | json 文件未载入缓冲区，无法写入 |
- 示例：
```python
tempjson.load("my_json_db/test.json")

# 在任意位置使用 tempjson.load() 后
# 可在任意位置使用 tempjson.read() 传入对应的路径以读取 json 内容
json_data = tempjson.read("my_json_db/test.json")
print(json_data)
```


## write {#write}
对缓存区中的 json 文件内容进行覆写。
- 参数：
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | path | str | json 文件的路径 |
    | obj | Any | 待写入的任意 json 对象 |
- 报错：  
    | 类型 | 说明 |
    | --- | --- |
    | ValueError | json 文件未载入缓冲区，无法写入 |
- 示例：
```python
tempjson.load("my_json_db/test.json")

# 在任意位置使用 tempjson.load() 后
# 可在任意位置使用 tempjson.write() 传入对应的路径和内容以覆写 json 内容
tempjson.write("my_json_db/test.json", {"foo": "bar"})
```


## tempjson 综合使用示例 {#综合示例}
```python
from tooldelta.utils import tempjson

# 如果你只需要在一小段时间内频繁读写一个 json 文件

file_path = "测试.json"
content = tempjson.load_and_read(
    file_path,
    need_file_exists=False,
    default={"age": 0}
)

content["age"] = 18

tempjson.load_and_write(file_path, content)

# 如果你需要立刻更新文件内容到磁盘:
# tempjson.flush(file_path)



# 如果你需要在整个运行周期内对 json 文件进行频繁读写
file_path = "测试.json"

# 将文件装载到缓存区
tempjson.load(
    file_path,
    need_file_exists=False,
    default={"age": 0}
)
content = tempjson.read(file_path)

content["age"] = 18

tempjson.write(file_path, content)

# 如果你需要释放内存, 将文件从缓存区卸载, 写入磁盘:
# tempjson.unload(file_path)

```