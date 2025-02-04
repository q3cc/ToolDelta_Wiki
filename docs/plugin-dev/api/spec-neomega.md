# 使用 NeOmega 接入点时额外提供的 API

## 获取方法

在类式插件：
```python
from tooldelta import Plugin, plugins
from tooldelta.launch_cli import FrameNeOmgAccessPoint

@plugins.add_plugin
class Plugin1(Plugin):
    ...

    def get_neomega(self):
        if isinstance(self.frame.launcher, FrameNeOmgAccessPoint):
            return self.frame.launcher.omega
        else:
            raise ValueError("此启动框架无法使用 NeOmega API")

```

在注入式插件：
```python
from tooldelta import tooldelta

if isinstance(tooldelta.frame.launcher, FrameNeOmgAccessPoint):
    omega = tooldelta.frame.launcher.omega
else:
    raise ValueError("此启动框架无法使用 NeOmega API")
```

## 内含方法

### get_bot_basic_info
```python
def get_bot_basic_info() -> ClientMaintainedBotBasicInfo
```
- 获取机器人本身的基本信息
- 返回 (ClientMaintainedBotBasicInfo) 的属性:
    - `BotName` (str): 机器人游戏名
    - `BotRuntimeID` (int): 机器人在游戏中的 RuntimeID
    - `BotUniqueID` (str): 机器人在游戏中的 uniqueID
    - `BotUUIDStr` (str): 机器人账号的 UUID

---

### get_extend_info
```python
def get_extend_info() -> ClientMaintainedExtendInfo
```
- 返回当前游戏的信息

```python
class ClientMaintainedExtendInfo:
    CompressThreshold: int | None = None
    WorldGameMode: int | None = None
    WorldDifficulty: int | None = None
    Time: int | None = None
    DayTime: int | None = None
    TimePercent: float | None = None
    GameRules: dict[str, Any] | None = None
```

---

### get_player_by_name
```python
def get_player_by_name(name: str) -> PlayerKit | None
```
- 根据名字获取玩家数据
- 返回 (**`PlayerKit`**) 的属性:
    - `name` (str): 玩家游戏名
    - `uuid` (str): 玩家 UUID
    - `entity_unique_id` (int): 玩家 uniqueID
    - `op` (bool): 是否为操作员
    - `online` (bool): 是否在线
    - `login_time` (int): 玩家登录租赁服的时间
    - `platform_chat_id` (str): 玩家平台聊天 ID
    - `build_platform` (int): 玩家平台
    - `skin_id` (str): 玩家皮肤 ID
    - `device_id` (str): 玩家设备 ID

    - `can_build` (bool): 是否可以放置方块
    - `can_mine` (bool): 是否可以破坏方块
    - `can_doors_and_switches` (bool): 是否可以开关门和拉杆等
    - `can_open_containers` (bool): 是否可以打开容器
    - `can_attack_players` (bool): 是否可以攻击玩家
    - `can_attack_mobs` (bool): 是否可以攻击怪物
    - `can_operator_commands` (bool): 是否可以执行命令
    - `can_teleport` (bool): 是否可以传送
    - `is_invulnerable` (bool): 是否为无敌状态
    - `is_flying` (bool): 是否为飞行状态

    - `set_build_permission(allow: bool)` 设置放置方块权限
    - `set_mine_permission(allow: bool)` 设置破坏方块权限
    - `set_doors_and_switches_permission(allow: bool)` 设置开关门和拉杆等权限
    - `set_open_containers_permission(self, allow: bool)` 设置打开容器权限
    - `set_attack_players_permission(allow: bool)` 设置攻击玩家权限
    - `set_attack_mobs_permission(allow: bool)` 设置攻击怪物权限
    - `set_operator_commands_permission(allow: bool)` 设置执行命令权限
    - `set_teleports_permission(allow: bool)` 设置传送权限
    
---

### get_player_by_name
```python
def get_player_by_uuid(name: str) -> PlayerKit | None
```
- 根据玩家 UUID 获取玩家数据