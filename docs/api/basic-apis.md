# 框架提供的方法和接口

> 详细的接口介绍

## 前言

我们刚刚通过 `__init__` 方法来获取到了一个 `Frame` 对象。我们还用了 `game_ctrl = frame.get_game_control()` 获得了一个 `GameControl` 对象，ToolDelta 的主要接口都集中在这两个对象上。

## Frame 对象

这个对象是 ToolDelta 的主框架类，里面有和 ToolDelta 主系统数据相关的一些内容。

- **获取目前的租赁服号码** `frame.serverNumber: str`
- **获取目前的租赁服密码** `frame.serverPassword: str`
- **获取目前有效的游戏启动器框架** `frame.launcher`

::: details 示例：添加一个控制台菜单触发词

```python
frame.add_console_menu_trigger(
    triggers: list[str],
    argument_hint: str | None,
    usage: str,
    cb: Callable[[list[str]], bool | None]
)
```

**参数说明：**

- `triggers`: 触发词列表
- `argument_hint`: 参数提示，为 None 则无参数提示
- `usage`: 用途介绍
- `cb`: 触发词触发时的回调，参数是触发词参数的列表，返回 True 代表拦截触发词不让其继续触发其他菜单项，什么都不返回/返回 None 代表让其继续触发其他菜单触发词。
:::

## GameControl 提供的接口方法

> 注：此处之提供与游戏交互的最基本的方法。
> 若想调用高级功能（如获取玩家计分板分数等），请移步至 高级接口（game_utils）

#### GameContorl 的获取
在插件主类以外或者注入式插件：
```python
import tooldelta

game_ctrl = tooldelta.frame.get_game_control()
```
在类式插件：
```python
class MyPlugin(Plugin):
    def __init__(self, frame):
        super().__init__(frame)

    def method1(self):
        game_ctrl = self.game_ctrl
```

#### 基本接口方法

> game_ctrl.checkAvaliable
  - 判断是否与游戏连接，没有则直接引发ValueError

> game_ctrl.sendcmd
  - 执行MC指令，并指定是否返回指令执行结果
  - 参数：
  `cmd: str` MC指令
  `waitForResp: bool` 是否等待指令执行完成并返回执行结果，默认False
  `timeout: int` 等待超时时间秒数，超时引发TimeoutError，默认为30
  - 返回：
  `None` 若 waitForResp 为 False
  `Packet_CommandOutput` 若 waitForResp 为 True，包含指令返回的一系列信息

> game_ctrl.sendwscmd
  - 执行MC指令，但是是以 WebSocket 身份执行
  - 参数与返回同上

> game_ctrl.sendwocmd
  - 执行无返回高权限指令
  - 参数：
  `cmd: str` 指令

> game_ctrl.sendPacket
  - 以机器人身份发送MC客户端数据包至服务器
  - 参数：
  `pckID: int` 数据包数字ID
  `pck: dict` 数据包内容

> game_ctrl.say_to
  - 向玩家显示聊天栏消息
  - 参数：
  `target: str` 显示的目标（可以是目标选择器）
  `text: str` 消息

> game_ctrl.player_title
  - 向玩家显示标题栏消息
  - 参数：
  `target: str` 显示的目标（可以是目标选择器）
  `text: str` 消息

> game_ctrl.player_subtitle
  - 向玩家显示小标题栏消息，需要先显示了大标题信息
  - 参数同上

> game_ctrl.player_actionbar
  - 向玩家显示行动栏消息
  - 参数同上

