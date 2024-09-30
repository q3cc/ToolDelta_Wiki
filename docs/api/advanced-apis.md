# tooldelta.game_utils

游戏交互实用方法

## _def_ `getTarget(sth, timeout=5)` {#getTarget}

- **说明：** 获取符合目标选择器实体的列表

- **参数**

  - `sth` (str): 目标选择器

  - `timeout` (int): 超时时间，默认为 5 秒

- **返回**

  - list

- **异常**

  - ValueError: 指令返回超时，或者无法获取目标

## _def_ `getPos(target, timeout=5)` {#getPos}

- **说明：** 获取目标玩家的详细位置信息

- **参数**

  - `target` (str)

  - `timeout` (float): 超时时间（秒）。默认为 5 秒

  - `targetNameToGet`: 目标玩家的名称

- **返回**

  - dict

- **异常**

  - ValueError: 当目标玩家不存在时抛出该异常

  - ValueError: 当获取位置信息失败时抛出该异常

  - AttributeError: 当获取玩家 UUID 失败时抛出该异常

## _def_ `getItem(target, itemName, itemSpecialID=-1)` {#getItem}

- **说明：** 获取玩家背包内指定的物品的数量

- **参数**

  - `target` (str)

  - `itemName` (str): 物品 ID

  - `itemSpecialID` (int): 物品特殊值，默认值 -1

  - `targetName` (str): 玩家选择器 / 玩家名

- **返回**

  - int

## _def_ `getPosXYZ(player, timeout=30)` {#getPosXYZ}

- **说明：** 获取玩家的简略坐标值，并以坐标三元元组返回

- **参数**

  - `player` (str): 玩家名

  - `timeout` (int): 最长超时时间

- **返回**

  - tuple[float, float, float]: tuple[float, float, float]

## _def_ `getMultiScore(scoreboardNameToGet, targetNameToGet)` {#getMultiScore}

- **说明：** 获取单个或多个计分板分数项

- **参数**

  - `scoreboardNameToGet` (str): 计分板名

  - `targetNameToGet` (str): 获取分数的对象/目标选择器

- **返回**

  - int | dict: 分数：int

- **异常**

  - ValueError: 无法获取分数

## _def_ `getScore(scb_name, target, timeout=30)` {#getScore}

- **说明：** 获取计分板对应分数

- **参数**

  - `scb_name` (str): 计分板名

  - `target` (str): 目标选择器

  - `timeout` (float): 超时时间

- **返回**

  - int: 计分板分数

- **异常**

  - ValueError: 计分板错误

## _def_ `isCmdSuccess(cmd, timeout=30)` {#isCmdSuccess}

- **说明：** 获取命令执行成功与否的状态

- **参数**

  - `cmd` (str): MC 指令

  - `timeout` (float): 超时时间

- **返回**

  - untyped: 命令执行是否成功：bool

## _def_ `take_item_out_item_frame(pos)` {#take-item-out-item-frame}

- **说明：** 从物品展示框取出物品

- **参数**

  - `pos` (tuple[int, int, int])

  - `position`: 物品展示框的坐标 (x, y, z)

- **返回**

  - None: None

## _def_ `sendcmd(cmd, waitForResp=False, timeout=30)` {#sendcmd}

- **说明**

  发送命令到游戏控制器，并可选择是否等待响应

  如果 waitForResp 为 False，则返回 None，否则返回 Packet_CommandOutput 对象

- **参数**

  - `cmd` (str): 要发送的命令

  - `waitForResp` (bool): 是否等待响应，默认为 False

  - `timeout` (int): 等待响应的超时时间（秒）,默认为 30

- **返回**

  - None | Packet_CommandOutput

## _def_ `sendwscmd(cmd, waitForResp=False, timeout=30)` {#sendwscmd}

- **说明：** 发送 WSCMD 命令到游戏控制器

- **参数**

  - `cmd` (str): 要发送的 WSCMD 命令

  - `waitForResp` (bool): 是否等待响应 默认为 False

  - `timeout` (float): 超时时间（秒）默认为 30

- **返回**

  - Packet_CommandOutput | None

## _def_ `sendwocmd(cmd)` {#sendwocmd}

- **说明：** 发送 WO 命令到游戏控制器

- **参数**

  - `cmd` (str): 要发送的 WO 命令

- **返回**

  - None

## _def_ `sendPacket(pktID, pkt)` {#sendPacket}

- **说明：** 发送数据包给游戏控制器

- **参数**

  - `pktID` (int): 数据包 ID

  - `pkt` (dict): 数据包内容

- **返回**

  - None

## _def_ `rawText(playername, text)` {#rawText}

- **说明：** 向指定玩家发送原始文本消息

- **参数**

  - `playername` (str): 玩家名称

  - `text` (str): 要发送的文本

- **返回**

  - None

## _def_ `tellrawText(playername, title=None, text="")` {#tellrawText}

- **说明：** 向指定玩家发送 tellraw 消息

- **参数**

  - `playername` (str): 玩家名称

  - `title` (str | None): 标题文本（可选）

  - `text` (str): 消息文本

- **返回**

  - None

## _def_ `get_all_player()` {#get-all-player}

- **说明：** 获取所有玩家列表

- **参数**

  empty

- **返回**

  - list

## _def_ `is_op(playername)` {#is-op}

- **说明：** 判断玩家是否为 OP

- **参数**

  - `playername` (str): 玩家名称

- **返回**

  - bool

## _def_ `get_robotname()` {#get-robotname}

- **说明：** 获取机器人名称。

- **参数**

  empty

- **返回**

  - str

## _def_ `countdown(delay, msg=None)` {#countdown}

- **说明：** 倒计时函数

- **参数**

  - `delay` (float): 延迟时间，可以是整数或浮点数

  - `msg` (str | None): 倒计时消息，可选参数，默认为"Countdown"

- **返回**

  - None

## _def_ `getBlockTile(x, y, z)` {#getBlockTile}

- **说明：** 获取指定坐标的方块的 ID

- **参数**

  - `x` (int): X 坐标

  - `y` (int): Y 坐标

  - `z` (int): Z 坐标

- **返回**

  - str

## _def_ `getTickingAreaList()` {#getTickingAreaList}

- **说明：** 获取 tickingarea 列表

- **参数**

  empty

- **返回**

  - dict

- **异常**

  - AttributeError: 获取 tickingarea 列表失败
