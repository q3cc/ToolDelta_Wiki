# 进阶 - 插件API

想尝试进阶的组件写法? 下面我们来介绍ToolDelta提供的各种方法和API
- 开放的插件API:
```python
@plugins.add_plugin_api("NewPluginAPI")
class NewPluginAPI(PluginAPI):
    version = (0, 0, 1) # 版本
    def __init__(self, frame):
        self.frame = frame
        self.game_ctrl = frame.get_game_control()

    def BroadCast(self, string: str):
        self.game_ctrl.say_to("@a", "广播: " + string)
```
自此, API提供方就造好了;
注意, 如果你的插件里只有一个API而没有主插件类的话, 请这么做:
```python
@plugins.add_plugin_as_api("NewPluginAPI")
class NewPluginAPI(Plugin, PluginAPI):
    version = (0, 0, 1) # 版本
    def __init__(self, frame):
        self.frame = frame
        self.game_ctrl = frame.get_game_control()

    def BroadCast(self, string: str):
        self.game_ctrl.say_to("@a", "广播: " + string)
```
- 调用API
我们再在之前的代码里加上:
```python
...
        self.game_ctrl = frame.get_game_control() # 接收 GameControl 以便之后使用

新内容 >>>
    def on_def(this):
        # 获取API的方法必须写在on_def里!!
        self.gettingAPI = plugins.get_plugin_api("NewPluginAPI", (0, 0, 1)) # 获取API, 第二个参数是要求的api的最低版本
        # gettingAPI将获取到被实例化的 NewPluginAPI 对象
        # version -> (0, 0, 1)

    def on_inject(self):
        self.gettingAPI.BroadCast("你们见到了腐竹吗") # 调用这个API的方法
结束 <<<
        print("机器人进入游戏了")
...
```
API的使用也写好了.
当然, 对 `NewPluginAPI` 的定义和对其的使用(API获取) 可以在两个不同的插件文件内进行,
前者就相当于为后者提供了前置库.