## 使用其他插件提供的API

```python
from tooldelta import Plugin, plugins

@plugins.add_plugin
class ExamplePlugin04(Plugin):
    name = "示例插件-使用API"
    author = "SuperScript"
    version = (0, 0, 1)

    # 获取插件api的方法请写在 on_def
    # 这样 api未找到的异常就会被系统自动处理并显示
    def on_def(self):
        # 获取API插件的实例化的主类
        # 示例中, 也就是 ExamplePlugin01 这个实例
        self.got_api = plugins.get_plugin_api("示例插件api")

    # 玩家在聊天栏发送 “在线管理员数” 这个触发词时, 对玩家显示管理员数量
    def on_player_message(self, player: str, msg: str):
        if msg == "在线管理员数":
            # 调用获取到的插件API实例里的方法
            op_num = self.got_api.how_many_ops()
            self.game_ctrl.say_to(player, f"当前在线管理员个数: {op_num}个")
```