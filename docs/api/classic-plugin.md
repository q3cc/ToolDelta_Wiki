# 类式插件 API

> 详细的接口参考

## _class_ Plugin

**插件信息主类**

- `name`: 插件名称
- `author`: 插件作者
- `description`: 插件简介
- `version`: 插件版本

### _def_ data_path()

**获取数据路径**

- 参数

  - self: 自身

- 返回
  - (str): 插件数据文件路径

## _def_ read_plugins()

**读取插件**

- 参数
  - plugin_grp (PluginGroup): 插件组

## _def_ load_plugin()

**加载插件**

- 参数

  - plugin_dirname (str): 插件目录名
  - hot_load (bool, optional): 是否热加载

- 返回

  - Union[None, Plugin]: 插件实例

- **异常**
  - `ValueError`: 插件组未初始化读取
  - `ValueError`: 插件组未绑定框架
  - `ValueError`: 插件主类需要作者名
  - `ValueError`: 插件主类需要作者名
  - `NotValidPluginError`: 插件 不合法
  - `SystemExit`: 插件名字不合法
  - `SystemExit`: 插件配置文件报错
  - `SystemExit`: 插件读取数据失败