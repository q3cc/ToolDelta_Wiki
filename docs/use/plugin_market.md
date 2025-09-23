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
- 插件必须放在 `your_plugin_name/` 目录下  
- 主插件文件必须命名为 `__init__.py`  
- 不需要修改其他地方 如 `market_tree.json`，工作流会自动更新这些文件。

合法的插件格式示例如下：

```
your_plugin_name/
    __init__.py
    module1.py
    module2.py
    datas.json
```

为标明作者等信息，请在你的插件主类下重新定义一些标明插件信息的变量，例如：

```
@plugins.add_plugin
class NewPlugin(Plugin):
    name = "your_plugins_name"
    author = "your_name"
    version = (int, int, int) # e.g. (0, 0, 1)
```

你需要在你的插件文件夹下创建一个 `datas.json`：  

这是一个标准的 `datas.json` 的例子：  

```json
{
  "plugin-id": "snowmenu",
  "author": "SuperScript",
  "version": "0.0.6",
  "description": "贴合租赁服原汁原味的雪球菜单！ 可以自定义雪球菜单内容， 同时也是一个API插件.\n§f使用前请先传送到指令区后输入命令§b.snowmenu-init§f初始化雪球菜单命令方块！\n在配置文件内向雪球菜单添加内容。\n0.0.4: 源码内内置API文档",
  "plugin-type": "classic",
  "pre-plugins": {
    "聊天栏菜单": "0.0.1",
    "基本插件功能库": "0.0.7",
    "前置-世界交互": "0.0.2"
  }
}
```
- "plugin-id" 值: 字符串, 插件英文ID(是不是英文ID都行, 但是以后不能再更改, 是插件特殊标识)
- "author" 值：字符串， 作者名
- "plugin-type" 值：
    - 如果是 ToolDelta 组合式插件: "classic"
- "description" 值：插件的简介(功能摘要)
- "pre-plugins" 值：前置插件的ID与最低需求版本的键值对, 都为string, 没有前置插件则为 `{}`， 插件ID可在`plugin_ids_map.json`内查找
- "version" 值：插件版本字符串(更新后别人使用插件市场下载你的插件会提示有新版本)
  
::: warning 警告
上传的内容若会对用户设备造成损害，或窃取用户信息的插件，将不予通过审核。
:::

## 如何上传你的插件？

你需要通过 **Pull Request (PR)** 的方式将插件提交到插件市场。完整步骤如下：

### 1. Fork 仓库
打开 [PluginMarket 仓库](https://github.com/ToolDelta-Basic/PluginMarket)，点击右上角的 **Fork** 按钮，将仓库复制到你的账号下。

### 2. Clone 到本地
将你 Fork 的仓库克隆到本地：
```bash
git clone https://github.com/你的用户名/PluginMarket.git
cd PluginMarket
```
### 3. 放入插件文件夹
在本地仓库中，将你的插件文件夹（以 **正确的格式** 命名，例如 `your_plugin_name/`）放入仓库根目录。

> 注意：插件文件夹结构必须符合要求，例如包含 `__init__.py` 和 `datas.json`（[字段含义要求](#上传的插件的规范格式和要求)）。

### 4. 提交修改并推送到远程仓库
```bash
git add .
git commit -m "Add plugin: your_plugin_name"
git push origin main
```

### 5. 发起 Pull Request
回到 GitHub 上你 Fork 的仓库页面，点击 **Compare & pull request**，然后将你的修改提交到 [官方 PluginMarket 仓库的 Pull Requests](https://github.com/ToolDelta-Basic/PluginMarket/pulls)。

### 6. 等待审核
管理员会审核你的 PR，如果符合规范，就会合并到插件市场。