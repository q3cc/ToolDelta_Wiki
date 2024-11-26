## 创建一个 API 插件

当你在插件编写了**一些很有用的方法函数**，并且希望让其他人也能**轻松使用你编写的方法**时，可以用如下方法把你的插件类作为 **公开接口插件（API插件）** 类注册进框架内，使得其他插件可以直接调用：

```python
@plugins.add_plugin_as_api(apiName, version)
class MyPlugin(Plugin):
    ...
```
参数：
- **apiName** (str): 你创建的插件 API 名字
- **version** (tuple[int, int, int]): api 版本号

以下为示例代码：
```python
from tooldelta import plugins, Plugin

@plugins.add_plugin_as_api("example-api-plugin", (0, 0, 1))
class MyPlugin(Plugin):
    ...
    def hello(self, msg: str):
        print("hello,", msg)

    def declare_friendly(self, name: str):
        print(name, "是友好生物哦~")
```

现在，你把你的插件类 `MyPlugin` 既注册为了一个插件主类，又同时注册为了插件API；  
它既可以作为一个普通插件运行， 又可以被其他插件获取。  
现在我们可以跨插件调用这个插件里的**所有方法**。

其他插件使用你的 API 插件提供的功能：

```python
from tooldelta import plugins

api = plugins.get_plugin_api(apiName, min_version)
```
参数：
- **apiName** (str): 插件 API 名字
- **min_version** (tuple[int, int, int]): api要求的最低版本，默认为 (0, 0, 1)；如果低于此版本，将引发异常（你无需处理）

以下为示例代码：
```python
from tooldelta import plugins

class MyPlugin2(Plugin):
    ...
    def on_def(self):
        # 在 on_def 方法里调用 get_plugin_api 不需要处理报错
        # 因为报错会直接被框架捕获 然后输出 `API不存在` 的提示
        self.api_from_another_plugin = plugins.get_plugin_api(
            "example-api-plugin",
            (0, 0, 1)
        )

    def use_api(self):
        # 随便在某处调用获取到的接口 api
        # 调用从 MyPlugin 插件中的方法
        self.api_from_another_plugin.hello("world")
        self.api_from_another_plugin.declare_friendly("史莱姆")
```

> 实际上 add_plugin_api 是将整个插件主类的实例化开放给其他插件使用  
> 你可以尝试 print(plugins.get_plugin_api("..."))
> 就会发现，其为一个类的实例  
> 也就是说，你获取到的插件接口实际上就是**这个插件的主类的实例**  


看起来示例中的 `hello()` 和 `declare_friendly()` 都没有得到语法高亮。  
如果你想解决这个问题， ToolDelta 也提供了如下方法让导入的插件接口能被 IDE 高亮
```python
from tooldelta import plugins, TYPE_CHECKING

class MyPlugin2(Plugin):
    ...
    def on_def(self):
        self.api_from_another_plugin = plugins.get_plugin_api(
            "example-api-plugin",
            (0, 0, 1)
        )
        if TYPE_CHECKING:

            # 假设 插件API 所处文件夹的名字叫 MY_PLUGIN
            # 即其目录结构为 插件文件/ToolDelta类式插件/MY_PLUGIN/__init__.py
            # 假设 其插件主类名字为 MyPlugin

            from MY_PLUGIN import MyPlugin
            self.api_from_another_plugin = plugins.instant_plugin_api(MyPlugin)
            # 之后 IDE 就可以识别 api_from_another_plugin 里的所有属性和方法了

    def use_api(self):
        # 下面的函数调用会被 IDE 语法高亮
        self.api_from_another_plugin.hello("world")
        self.api_from_another_plugin.declare_friendly("史莱姆")

```
