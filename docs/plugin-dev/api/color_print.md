## color_print 库

#### 获取方法
```python
from tooldelta import Print
```

**Print 类提供了几种在 ToolDelta 控制台进行格式化输出的方法。**

以下的所有方法都包含在 Print 类中， 它们都支持 Minecraft 的颜色代码。


### print_inf {#print_inf}
```python
def print_inf(text: str, **print_kwargs) -> None
```
在控制台打印普通信息并自动录入日志。

- 参数：
    - **text** (str)：输出内容
    - **print_kwargs**：传递给原版 print() 方法的关键字参数。  
    注意：若传入 `need_log = False` 则输出内容不会被录入日志。

### print_suc {#print_suc}
```python
def print_suc(text: str, **print_kwargs) -> None
```
在控制台打印`成功`信息并自动录入日志。输出字体颜色为绿色。

- 参数同上

### print_war {#print_war}
```python
def print_war(text: str, **print_kwargs) -> None
```
在控制台打印`警告`信息并自动录入日志。输出字体颜色为橙色。

- 参数同上

### print_war {#print_err}
```python
def print_err(text: str, **print_kwargs) -> None
```
在控制台打印`报错`信息并自动录入日志。输出字体颜色为红色。

- 参数同上

### print_load {#print_load}
```python
def print_err(text: str, **print_kwargs) -> None
```
在控制台打印`加载`信息并自动录入日志。输出字体颜色为色。

- 参数同上