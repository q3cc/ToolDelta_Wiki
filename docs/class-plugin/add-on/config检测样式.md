# 附录: Config提供的键值对检测样式
- Dict 键:
    - Config.UnneccessaryKey(key): 非必须的JSON键
    - Config.Group(key1, *keys): 多选一的JSON键
    - r"%any": 任意名字的键 (有零个或多个这样的键值对, 能匹配 {"a": ..., "b": ..., ..})
- Dict 值(type):
    - Config.PInt: 正整数
    - Config.NNInt: 非负整数
    - Config.PFloat: 正浮点小数
    - Config.NNFloat: 非负浮点小数
    - list [type1, type2, ...]: 多选一的JSON值, 可以匹配列表内的任意一种类型
    - list [r"%list", type]: 列表成分都为type的列表
应用:
```python
cfg = {
    "key1": int,
    "key2": str,
    "key3": Config.PInt,
    "key4": [r"%list", str],
    "key5": [r"%list", [str, int]],
    "key6": [r"%list", {"a": Config.PInt}],
    Config.UnneccessaryKey("key7"): bool,
    Config.Group("key8", "key9"): bool
}
```
下面的这段JSON是符合上述格式的:
```JSON
{
    "key1": 6,
    "key2": "hello",
    "key3": 6,
    "key4": ["1", "2", "hello"],
    "key5": ["1", 2, "hello", 4],
    "key6": [{"a": 42}],
    "key9": true
}