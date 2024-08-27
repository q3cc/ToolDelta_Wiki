## 创建一个 API插件

当你在插件编写了**一些很有用的方法函数**，并且希望让其他人也能**轻松使用你编写的方法**时，可以用如下方法把你的插件类作为API插件类注册进框架内，使得其他插件可以直接调用：

```python
@plugins.add_plugin_as_api(apiName: str, version: tuple[int, int, int])
class MyPlugin(Plugin):
    ...
```
参数：
- apiname: 你创建的插件 API 名字
- version: api 版本，为一个有三个整数元素的元祖

以下为示例代码：
```python
from tooldelta import plugins, Plugin

@plugins.add_plugin_as_api("能干很多事的插件", (0, 0, 1))
class MyPlugin(Plugin):
    ...
    def func1(self, msg: str):
        print("hello", msg)

    def func2(self, ...):...
```

其他人使用你的API插件提供的功能：

```python
from tooldelta import plugins

api_cls = plugins.get_plugin_api(apiName: str, min_version: tuple[int, int, int])
```
参数：
- apiName: 插件 API 名字
- min_version: api要求的最低版本，默认为 (0, 0, 1)

以下为示例代码：
```python
from tooldelta import plugins

class MyPlugin2(Plugin):
    ...
    def on_def(self):
        # 在 on_def 方法里调用 get_plugin_api 不需要处理报错
        # 因为报错会直接被框架捕获 然后输出API不存在的提示
        self.api_1 = plugins.get_plugin_api("能干很多事的插件", (0, 0, 1))

    def use_api(self):
        self.api_1.func1("world")
```

> 如果你想使用代码补全
> 我们也提供了如下方法让你导入的插件API能被IDE高亮
```python
from tooldelta import plugins, TYPE_CHECKING

class MyPlugin2(Plugin):
    ...
    def on_def(self):
        self.api_1 = plugins.get_plugin_api("能干很多事的插件", (0, 0, 1))
        if TYPE_CHECKING:
            # 假设 插件API 所处文件夹的名字叫 MY_PLUGIN
            # 假设 其插件主类名字为 MyPlugin
            from MY_PLUGIN import MyPlugin
            self.api_1 = plugins.instant_plugin_api(MyPlugin)
            # 后面IDE就可以识别 api 里所带的方法了

    def use_api(self):
        # 下面的函数调用会被 IDE 高亮
        self.api_1.func1("world")

```
