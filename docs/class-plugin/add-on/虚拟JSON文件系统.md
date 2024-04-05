# 附录：虚拟 JSON 文件系统

ToolDelta.builtins.Builtins 类 包含一个 TMPJson 类，可将 JSON 文件加载到缓存区，然后仿照文件读写的方式对缓存区的 JSON 文件进行快速地读写。在系统退出的时候 JSON 文本会被正常保存到磁盘。ToolDelta 运行时也会定期将缓存区 JSON 文件存盘。

```python
tmpjson = Builtins.TMPJson
tmpjson.loadPath(JSON 文件的路径: str, 是否一定需要文件存在: bool) # 将 JSON 文件放入缓冲区; 若文件已在缓存区，则调用该方法无效
tmpjson.read(JSON 文件的路径: str) # 读出 JSON 文件包含的信息
tmpjson.write(JSON 文件的路径: str, JSON 内容: dict) # 写入 JSON 信息 (注意：会覆盖原有的 JSON 信息)
tmpjson.unloadPath(JSON 文件的路径: str) # 将 JSON 从缓存区抽离，并写入磁盘
```