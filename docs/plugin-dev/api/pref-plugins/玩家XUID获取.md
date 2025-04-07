# 前置插件：玩家 XUID 获取

## 介绍

提供了可以获取在线/离线（需要曾经在线过）玩家 XUID 的接口。

XUID 不会随着玩家名的改变而改变。

## 获取方式
- 类式插件：
    ```python
    class MyPlugin(Plugin):
        ...
        
        def __init__(self, frame):
            super().__init__(frame)
            self.ListenPreload(self.on_preload)

        def on_preload(self):
            xuid_getter = self.GetPluginAPI("XUID获取")
    ```

## 接口

## 通过玩家名获取XUID {#get_xuid_by_name}
```python
def get_xuid_by_name(playername: str, allow_offline=False) -> str
```
- 通过玩家名获取 XUID。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **playername** | str | 需要获取 XUID 的玩家名。 |
    | **allow_offline** | bool | 是否允许获取离线玩家的 XUID。默认为 False。如果需要获取离线玩家，那么此玩家应当曾经在线过。 |

- 返回：
    - **str**: 玩家 XUID。如果无法获取则引发 `ValueError`。

## 通过XUID获取玩家名 {#get_name_by_xuid}
```python
def get_name_by_xuid(xuid: str, allow_offline=False) -> str
```
- 通过 XUID 获取玩家名。

- 参数：  
    | 参数名 | 类型 | 说明 |
    | --- | --- | --- |
    | **xuid** | str | 需要获取玩家名的 XUID。 |
    | **allow_offline** | bool | 是否允许通过离线玩家的 XUID 获取玩家名。默认为 False。如果需要获取离线玩家，那么此玩家应当曾经在线过。 |
