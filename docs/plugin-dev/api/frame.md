# 框架提供的方法和接口

> 详细的接口介绍


## Frame

这个对象是 ToolDelta 的主框架类，里面有和 ToolDelta 主系统数据相关的一些内容。

获取方法: 

类式插件中：
```python
class Plugin1(Plugin):
    # 在插件主类的 self 中的 frame 属性即为 ToolDelta 主框架实例
    def method(self):
        frame = self.frame
```

注入式插件中：
```python
from tooldelta.starter import frame
```

---

获取当前使用的游戏启动器框架实例
```python
>>> frame.launcher
<object FrameNeOmgAccessPoint at ????????>
```

---

添加一个控制台菜单触发词 **（注意， 不是聊天栏菜单）**
```python
def add_console_menu_trigger(
    triggers: list[str],
    argument_hint: str | None,
    usage: str,
    cb: Callable[[list[str]], None]
)
```

- 参数：  
**triggers** (list[str]): 触发词前缀列表  
**argument_hint** (str | None): 参数提示，为 None 则无参数提示  
**usage** (str): 用途介绍  
**cb** ((list[str]) -> None): 触发词触发时的回调，参数是触发词参数以空格分割的列表


## GameControl

> 注：此处之提供与游戏交互的最基本的方法。
> 若想调用高级功能（如获取玩家计分板分数等），请移步至 高级接口（game_utils）

#### GameContorl 的获取
在**插件主类以外**或者**注入式插件**：
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

---

```python
>>> game_ctrl.allplayers
['SkyblueSuper', 'FSkyBlueBot', '张哥之足球梦想', '雨阴阳']
```
获取当前实时在线玩家名列表

---

```python
>>> game_ctrl.bot_name
'FSkyBlueBot'
```
获取 ToolDelta 机器人的游戏名

---

```python
def checkAvaliable() -> None
```
- 判断是否与游戏连接，没有则直接引发ValueError

---

```python
def sendcmd(
    cmd: str,
    waitForResp: bool = False,
    timeout: int = 30
) -> Packet_CommandOutput | None
```
  - 执行MC指令，并指定是否返回指令执行结果
  - 参数：  
  **cmd** (str)： Minecraft 指令  
  **waitForResp** (bool)： 是否等待指令执行完成并返回执行结果，默认False  
  **timeout** (int)： 等待超时时间秒数，超时引发TimeoutError，默认为30
  - 返回：
  若 waitForResp 为 False：返回 `None`   
  若 waitForResp 为 True： 返回 `Packet_CommandOutput` 实例， 包含指令返回的一系列信息

---

```python
def sendwscmd(
    cmd: str,
    waitForResp: bool = False,
    timeout: int = 30
) -> Packet_CommandOutput | None
```
  - 以 WebSocket 身份执行 Minecraft 指令
  - 参数与返回同上

---

```python
def sendwocmd(cmd: str) -> None
```
  - 执行无返回高权限指令
  - 参数：  
  **cmd** (str)： 指令

---

```python
def sendPacket(packetID: int, packet: dict) -> None
```
  - 以机器人身份发送 MC 客户端数据包至服务器
  - 参数：  
  **packetID** (int)： 数据包数字ID  
  **packet** (dict)： 数据包内容

---

```python
def say_to(target: str, text: str) -> None
```
  - 向玩家显示聊天栏消息
  - 参数：  
  **target** (str)： 显示的目标（可以是目标选择器）  
  **text** (str)： 消息

---

```python
def player_title(target: str, text: str) -> None
```
  - 向玩家显示标题栏消息
  - 参数：  
  **target** (str)： 显示的目标（可以是目标选择器）  
  **text** (str)： 消息

---

```python
def player_subtitle(target: str, text: str) -> None
```
  - 向玩家显示小标题栏消息，需要先显示了大标题信息
  - 参数：  
  **target** (str)： 显示的目标（可以是目标选择器）  
  **text** (str)： 消息

---

```python
def player_actionbar(target: str, text: str) -> None
```
  - 向玩家显示行动栏消息
  - 参数：  
  **target** (str)： 显示的目标（可以是目标选择器）  
  **text** (str)： 消息
