## game_utils 库

#### 获取方法
```python
from tooldelta import game_utils
```

**game_utils 库 提供了一些使得获取游戏内数据更便捷的方法。**

## 基本方法

### getTarget {#getTarget}
```python
def getTarget(target: str, timeout = 5) -> list[str]
```
获取符合目标选择器的所有玩家的玩家名列表。

- 参数：
  - **target** (str)：玩家目标选择器
  - **timeout** (int)：获取超时时间， 默认为 5 秒， 超时引发 `TimeoutError`

### getPos {#getPos}
```python
def getPos(target: str) -> dict
```
获取单个玩家的坐标相关的详细信息。

- 参数：
  - **target** (str): 玩家名 / 玩家目标选择器
  - **timeout** (float)：获取超时时间， 默认为 5 秒， 超时引发 `TimeoutError`

- 返回：坐标详细信息， 其键值如下：
  - "Position"：
    - "x" (float)：玩家 x 坐标
    - "y" (float)：玩家 y 坐标（经过修正）
    - "z" (float)：玩家 z 坐标
  - "dimension" (int)：玩家所在维度 ID
  - "yRot" (float)：玩家水平视角


- 抛出异常：
  - **ValueError**: 当目标玩家不存在时抛出该异常
  - **ValueError**: 当获取位置信息失败时抛出该异常
  - **AttributeError**: 当获取玩家 UUID 失败时抛出该异常

### getPosXYZ {#getPosXYZ}
```python
def getPosXYZ(target: str) -> tuple[float, float, float]
```
获取玩家的简略坐标值，并以坐标三元元组返回。

- 参数：
  - **target** (str): 玩家名 / 玩家目标选择器

- **返回**： (x, y, z) 坐标三元元组


### getItem {#getItem}

```python
def getItem(
    target: str,
    itemName: str,
    itemSpecialID: int = -1
) -> int
```
获取单个玩家背包内指定的物品的数量。

- 参数：
  - **target** (str)：玩家名 / 玩家目标选择器
  - **itemName** (str)：物品的 Minecraft ID， 如 "minecraft:diamond"
  - **itemSpecialID** (int)：物品的特殊值， 默认为 -1

- 返回：玩家持有的该物品的数量

### getScore {#getScore}
```python
def getScore(
    scb_name: str,
    target: str,
    timeout: float = 30
) -> int
```
获取目标项的计分板对应分数。

- 参数
  - **scb_name** (str): 计分板名
  - **target** (str): 玩家名 / 目标选择器 / 计分板项名
  - **timeout** (float): 获取超时时间，默认为 30 秒

- 返回：计分板分数

- 异常：
  - ValueError: 计分板名 / 对应计分板项不存在

### isCmdSuccess {#isCmdSuccess}
```python
def isCmdSuccess(cmd: str, timeout: float = 30) -> bool
```
发送一条 Minecraft 指令并返回其执行成功与否。

- 参数

  - **cmd** (str): Minecraft 指令

  - **timeout** (float): 获取返回的超时时间，默认为 30 秒

- 返回：命令执行是否成功

- 异常：
  - TimeoutError: 等待指令返回值超时

### take_item_out_item_frame {#take-item-out-item-frame}
```python
def take_item_out_item_frame(pos: tuple[int, int, int]) -> None
```
从物品展示框取出物品。

- 参数
  - **pos** (tuple[int, int, int])：物品展示框的坐标

---
# 原 DotCS 方法

以下方法为 适配 "点命令系统" (DotCS) 的方法

新插件已弃用。

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
