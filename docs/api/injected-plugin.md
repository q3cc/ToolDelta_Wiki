# 注入式插件 API

> 详细的接口参考

## _def_ player_message

**载入处理玩家消息**

- 参数

  - priority (int, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ player_prejoin

**载入处理玩家加入前事件**

- 参数

  - priority (int | None, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ player_join

**载入处理玩家加入事件**

- 参数

  - priority (int | None, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ player_left

**载入处理玩家离开事件**

- 参数

  - priority (int | None, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ player_death

**载入处理玩家死亡事件**

- 参数

  - priority (int | None, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ init

**载入机器人进入游戏后初始化插件**

- 参数

  - priority (int | None, optional): 插件优先级

- 返回
  - Callable: 插件处理函数

## _def_ repeat

**载入重复任务**

- 参数

  - retime (int, optional): 重复时间

- 返回
  - Callable: 插件处理函数

## _def_ repeat_task

**执行重复任务（执行完等待一段时间再执行）**

- 参数
  - func (Callable): 定时执行的函数
  - time (int | float): 重复时间

## _async def_ execute_asyncio_task

**执行异步任务**

- 参数
  - func_dict (dict): 函数字典

## _async def_ execute_init

**执行初始化插件函数**

## _async def_ run_repeat

**执行重复任务**

## _async def_ safe_jump

**安全跳出重复任务**

## _async def_ execute_repeat

**执行重复任务**

## _async def_ execute_player_message

**执行玩家消息处理函数**

- 参数
  - playername (str): 玩家名字
  - message (str): 消息

## _async def_ execute_death_message

**执行玩家死亡处理函数**

- 参数
  - playername (str): 玩家名字
  - killer (str | None): 凶手
  - message (str): 消息

## _async def_ execute_player_join

**执行玩家加入处理函数**

- 参数
  - playername (str): 玩家名字

## _async def_ execute_player_prejoin

**执行玩家加入前处理函数**

- 参数
  - playername (str): 玩家名字

## _async def_ execute_player_left

**执行玩家离开处理函数**

- 参数
  - playername (str): 玩家名字

## _def_ create_plugin_metadata

**创建插件元数据**

- 参数

  - metadata_dict (dict): 插件元数据字典

- 返回
  - [PluginMetadata](#class-PluginMetadata): 插件元数据

## _def_ load_plugin_file

**加载插件文件**

- 参数

  - file (str): 插件文件名

- 返回
  - [PluginMetadata](#class-PluginMetadata): 插件元数据

## _def_ load_plugin

**加载插件**

- 参数
  - plugin_grp (PluginGroup): 插件组

## _class_ player_name

**玩家名字**

- playername: str

## _class_ player_message_info

**玩家消息信息**

- message: str

## _class_ player_death_info

**玩家死亡信息**

- message: str
- killer: str | None

## _class_ PluginMetadata {#class-PluginMetadata}

**插件元数据**

- `name`: 插件名称
- `author`: 插件作者
- `description`: 插件简介
- `version`: 插件版本
- `usage`: 插件用法
- `homepage`: 插件主页

## _def_ `check_avaliable(sth)` {#check-avaliable}

**检查给定的 GameCtrl 对象是否可用**

- 参数

  - `sth` (GameCtrl): 要检查的 GameCtrl 对象

- 返回
  - AttributeError | None

## _def_ `set_frame(my_frame)` {#set-frame}

**全局初始化框架**

- 参数

  - `my_frame` (Frame): 要设置的框架对象

- 返回
  - None

## _def_ `sendcmd(cmd, waitForResp=False, timeout=30)` {#sendcmd}

**发送命令到游戏控制器，并可选择是否等待响应**

> 如果 waitForResp 为 False，则返回 None，否则返回 Packet_CommandOutput 对象

- 参数

  - `cmd` (str): 要发送的命令
  - `waitForResp` (bool): 是否等待响应，默认为 False
  - `timeout` (int): 等待响应的超时时间（秒）,默认为 30

- 返回
  - None | Packet_CommandOutput

## _def_ `sendwscmd(cmd, waitForResp=False, timeout=30)` {#sendwscmd}

**发送 WSCMD 命令到游戏控制器**

- 参数

  - `cmd` (str): 要发送的 WSCMD 命令
  - `waitForResp` (bool): 是否等待响应 默认为 False
  - `timeout` (int | float): 超时时间（秒）默认为 30

- 返回
  - Packet_CommandOutput

## _def_ `sendwocmd(cmd)` {#sendwocmd}

**发送 WO 命令到游戏控制器**

- 参数

  - `cmd` (str): 要发送的 WO 命令

- 返回
  - None

## _def_ `sendPacket(pktID, pkt)` {#sendPacket}

**发送数据包给游戏控制器**

- 参数

  - `pktID` (int): 数据包 ID
  - `pkt` (str): 数据包内容

- 返回
  - None

## _def_ `rawText(playername, text)` {#rawText}

**向指定玩家发送原始文本消息**

- 参数

  - `playername` (str): 玩家名称
  - `text` (str): 要发送的文本

- 返回
  - None

## _def_ `tellrawText(playername, title=None, text="")` {#tellrawText}

**向指定玩家发送 tellraw 消息**

- 参数

  - `playername` (str): 玩家名称
  - `title` (str | None): 标题文本（可选）
  - `text` (str): 消息文本

- 返回
  - None

## _def_ `get_all_player()` {#get-all-player}

**获取所有玩家列表**

- 返回

  - list

## _def_ `is_op(playername)` {#is-op}

**判断玩家是否为 OP**

- 参数

  - `playername` (str): 玩家名称

- 返回
  - bool | None

## _def_ `getTarget(sth, timeout=5)` {#getTarget}

**获取符合目标选择器实体的列表**

- 参数

  - `sth` (str): 目标选择器
  - `timeout` (bool | int): 超时时间，默认为 5 秒

- 返回
  - list

## _def_ `find_key_from_value(dic, val)` {#find-key-from-value}

**从字典中根据值查找对应的键**

- 参数

  - `dic` (dict): 目标字典
  - `val` (Any): 目标值

- 返回
  - Any | None

## _def_ `get_robotname()` {#get-robotname}

**获取机器人名称**

- 返回
  - str | None

## _def_ `getPos(targetNameToGet, timeout=5)` {#getPos}

**获取目标玩家的位置信息**

- 参数

  - `targetNameToGet` (str): 目标玩家的名称
  - `timeout` (float | int): 超时时间（秒）。默认为 5 秒

- 返回

  - (dict)

- **异常**
  - `ValueError`: 当目标玩家不存在时抛出该异常
  - `ValueError`: 当获取位置信息失败时抛出该异常
  - `AttributeError`: 当获取玩家 UUID 失败时抛出该异常

## _def_ `countdown(delay, msg=None)` {#countdown}

**倒计时函数**

- 参数

  - `delay` (int | float): 延迟时间，可以是整数或浮点数
  - `msg` (str | None): 倒计时消息，可选参数，默认为 "Countdown"

- 返回
  - None

## _def_ `getBlockTile(x, y, z)` {#getBlockTile}

**获取指定坐标的方块的 ID**

- 参数

  - `x` (int): X 坐标
  - `y` (int): Y 坐标
  - `z` (int): Z 坐标

- 返回
  - (str)

## _def_ `getTickingAreaList()` {#getTickingAreaList}

**获取 tickingarea 列表**

- 返回

  - dict | AttributeError

- **异常**
  - `AttributeError`: 获取 tickingarea 列表失败
