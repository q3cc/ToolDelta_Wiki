# ToolDelta - 用户操作手册

## ToolDelta 空间站漫游指南

[[toc]]

::: info
如果您需要本地使用 ToolDelta， 可以注册并购买 [NV1 验证服务](https://nv1.nethard.pro) 用于 ToolDelta 的机器人 token。  
如果您需要便捷的 ToolDelta 云端面板，我们提供了 ToolDelta Panel 云服面板服务，使得您能以较低的价格在云端使用 ToolDelta。  
详见我们的 [群聊](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=XGyPWC3k0-t0nZHGA2d0jzO7b9ogcI8N&authKey=zLTjnagIiquztxwxhfSdnT7sCTJY3iGT6Hgr5fJcU4heg98oyrhoNHCozMVYIbON&noverify=0&group_code=1030755163)，其提供了一些第二/第三方的 ToolDelta 面板供应商地址。  
  
如果您确实拥有验证服务，那么您可以继续观看以下教程。
:::

### [点此](/use/temp_learn_use) 查看云端 ToolDelta 使用教程

## 下载 ToolDelta

| [Windows 用户点我](https://github.tooldelta.top/https://github.com/ToolDelta-Basic/ToolDelta/releases/latest/download/ToolDelta-windows.exe) | [Linux 用户点我](https://github.tooldelta.top/https://github.com/ToolDelta-Basic/ToolDelta/releases/latest/download/ToolDelta-linux) |
| ------ | ------ |

安卓手机用户请使用 Termux 运行这段命令：

```bash
curl -sSL https://github.tooldelta.top/https://raw.githubusercontent.com/ToolDelta/ToolDelta/main/install.sh | bash
```

::: details 高级用户（使用Docker）

**使用已打包的 Docker 镜像**

运行命令：

```bash
sudo docker pull crpi-6pmrt6su7uwffyo4.cn-shanghai.personal.cr.aliyuncs.com/tooldelta/tooldelta:latest
```

如果您需要将 ToolDelta 运行在 MCSM 中，在 应用实例设置>容器化 中选择镜像名 tooldelta:latest 即可。

**手动打包 Docker 镜像**

先拉取整个项目：

```bash
git clone https://github.com/ToolDelta-Basic/ToolDelta.git
```

在项目目录下运行命令：

```bash
docker build -t tooldelta .
```

:::

## ToolDelta，启动！

Windows: 双击所获得的 exe 文件即可。

::: warning
以下的部分教程由于 ToolDelta 更新，未能及时更改，请以实际情况为准。
:::


将会出现类似如下界面：
```txt{7}                             
       信息  请选择启动器启动模式 (之后可在 ToolDelta 启动配置更改):            
       信息   1 - NeOmega 框架 (NeOmega 模式)                                   
       信息   2 - NeOmega 框架 (NeOmega 连接模式，需要先启动对应的 neOmega      
             接入点)                                                            
       信息   3 - NeOmega 框架 (NeOmega 并行模式，同时运行NeOmega和ToolDelta)   
       信息   4 - Eulogist 框架 (赞颂者和ToolDelta并行使用)                     
       信息   5 - FateArk 框架 [推荐]                                           
       信息   6 - FateArk 远程框架                                              
       信息   7 - NEMCLanGame 框架                                              
21:23  输入  请选择：
```
如果您不很熟悉 ToolDelta，请选择 5 (输入 5 然后回车)。

```
[05:55]  输入  请输入租赁服号：# [!code focus]
```
这时候输入**租赁服号**，回车键之后再输入**密码**(**不会回显**，没有请直接回车)，输入成功一次以后就会自动配置了。

接下来出现的是选择界面：
```txt{4}
15:12  信息  选择 ToolDelta 机器人账号 使用的验证服务器：
15:12  信息   1 - FastBuilder 官方验证服务器 ✘不再可用
15:12  信息   2 - 咕咕酱 FB验证服务器 ✘不再可用
15:12  信息   3 - NetHard 验证服务器 ✔可用
15:12  信息   4 - 手动输入
[05:58]  信息  NOTE: 使用的机器人账号是在哪里获取的就选择哪一个验证服务器，不能混用
[05:58]  输入  请选择：
```
请注意，ToolDelta 需要使用**机器人账号**登录租赁服，所以你在这之前可能需要找到任意一个**验证服务器**注册 (或购买) 账号。
这里使用的是 **Nethard 的用户中心** [点我前往用户中心→](https://nv1.nethard.pro)

接下来，如果你不想手动获取 Token， 照着提示做，输入账号密码即可（账号密码仅用于获取Token）。

之后 ToolDelta 会下载一些运行所需要的文件，等待下载即可。下载过程中若出现了问题，请重新运行 ToolDelta。
如果数次下载都出现了问题，请 [点击这里提交 Issue](https://github.com/ToolDelta-Basic/ToolDelta/issues)

因为你目前还没有安装任何插件，所以会出现这么一行输出：
```
[15:06]  成功  成功载入 0 个类式插件插件```
```
没关系！你以后可以通过 **插件市场** 或者自己下载插件来安装更多的插件功能。
之后等待机器人进入服务器，直到出现类似这样的输出：

```
[06:07]  成功  初始化完成，在线玩家：XxxxxX, 机器人 ID: XxxxxX
[06:07]  成功  在控制台输入 help / ? 可查看控制台命令
[06:07]  成功  接入点已就绪！
```
恭喜你，你的机器人成功进服并运行起来了！现在，你可以在控制台输入 `help` 看看你有什么可用的命令提示 (鉴于你还没有安装聊天栏菜单相关的插件，所以在**游戏**里输入 `.help`什么都不会发生)

## 插入插件——！ {#安装插件}

然而，现在ToolDelta什么都干不了。我们需要一些让 ToolDelta 活跃起来的东西， 比如说插件？

啊？找不到？没关系，ToolDelta 内置的插件市场提供了许多对新人友好的插件。刚才你输入 `help` 的时候发现什么了？
```txt{3}
[15:06]  信息  以下是可选的菜单指令项:
[15:06]  信息   ...
[15:06]  信息   插件市场  ->  进入插件市场
```

这个插件市场该怎么用？不妨在控制台输入 **插件市场** 试试吧。

```txt{7}
ToolDelta插件市场 Official: 欢迎使用 ToolDelta 插件市场.
------------------------------
请选择搜索方式: 
  1 -     按插件名
  2 -     按插件作者名
  3 -     按插件 ID
  4 -     随便逛逛
  其它    退出
```

先输入 `4` 随便逛逛起

```
[15:12]  信息  ToolDelta插件市场 Official: 欢迎使用 ToolDelta 插件市场.
[15:12]  信息   1. 聊天栏菜单 v0.0.4 @SuperScript 组合式插件
[15:12]  信息   2. 控制台执行MCFB指令 v0.0.2 @SuperScript 组合式插件
[15:12]  信息   3. 库-基本组件API v0.0.1 @SuperScript 组合式插件
[15:12]  信息   4. 库-世界交互 v0.0.1 @SuperScript 组合式插件
[15:12]  信息   5. @玩家 v0.0.2 @wling 注入式插件
[15:12]  信息   6. SuperSoundMixer v0.0.1 @SuperScript/wling 注入式插件
[15:12]  信息   7. 井字棋 v0.0.1 @SuperScript/wling 注入式插件
[15:12]  信息   8. 清空末影箱 v0.0.1 @wling 注入式插件
[15:12]  信息  输入 +/- 翻页, 输入插件序号选择插件
[15:12]  输入  回车键继续上次操作, q 退出, 请输入:
```
**输入 + 或 - 可以进行向前或向后翻页的操作**，浏览你喜欢的插件。一般来说，较为常用和重要的插件会优先放在前面。

按照提示进行操作，选择插件之后可以查看详情，详情页输入 `y` 即可自动下载该插件到对应文件夹，是不是很方便？


插件市场插件的前置插件不需要你手动下载，系统会自动下载好。

> 安装完插件之后，退出到主界面（显示聊天记录），输入 reload 重载系统， 可使安装的插件生效。

## 嗯······该下线了 {#关闭}

玩累了？或者你刚刚安装了喜欢的插件，需要先退出 ToolDelta？

- 优雅的做法：在控制台输入 `exit`，直到显示日志保存成功，ToolDelta 就退出了。
- ~~不优雅的做法：`Ctrl + C`，这样退出的风险极大，很可能没有保存好数据文件！~~

# 我有意见！

启动或者运行的时候遇到问题？
 - ToolDelta 的大多数异常报错通常会在控制台里显示原因和解决方法。
 - 若有你自己无法解决的问题，请在 QQ 群中告诉我们。
