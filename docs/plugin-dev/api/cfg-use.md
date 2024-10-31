# 附录：便捷地读取插件配置文件

> 使用此方法优雅方便地读取用户的插件配置文件！

如果你的插件想便捷的读取用户的插件配置文件和检测配置文件的完整性和合法性， 你可以使用 tooldelta.Config 内置配置文件库的 Cfg 类中的一些方法。

- `get_plugin_config_and_version`
    获取配置文件内容与版本， 同时检测配置文件合法性。
    - 参数：
        - `pluginName (str)`： 插件名字, 配置文件的名称会以此名作为文件名
        - `standardType (Any)`： 作为模板的标准样式, [下面](1)会进行详细讲解。 若填{}则不会对插件配置文件做任何检查。
        - `default (Any)`： 默认配置文件内容。通常为 dict。
        - `default_vers (tuple[int, int, int])`： 默认配置文件的默认版本，像这样：(0, 0, 1)
    - 返回：
        - 配置文件内容 `(Any)`, 配置文件版本 `(tuple[int, int, int])`
    - 引发异常：
        - 配置文件合法性检测失败(值的类型和模板类型不同引发)： `Config.ConfigError`
        - 提示： 若是在类式插件的插件主类初始化时（即`__init__`方法） 时使用， 则不需要处理异常， 系统会自动向用户提示配置文件不正确和其详细内容。

 - `check_auto`
    检查 dict 内的内容是否和模版标准样式相同。
    - 参数:
        - `standard (Any)`： 作为模板的标准样式, 下面会进行详细讲解。
        - `val (Any)`： 传入待检测的值。
    - 引发异常：
        - 配置文件合法性检测失败(值的类型和模板类型不同引发)： `Config.ConfigError`

## 配置文件模版标准样式
配置文件的模版标准样式就是**键值对的值部分改成了类型**， 以便检测**键值结构相同**的配置文件， 例如这样，
这是一个示范配置文件的 Python dict 形式（它是能通过检测的）：
```
config = {
    "name": "Stelle",
    "age": 1,
    "is_human": True
}
```
这是这个配置文件的模版样式：
```
config_std = {
    "name": str,
    "age": Cfg.PInt,
    "is_human": bool
}
```
我们通过 `config_std` 来指定了配置文件中 "name" 值只能是字符串，"age" 值则只能是正整数(`Cfg.PInt`, `tooldelta.cfg` 里内置的一种模版类型)，"is_human" 值则只能是布尔值。
除了示例里的 `Config.PInt`, 实际上能指定的值类型有以下几种：
- `int`: 整数
- `str`: 字符串
- `bool`: 布尔值
- `None`: null值
- `dict`: 字典，就是json对象。可以多层嵌套
- `tuple(type1, type2, dict, ...)`: 可以是元组内的类型里的任意一种`类型`或者json对象
- `Config.PInt`: 正整数
- `Config.NNInt`: 非负整数
- `Config.PFloat`: 正浮点小数
- `Config.NNFloat`: 非负浮点小数
- `Config.Number`: 任何数
- `Config.PNumber`: 正数(包括整数和浮点数)
- `Config.NNNumber`: 非负数
- `Config.JsonList(types, len_limit = -1)`: 表示一个列表。`types`指定了列表各项的`类型`，`lem_limit`指定了列表的固定长度，-1为不限制长度。
- `Config.AnyKeyValue(val_type)`: 表示一个可以是任意名称的键名, `val_type`指定了其值的类型

::: details 混合使用所有标准检测类型的案例
```python
default_cfg = {
    "多类型": "Hi!",
    "只能是正数": 2.345,
    "只能是非负整数": 0,
    "列表": [
        1, 2, 3
    ],
    "多类型列表": [
        1, 2, 3,
        "Hi", "World"
    ],
    "混合列表": [
        4, 5,
        {"Hi", "World"}
    ],
    "嵌套json": {
        "任意键测试": {
            "apple": 2,
            "banana": 1.5,
            "cherries": 4
        },
        "正常值": "Hi China"
    }
}
std_cfg_model = {
    "多类型": (str, int)
    "只能是正数": Config.PInt,
    "只能是非负整数": Config.NNNumber,
    "列表": Config.JsonList(int),
    "多类型列表": Config.JsonList((int, str)),
    "混合列表": Config.JsonList((int, {"Hi": str})),
    "嵌套json": {
        "任意键测试": Config.AnyKeyValue(Config.PNumber),
        "正常值": str
    }
}

Config.check_auto(std_cfg_model, default_cfg)
# 有报错会在此方法内引发, 通常是通俗易懂的中文提示
# 以上的示例模板检测不会产生问题。
```
:::

如果你实在懒得写`配置文件标准模版检查样式`， 使用 `std_cfg_model = Config.auto_to_std(default_cfg)` 也可以，但是智能应用于简单的配置文件类型（不支持任意键名、非必要键值对等）