# 前置插件：TPS 计算器

## 介绍

提供了获取租赁服 tps 的接口。

## 获取方式
```python
from tooldelta import plugins

tps_calc = plugins.get_plugin_api("tps计算器")
```


## 接口

## 获取租赁服TPS值 {#get_tps}
```python
def get_tps() -> float
```
- 获取租赁服的 tps。