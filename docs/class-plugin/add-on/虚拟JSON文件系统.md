# 附录: 虚拟JSON文件系统
ToolDelta.builtins.Builtins 类 包含一个 TMPJson 类, 可将JSON文件加载到缓存区, 然后仿照文件读写的方式对缓存区的JSON文件进行快速地读写. 在系统退出的时候JSON文本会被正常保存到磁盘. ToolDelta运行时也会定期将缓存区JSON文件存盘.

```python
tmpjson = Builtins.TMPJson
tmpjson.loadPath(JSON文件的路径: str, 是否一定需要文件存在: bool) # 将JSON文件放入缓冲区; 若文件已在缓存区, 则调用该方法无效
tmpjson.read(JSON文件的路径: str) # 读出JSON文件包含的信息
tmpjson.write(JSON文件的路径: str, JSON内容: dict) # 写入JSON信息(注意: 会覆盖原有的JSON信息)
tmpjson.unloadPath(JSON文件的路径: str) # 将JSON从缓存区抽离, 并写入磁盘