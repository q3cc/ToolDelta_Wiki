# 附录：Config 提供的键值对检测样式
- Dict 键：
    - Config.UnneccessaryKey(key): 非必须的 JSON 键
    - Config.Group(key1, *keys): 多选一的 JSON 键
    - r"%any": 任意名字的键 (有零个或多个这样的键值对，能匹配 {"a": ..., "b": ..., ..})
- Dict 值 (type):
    - Config.PInt: 正整数
    - Config.NNInt: 非负整数
    - Config.PFloat: 正浮点小数
    - Config.NNFloat: 非负浮点小数
    - list [type1, type2, ...]: 多选一的 JSON 值，可以匹配列表内的任意一种类型
    - list [r"%list", type]: 列表成分都为 type 的列表
应用：
```python
cfg = {
    "key1": int,
    "key2": str,
    "key3": Config.PInt,
    "key4": [r"%list", str],
    "key5": [r"%list", [str, int]],
    "key6": [r"%list", {"a": Config.PInt}],
    Config.UnneccessaryKey("key7"): bool,
    Config.Group("key8", "key9"): bool
}
```
下面的这段 JSON 是符合上述格式的：
```JSON
{
    "key1": 6,
    "key2": "hello",
    "key3": 6,
    "key4": ["1", "2", "hello"],
    "key5": ["1", 2, "hello", 4],
    "key6": [{"a": 42}],
    "key9": true
} # 待检测的 dict
CFG_CHECKER = {
    "这个配置项要填整数": int,
    "填正整数": Config.PInt,
    "填字符串": str,
    "填包含字符串的列表": ["%list", str],
    "这个列表里既可以有字符串也可以有整数": ["%list", [str, int]],
    "这是个子 JSON 对象，里面的内容也要被校验，你也可以在里面套娃": {
        "halo": Config.PInt, # 代表这里必须为正整数
        "hello": int
    },
    Config.UnneccessaryKey("这是个非必须的 JSON 键"): int,
    Config.UnneccessaryKey("这是个非必须的 JSON 键 - 2"): int,
    Config.Group("你可以填这个键", "或者填这个键也没问题"): str # 这代表只要两个 JSON 键中其中有一个被填写就 ok
} # 标准样式
Config.checkDict(CFG_CHECKER, CFG_TO_CHECK) # 如果有什么问题，在这会直接引发报错，你可以不用处理报错，这样 配置文件哪里需要修改 用户一眼就可以看到; 以上这种写法不会引发它的报错。但是你可以试试把 halo 的值改为 -1, 看看会发什么。
# 引发的异常基类为 Config.ConfigError, 可以用这个方法捕捉异常。
```

这只是对插件配置文件的检验，如果我们想做插件写入默认配置，读取配置文件，检验配置文件的全流程，那么请看下面的步骤：

```python
if 0:
    from ...source import plugins, Plugin, Frame, Config # 假导入，使得 IDE 能自动补全
@plugins.add_plugin
class GetConfigOrWriteIt(Plugin):
    name = "获取或读取配置文件"
    def __init__(self, frame: Frame):
        self.frame = frame
        default_cfg = {
            "示例 1": "你好！",
            "示例 2": 3.1415926
        }
        cfg_checker = {
            "示例 1": str,
            "示例 2": Config.NNFloat # 非负浮点数
        }
        self.cfg, cfg_version = Config.getPluginConfigAndVersion(self.name, cfg_checker, default_cfg, self.version)
        # 检测到配置文件 JSON 不存在的话，就使用 default_cfg 的内容创建一个。
        # 保存位置：插件配置文件 / <self.name>.JSON
        # 同样，getPluginConfigAndVersion 检测到配置文件与 cfg_checker 给出的配置文件标准样式不一样的话也会报错，
        # 但是同样也不需要处理这个报错，因为它会对用户显示配置文件错误信息，然后导致系统退出
        print(self.cfg["示例 1"]) # -> 你好！
        print(self.cfg["示例 2"]) # 3.1415926
 ```

 - 使用 `Config.getPluginConfigAndVersion` 方法即可做到快速生成默认配置文件/读取并校验配置文件！
 - `getPluginConfigAndVersion` 的参数分别是：插件配置名，配置文件格式，默认配置，默认配置版本
它会尝试去获取用户关于此插件的配置文件信息，若文件未找到，则利用给出的默认插件配置文件创建一个新的配置文件

## Builtins 类

Builtins 提供了一些常用的非常有用的方法。

 - `Builtins.SimpleFmt`: 这个功能相当于 `str.replace`, 只不过方便了一些。

在之前的插件做如下修改：

```python
    def on_player_join(self, player: str):...
+   def on_player_death(self, player, killer):
+       killer = killer if killer is not None else "???"
+       msg = Builtins.SimpleFmt(
+           {"[玩家]": player, "[敌方]": killer}
+           "[玩家] 被 [敌方] 干趴力"
+       )
+       this.game_ctrl.say_to("@a", msg)
    def on_player_leave(self, player):...
```

- `Builtins.SimpleJsonDataReader`: 便捷的 JSON 数据读取写入。
  - Builtins.SimpleJsonDataReader.readFileFrom(插件名，json 数据文件的名字，数据文件不存在则写入以下内容 = None)
  - Builtins.SimpleJsonDataReader.writeFileTo(插件名，json 数据文件的名字，内容)
