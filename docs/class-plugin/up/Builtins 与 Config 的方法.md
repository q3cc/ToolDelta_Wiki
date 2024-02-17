# 进阶 - Builtins 与 Config 的接口方法

<b>Config 类</b>
· Config 类 旨在提供一些与配置文件的检测和获取有关的方法。

我们知道, 每一个组件都需要配置文件才能做到自定义化;
但是在Python里, 如何校验一个配置文件的内容是否合法呢, 例如:
```python
a_dict = {
    "年龄": 25,
    "名字": "王子异"
}
```
我们需要检验 `"年龄"` 是否为正整数, `"名字"` 是否为字符串;

比如这样的一个示例插件, 它专门对一个dict进行检测:
```python
from tooldelta import Config
# 导入配置文件检测类
CFG_TO_CHECK = {
    "这个配置项要填整数": 0,
    "填正整数": 1,
    "填字符串": "哈喽",
    "填字符串的列表": ["a", "b"]
    "这个列表里既可以有字符串也可以有整数": [1, "2", 3, "4"]
    "这是个子json对象, 里面的内容也要被校验, 你也可以在里面套娃": {
        "halo": 1,
        "hello": 2
    },
    "这是个非必须的json键 - 2": 6,
    "或者填这个键也没问题": "?"
} # 待检测的dict
CFG_CHECKER = {
    "这个配置项要填整数": int,
    "填正整数": Config.PInt,
    "填字符串": str,
    "填包含字符串的列表": ["%list", str],
    "这个列表里既可以有字符串也可以有整数": ["%list", [str, int]],
    "这是个子json对象, 里面的内容也要被校验, 你也可以在里面套娃": {
        "halo": Config.PInt, # 代表这里必须为正整数
        "hello": int
    },
    Config.UnneccessaryKey("这是个非必须的json键"): int,
    Config.UnneccessaryKey("这是个非必须的json键 - 2"): int,
    Config.Group("你可以填这个键", "或者填这个键也没问题"): str # 这代表只要两个json键中其中有一个被填写就ok
} # 标准样式
Config.checkDict(CFG_CHECKER, CFG_TO_CHECK) # 如果有什么问题, 在这会直接引发报错, 你可以不用处理报错, 这样 配置文件哪里需要修改 用户一眼就可以看到; 以上这种写法不会引发它的报错. 但是你可以试试把halo的值改为-1, 看看会发什么.
# 引发的异常基类为 Config.ConfigError, 可以用这个方法捕捉异常.

```
这只是对插件配置文件的检验, 如果我们想做插件写入默认配置, 读取配置文件, 检验配置文件的全流程, 那么请看下面的步骤:
```python
if 0:
    from ...source import plugins, Plugin, Frame, Config # 假导入, 使得IDE能自动补全
@plugins.add_plugin
class GetConfigOrWriteIt(Plugin):
    name = "获取或读取配置文件"
    def __init__(self, frame: Frame):
        self.frame = frame
        default_cfg = {
            "示例1": "你好!",
            "示例2": 3.1415926
        }
        cfg_checker = {
            "示例1": str,
            "示例2": Config.NNFloat # 非负浮点数
        }
        self.cfg, cfg_version = Config.getPluginConfigAndVersion(self.name, cfg_checker, default_cfg, self.version)
        # 检测到配置文件json不存在的话, 就使用 default_cfg 的内容创建一个.
        # 保存位置: 插件配置文件 / <self.name>.json
        # 同样, getPluginConfigAndVersion检测到配置文件与cfg_checker给出的配置文件标准样式不一样的话也会报错,
        # 但是同样也不需要处理这个报错, 因为它会对用户显示配置文件错误信息, 然后导致系统退出
        print(self.cfg["示例1"]) # -> 你好!
        print(self.cfg["示例2"]) # 3.1415926
 ```

 - 使用 `Config.getPluginConfigAndVersion` 方法即可做到快速生成默认配置文件/读取并校验配置文件!
 - `getPluginConfigAndVersion` 的参数分别是: 插件配置名, 配置文件格式, 默认配置, 默认配置版本
它会尝试去获取用户关于此插件的配置文件信息, 若文件未找到, 则利用给出的默认插件配置文件创建一个新的配置文件

<b>Builtins 类</b>
 - Builtins 提供了一些常用的非常有用的方法。

 - Builtins.SimpleFmt: 这个功能相当于str.replace, 只不过方便了一些.
 在之前的插件做如下修改:
```python
    def on_player_join(self, player: str):...
新内容 >>>
    def on_player_death(self, player, killer):
        killer = killer if killer is not None else "???"
        msg = Builtins.SimpleFmt(
            {"[玩家]": player, "[敌方]": killer}
            "[玩家] 被 [敌方] 干趴力"
        )
        this.game_ctrl.say_to("@a", msg)
结束 <<<
    def on_player_leave(self, player):...
```

- Builtins.SimpleJsonDataReader: 便捷的json数据读取写入.

```python
Builtins.SimpleJsonDataReader.readFileFrom(插件名, json数据文件的名字, 数据文件不存在则写入以下内容 = None)
Builtins.SimpleJsonDataReader.writeFileTo(插件名, json数据文件的名字, 内容)
```
