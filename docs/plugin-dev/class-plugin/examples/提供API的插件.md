## 向其他插件提供API

```python
from tooldelta import Plugin, plugins

@plugins.add_plugin_as_api("示例插件api")
class ExamplePlugin02(Plugin):
    name = "示例插件-提供API"
    author = "ToolDelta"
    version = (0, 0, 1)

    # 这个是我们想提供被别人使用的方法
    # 要让其他插件能使用, 这个插件就叫 API插件
    # 说白了, 就是插件主类实例化后, 把这个实例提供给其他插件用
    # 它能获取租赁服中 OP(管理员) 的数量
    def how_many_ops(self):
        ops = 0
        for player_data in self.game_ctrl.all_players_data:
            if player_data.can_operator_commands:
                ops += 1
        return ops
```