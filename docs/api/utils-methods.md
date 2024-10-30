## Utils 类

#### 获取方法
```python
from tooldelta.utils import Utils
```

**Utils 提供了一些框架内常用的非常有用的方法。**

---
#### 基本方法

```python
Utils.createThread(func, args, usage="", **kwargs)
```

创建一个特殊线程，这个线程受ToolDelta主框架控制和收集。和普通线程类不一样的是，它能使用 stop() 中断运行。
- 参数：  
    `func: Callable` 线程函数  
    `args: tuple` 函数传入的参数组，默认为空  
    `usage: str` 线程的用途，建议填写，默认为空  
`**kwargs` 线程函数的关键字参数，默认为空
- 返回：`ToolDeltaThread`  
可以使用 `.stop()` 以中止这个线程的执行（底层原理：在线程内下一条代码指令处引发专有异常）。

:::details `Utils.createThread` 用法示例
```python
def hello_forever(greet, name):
    while 1:
        print(f"{greet}, {name}")

thread = Utils.createThread(
    hello_forever, ("Hello", "ToolDelta"), "一直说 hello"
)
while 1:
    if input() == "quit":
        thread.stop()
```
:::

---

```python
Utils.simple_fmt(kw, sub)
```

对字符串以简单的方法进行格式化替换。
- 参数：
`kw: dict[str, Any]` 替换标记与替换内容的映射字典  
`sub: str` 将被格式化的字符串
- 返回：
格式后的字符串

:::details `Utils。simple_fmt` 用法示例
```python
>>> print(
    Utils.simple_fmt(
        {
            "[arg1]": "Super",
            "[arg2]": 2
        },
        "i am [arg1] and i'm [arg2] yrs old"
    )
)
"i am Super and i'm 2 yrs old"
```
:::

---

```python
Utils.thread_func(usage: str)
```

作为装饰器使用， 放在任意堵塞函数上，使函数成为线程函数，在被执行的时候自身作为一个新线程启动，不会阻塞代码的继续运行。
- 参数 `usage` 此线程用途

:::details `@Utils.thread_func` 用法示例
```python
@Utils.thread_func("一个简单的方法")
def say_hi(name):
    for i in range(5):
        print(f"hi {name}")
        time.sleep(1)

say_hi("Super")
```
:::

---
```python
Utils.thread_gather(funcs_and_args)
```
并行获取多个阻塞函数的返回值。  
- 参数：  
`funcs_and_args` 阻塞函数以及其参数的列表  
- 返回：  
这些函数的返回的列表 （按传入函数的顺序返回其结果）

:::details `Utils.thread_gather` 示例用法
```python
import requests
from tooldelta import Utils, game_utils

(
    baidu_resp,
    bili_resp,
    douyin_resp,
    cmd_is_success
) = Utils.thread_gather(
    [
        requests.get, ("https://www.baidu.com",),
        requests.get, ("https://www.bilibili.com",),
        requests.get, ("https://www.douyin.com",)
        game_utils.isCmdSuccess, ("/testfor @a[m=0]")
    ]
)


```
:::


---

```python
Utils.try_int(n: Any)
```

传入任意值（e.g.字符串）， 尝试转换为整数并返回，否则返回None

---

#### 专用方法: TMPJson

**Utils.TMPJson：** 提供了加载、卸载、读取和写入JSON文件到**缓存区**的方法的类，让JSON的读取写入更加迅速，磁盘操作更少。

```python
TMPJson.loadPathJson(path, needFileExists=False)
```

从磁盘路径加载json文件到缓存区，用于快速读写。  
在缓存文件已加载的情况下，再使用一次该方法不会有任何作用。  
一般情况下， 强烈建议使用 `read_as_tmp()` 代替此方法
- 参数：  
`path: str` 文件路径，同时作为这个文件的磁盘路径和虚拟路径  
`needFileExists: bool` 是否需要文件存在，为False则自动创建一个内容为null的json文件。默认为True  

```python
unloadPathJson
```

将json从缓冲区卸载并存盘，之后不能对此文件进行读写。
- 参数：  
`path: str` 文件路径，同时作为这个文件的磁盘路径和虚拟路径
- 返回：  
`bool` 是否卸载成功（没有加载文件时卸载视为不成功）
- 报错：  
`ValueError` json虚拟路径未载入，无法读取

---

```python
TMPJson.read(path)
```

对虚拟路径中的json进行读取。返回一个缓存区经过深拷贝的json对象。
- 参数：
`path: str` json文件的虚拟路径
- 返回：
`Any` json对象

---

```python
TMPJson.write(path, obj)
```

对虚拟路径中的json进行覆写操作（注意是覆写之前的内容）。
- 参数：  
`path: str` json文件的虚拟路径  
`obj: Any` 待写入的任意json对象  
- 报错：  
`ValueError` json虚拟路径未载入，无法写入

---

```python
TMPJson.read_as_tmp(path, needFileExists=False, timeout=30)
```

对虚拟路径中的json进行读取。如果不存在，则尝试从磁盘打开对应路径的json文件。在限定时间后自动存盘卸载。
- 参数：  
`path` json文件的虚拟路径  
`needFileExists` 当从磁盘读取文件时，是否在文件不存在时自动创建一个内容为null的json文件。默认为False  
`timeout: int` 经过多长时间（秒）后自动将打开的json文件从缓存区卸载，默认为30

```python
TMPJson.write_as_tmp(path, obj, needFileExists=False, timeout=30)
```

对虚拟路径中的json进行覆写。如果不存在，则尝试从磁盘打开对应路径的json文件。在限定时间后自动存盘卸载。  
- 参数：  
`path` json文件的虚拟路径  
`obj: Any` 待写入的任意json对象  
`needFileExists` 当从磁盘读取文件时，是否在文件不存在时自动创建一个内容为null的json文件。默认为False  
`timeout: int` 经过多长时间（秒）后自动将打开的json文件从缓存区卸载，默认为30

:::details TMPJson 各方法综合使用示例
```python
from tooldelta import Utils
TMPJson = Utils.TMPJson

# 最初的缓冲json文件使用方法 (现在不推荐使用)
file_path = "测试.json"
# 将文件装载到缓存区
TMPJson.loadPathJson(file_path, False)
# 此时可以对 file_path 指向的json文件进行快速读写
content = TMPJson.read(file_path)
# 对文件内容 (content) 做点什么
# if content is None:
#     content = {}
# content["age"] = 18
TMPJson.write(file_path, content)
# 将文件从缓存区卸载, 写入磁盘
TMPJson.unloadPathJson(file_path)


# 最新的缓冲json文件使用方法 (推荐)
# 会自动 loadPathJson 和 unloadPathJson
file_path = "测试.json"
content = TMPJson.read_as_tmp(file_path, False)
# 对文件内容 (content) 做点什么
# if content is None:
#     content = {}
# content["age"] = 18
# 写文件
TMPJson.write_as_tmp(file_path, content)
# 如果你需要立刻更新文件内容到磁盘:
TMPJson.flush(file_path)

```
:::
