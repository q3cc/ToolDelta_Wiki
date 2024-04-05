# 插件市场 PluginMarket Official

## 如何使用插件市场？

在最新版的 ToolDelta 的控制台输入 `插件市场`或`plugin-market`, 然后按照提示操作即可

## 为什么选择插件市场？

- 共享 ToolDelta 插件
- 便捷的安装和使用
- 你可以在此发布和分享你所制作的 ToolDelta 插件

::: info

我们无法保证所有插件的安全性，请自行检查部分插件有无恶意行为。

:::

## 上传的插件的规范格式和要求？

允许上传的文件类型：Python 脚本，文本文件 (包括 Markdown, TXT file 等)
插件需要放在 `plugin_market/your_plugin/` 目录下，主插件文件需要以 `__init__.py` 命名
合法的插件格式像这样：

```
plugin_market/
    your_plugin_name_format/
        __init__.py
        module1.py
        module2.py
```

为标明作者等信息，请在你的插件主类下重新定义一些标明插件信息的变量，例如：

```
@plugins.add_plugin
class NewPlugin(Plugin):
    name = "your_plugins_name"
    author = "your_name"
    version = (int, int, int) # e.g. (0, 0, 1)
```

上传之后，请务必同时更改 `plugin_market/market_tree.json` ,  按照其格式添加上自己的插件信息。
::: details `market_tree.json` 更改说明

这是一个标准的插件详情的例子

```json
    "聊天栏菜单": { // 插件的名字，创建插件文件夹的时候也将使用这个名字
        "author": "SuperScript", // 插件的作者
        "version": "0.0.4", // 插件的版本
        "description": "所有使用到聊天栏菜单的组件的前置组件", // 插件的简介 (功能摘要)
        "limit_launcher": null, // 限制插件只能在哪种启动器框架运行，通用即 null
        "pre-plugins": {}, // 前置插件的名称与最低需求版本的键值对，都为 string
        "plugin-type": "classic"
    },
```

:::

上传内容若会对用户的设备造成损害，或会盗窃用户信息的插件，**将不予通过审核。**

## 如何上传你的插件？

在 `Pull Requests` 处提交请求即可
将插件文件夹以**正确的格式**上传到 `plugin_market/` 目录下