# 进阶 - 插件 API

想尝试进阶的组件写法？下面我们来介绍 ToolDelta 提供的各种方法和 API

## 创建一个 API

你在插件制作了一个很有用的方法函数，并且想让其他人也能轻松使用你制作的方法，那么你可以这么做 (推荐写法):

```python
from tooldelta import plugins, Plugin

@plugins.add_plugin_as_api(apiname="能干很多事的插件", version=(0, 0, 1))
class MyPlugin(Plugin):
    ...
    def kemusan(self, ...):"假设这个方法可以让机器人跳科目三"
    def yuanshen(self, ...):...
    ...
```
- apiname: 你创建的插件 API 名字
- version: api 版本，为一个又三个整数元素的元祖

另外一个人想在他的插件里调用你的方法，他可以这么做：

```python
@plugins.add_plugin
class HisPlugin(Plugin):
    ...
    def on_def(self):
        self.getting_api = plugins.get_plugin_api(apiname="能干很多事的插件", min_version=(0, 0, 1))

    def use_api(self):
        self.getting_api.kemusan(...)
        self.getting_api.yuanshen(...)
```

- apiname: API 名字，需要与上面一样，才能获取到对应的 api
- min_version: 需要 api 的最低版本，若获取到的 api 版本太低，将会引发异常，不用捕获，交给 ToolDelta 自动处理就行
- 为什么要在 `on_def` 方法里写？
   - 在 `__init__` 写时，对应的插件可能还没有加载完全
   - `on_def` 将在所有插件加载完后被执行
   - `on_def` 引发的 API 版本过低异常会被自动处理


::: details 手把手教学：给你的插件创建一个 API

```python
@plugins.add_plugin_api("NewPluginAPI")
class NewPluginAPI(PluginAPI):
    version = (0, 0, 1) # 版本
    def __init__(self, frame):
        self.frame = frame
        self.game_ctrl = frame.get_game_control()

    def BroadCast(self, string: str):
        self.game_ctrl.say_to("@a", "广播：" + string)
```

自此，API 提供方就造好了;
> 注意，如果你的插件里只有一个 API 而没有主插件类的话，请这么做：

```python
@plugins.add_plugin_as_api("NewPluginAPI")
class NewPluginAPI(Plugin, PluginAPI):
    version = (0, 0, 1) # 版本
    def __init__(self, frame):
        self.frame = frame
        self.game_ctrl = frame.get_game_control()

    def BroadCast(self, string: str):
        self.game_ctrl.say_to("@a", "广播：" + string)
```

:::

## 调用 API

我们再在之前的教学代码里加上：

```diff
...
        self.game_ctrl = frame.get_game_control() # 接收 GameControl 以便之后使用

+   def on_def(this):
+       # 获取 API 的方法必须写在 on_def 里!!
+       self.gettingAPI = plugins.get_plugin_api("NewPluginAPI", (0, 0, 1)) # 获取 API, 第二个参数是要求的 api 的最低版本
+       # gettingAPI 将获取到被实例化的 NewPluginAPI 对象
+       # version -> (0, 0, 1)

+   def on_inject(self):
+       self.gettingAPI.BroadCast("你们见到了腐竹吗") # 调用这个 API 的方法
        print("机器人进入游戏了")
...
```

API 的使用也写好了！

当然，对 `NewPluginAPI` 的定义 和对其的使用 (API 获取) 可以在两个不同的插件文件内进行，
前者就相当于为后者提供了一个前置库。