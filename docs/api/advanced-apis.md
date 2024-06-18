## 与游戏交互、获取数据的高级接口 game_utils

#### 获取方法
```python
from tooldelta import game_utils
```

#### 内置接口

> getTarget

获取符合目标选择器的玩家名列表。请不要用于选择实体。
- 参数：
`target: str` 目标选择器（只能是目标选择器）
`timeout: int` 获取超时时间秒数，默认为30
- 返回：
`list[str]` 玩家名列表
- 报错：
`ValueError` target不是目标选择器
`ValueError` 无法获取坐标信息

> getItem

获取玩家内特定物品的数量
- 参数：
`target: str` 目标玩家名/目标选择器
`itemName: str` 物品ID
`itemSpecialID: int` 物品特殊值，默认 -1

> getScore

获取计分板上指定的目标的分数
- 参数：
`target: str` 计分板项名或目标选择器
`timeout: int` 获取超时时间
- 返回：
`int` 计分板分数

> getPosXYZ

获取玩家的简略坐标值
- 参数：
`target: str` 目标名， 可以是玩家名或者目标选择器
`timeout: float` 获取超时时间
- 返回：
`tuple[float, float, float]` x y z 坐标三元组，如：`x, y, z = getPosXYZ("@p")`
- 报错：
`ValueError` 计分板分数获取失败
`ValueError` 此人没有分数记录

> isCmdSuccess

获取命令执行后是否成功
- 参数：
`cmd: str` MC指令
- 返回：
`bool` 命令是否执行成功