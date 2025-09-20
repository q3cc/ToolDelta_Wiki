# 插件市场 

## 如何使用插件市场？

在最新版的 ToolDelta 的控制台输入 `插件市场`或`plugin-market`, 然后按照提示操作即可

你应该会看到如下就界面：
```
ToolDelta插件市场 Official: 欢迎使用 ToolDelta 插件市场.
 1. [整合包]音乐曲目-1
 2. [整合包]新手插件包
 3. 时间同步计分板 v0.0.1 @SuperScript 类式插件
 4. 清空玩家末影箱 v0.0.5 @wling 注入式插件
 5. 前置_基本插件功能库 v0.0.11 @SuperScript 类式插件
 6. 前置_循环获取玩家坐标 v0.0.1 @ToolDelta 类式插件
 7. 控制台执行MC指令 v0.0.4 @SuperScript 类式插件
 8. 32k盒子显示 v0.0.4 @SuperScript 类式插件
 9. 全服喇叭 v0.0.4 @wling 注入式插件
 10. [前置]功能封装库-1 v0.0.3 @xingchen 类式插件
 11. 前置_大字替换 v0.0.2 @ToolDelta 类式插件
 12. 大范围fill v0.0.1 @System 类式插件
第1/5页, 输入+/-翻页
输入插件序号选中插件并查看其下载页
回车键继续上次操作, q 退出，请输入: 
```

## 为什么选择插件市场？

- **共享** ToolDelta 插件
- **便捷**的安装和使用
- 你可以在此**发布和分享**你所制作的 ToolDelta 插件

::: info

- 上传到官方的插件市场都已经过审核，不会对用户的设备和私有信息造成损害。
- 对于非官方插件市场，我们无法保证所有插件的安全性，请自行检查部分插件有无恶意行为。

:::

## 上传的插件的规范格式和要求？

允许上传的文件类型
- Python 脚本  
- 文本文件（包括 Markdown、TXT 等）

插件要求
- 插件必须放在 `plugin_market/your_plugin/` 目录下  
- 主插件文件必须命名为 `__init__.py`  

合法的插件格式示例如下：

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

上传之后，请务必同时更改 `plugin_market/market_tree.json` ,  按照其格式添加上自己的插件信息，如下：
::: details `market_tree.json` 编写说明

这是一个标准的插件详情数据文件的例子

```json
    "聊天栏菜单": { // 插件的名字，创建插件文件夹的时候也将使用这个名字
        "author": "SuperScript", // 插件的作者
        "version": "0.0.4", // 插件的版本
        "description": "所有使用到聊天栏菜单的组件的前置组件", // 插件的简介 (功能摘要)
        "limit_launcher": null, // 限制插件只能在哪种启动器框架运行，通用即 null
        "pre-plugins": {}, // 前置插件的名称与最低需求版本的键值对，都为 string
        "plugin-type": "classic", // 插件的类别, 类式插件为 classic，注入式为 injected
        "plugin-id": "ChatbarMenu" // 插件ID，可以任意起不重复的名，但是之后都不能再改动，是插件唯一识别ID
    },
```

:::

上传内容若会对用户的设备造成损害，或会盗窃用户信息的插件，**将不予通过审核。**

## 如何上传你的插件？

在 `Pull Requests` 处提交请求即可
将插件文件夹以**正确的格式**上传到 `plugin_market/` 目录下