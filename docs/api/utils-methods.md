## Utils 类

#### 获取方法
```python
from tooldelta.utils import Utils
```

**Utils 提供了一些框架内常用的非常有用的方法。**


#### 基本方法

> createThread

创建一个特殊线程，这个线程受ToolDelta主框架控制和收集。另外，它还能被停止。
- 参数：
`func: Callable` 线程函数
`args: tuple` 函数传入的参数组，默认为空
`usage: str` 线程的用途，建议填写，默认为空
`**kwargs` 线程函数的关键字参数，默认为空
- 返回：`ToolDeltaThread`
可以使用 my_thread.stop() 以停止这个线程的执行。

> simple_fmt

对字符串以简单的方法进行格式化替换。
- 参数：
`kw: dict[str, Any]` 替换标记与替换内容的映射字典
`sub: str` 将被格式化的字符串
- 返回：
格式后的字符串

用法如下：
```python
>>> print(Utils.simple_fmt( {"[arg1]": "Super", "[arg2]": 2}, "i am [arg1] and i'm [arg2] yrs old"))
"i am Super and i'm 2 yrs old"
```

> @thread_func

作为装饰器使用， 放在任意堵塞函数上，使函数成为线程函数，在被执行的时候自身作为一个新线程启动，不会阻塞代码的继续运行。

用法如下：
```python
@Utils.thread_func
def say_hi(name):
    for i in range(5):
        print(f"hi {name}")
        time.sleep(1)

say_hi("Super")
say_hi("Wling")
```

> try_int

传入任意值（e.g.字符串）， 尝试转换为整数并返回，否则返回None

#### 专用方法

**TMPJson：** 提供了加载、卸载、读取和写入JSON文件到**缓存区**的方法的类，让JSON的读取写入更加迅速，磁盘操作更少。

**内含方法**

> loadPathJson

从磁盘路径加载json文件到缓存区，用于快速读写。
在缓存文件已加载的情况下，再使用一次该方法不会有任何作用
- 参数：
`path: str` 文件路径，同时作为这个文件的磁盘路径和虚拟路径
`needFileExists: bool` 是否需要文件存在，为False则自动创建一个内容为null的json文件。默认为True

> unloadPathJson

将json从缓冲区卸载并存盘，之后不能对此文件进行读写。
- 参数：
`path: str` 文件路径，同时作为这个文件的磁盘路径和虚拟路径
- 返回：
`bool` 是否卸载成功（没有加载文件时卸载视为不成功）
- 报错：
`ValueError` json虚拟路径未载入，无法读取

> read

对虚拟路径中的json进行读取。返回一个缓存区经过深拷贝的json对象。
- 参数：
`path: str` json文件的虚拟路径
- 返回：
`Any` json对象

> write

对虚拟路径中的json进行覆写操作（注意是覆写之前的内容）。
- 参数：
`path: str` json文件的虚拟路径
`obj: Any` 待写入的任意json对象
- 报错：
`ValueError` json虚拟路径未载入，无法写入

> read_as_tmp

对虚拟路径中的json进行读取。如果不存在，则尝试从磁盘打开对应路径的json文件。在限定时间后自动存盘卸载。
- 参数：
`path` json文件的虚拟路径
`needFileExists` 当从磁盘读取文件时，是否在文件不存在时自动创建一个内容为null的json文件。默认为False
`timeout: int` 经过多长时间（秒）后自动将打开的json文件从缓存区卸载，默认为30

> write_as_tmp

对虚拟路径中的json进行覆写。如果不存在，则尝试从磁盘打开对应路径的json文件。在限定时间后自动存盘卸载。
- 参数：
`path` json文件的虚拟路径
`obj: Any` 待写入的任意json对象
`needFileExists` 当从磁盘读取文件时，是否在文件不存在时自动创建一个内容为null的json文件。默认为False
`timeout: int` 经过多长时间（秒）后自动将打开的json文件从缓存区卸载，默认为30

