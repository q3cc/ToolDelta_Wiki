# 附录：GameControl 提供的方法

::: warn

以下中文参数并非实际参数，仅作为参考

:::

```python
game_ctrl:
    .say_to(玩家选择器/玩家名: str, 消息: str) -> None: 向玩家发送Tellraw消息
    .sendcmd(指令, 是否获取返回值: bool = False, 超时时间(秒) = 30)
        -> str(获取返回值=True时): str为指令的UUID
        -> Packet_CommandOutput:(获取返回值=False时):
            Packet_CommandOutput
                .CommandOrigin: SubPacket_CmdOrigin
                .OutputType: int
                .SuccessCount: int
                .OutputMessages: list[SubPacket_CmdOutputMsg]
                .as_dict() -> dict: 将返回值变成dict处理
        以玩家身份发送MC指令
    .sendwscmd(指令, 是否获取返回值: bool = False, 超时时间(秒) = 30) -> 同上,
        以WebSocket身份发送MC指令
    .sendfbcmd(指令: str) -> None: 发送FB指令
    .sendwocmd(指令: str) -> None: 发送无返回指令
    .sendPacket(数据包ID: int, 数据包: dict) -> None: 发送数据包
    .allplayers -> list[str]: 玩家列表
    .bot_name -> str: 当前机器人名字
    .players_uuid -> dict[str, str]: 玩家名对应的UUID, {"<玩家名>":"<UUID>"}
    .player_title(目标选择器/玩家名: str, t显信息: str) -> None:对玩家T显
    .player_subtitle(目标选择器/玩家名: str, t显信息: str) -> None:对玩家T显
    .player_actionbar(目标选择器/玩家名: str, t显信息: str) -> None:对玩家T显
```