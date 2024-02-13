# 附录: 虚拟JSON文件系统
ToolDelta.builtins.Builtins 类 包含一个 TMPJson 类, 可将json文件加载到缓存区, 然后仿照文件读写的方式对缓存区的json文件进行快速地读写. 在系统退出的时候json文本会被正常保存到磁盘. ToolDelta运行时也会定期将缓存区json文件存盘.

```python
tmpjson = Builtins.TMPJson
tmpjson.loadPath(json文件的路径: str, 是否一定需要文件存在: bool) # 将json文件放入缓冲区; 若文件已在缓存区, 则调用该方法无效
tmpjson.read(json文件的路径: str) # 读出json文件包含的信息
tmpjson.write(json文件的路径: str, json内容: dict) # 写入json信息(注意: 会覆盖原有的json信息)
tmpjson.unloadPath(json文件的路径: str) # 将json从缓存区抽离, 并写入磁盘