# 前置插件：TPS 计算器

## 介绍

提供了获取租赁服 tps 的接口。

tps 可以反应租赁服的流畅程度，指的是 Tick Pre Second，也就是每秒内租赁服服务端运行的 tick 数，最高为 20。

## 获取方式
- 类式插件中：
    ```python
    class MyPlugin(Plugin):
        ...
        
        def __init__(self, frame):
            super().__init__(frame)
            self.ListenPreload(self.on_preload)

        def on_preload(self):
            tps_calc = self.GetPluginAPI("tps计算器")
    ```


## 接口

## 获取租赁服TPS值 {#get_tps}
```python
def get_tps() -> float
```
- 获取租赁服的 tps。