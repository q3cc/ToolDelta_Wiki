# 🌹 常见问题解答（FAQ）

[[toc]]

## Q1：插件市场连接失败如何解决？

![Screenshot_20250709_113128_com_microsoft emmx](https://github.com/user-attachments/assets/705759ff-4952-4fd8-b29a-bc09c3723970)

### A1：

#### 方法一：使用面板修改

如果您使用的是面板，请按照以下步骤操作：

1. 首先进入您的实例控制台
2. 点击进入`配置修改`

![image](https://img.cdn1.vip/i/68d29078a83f5_1758630008.png)

3. 点击编辑`ToolDelta基本配置`文件

![image](https://img.cdn1.vip/i/68d291811185a_1758630273.webp)

4. 根据以下模板修改配置

#### 方法二：直接修改配置文件

如果您没有`配置修改`板块，可以直接修改ToolDelta程序同目录下的`ToolDelta基本配置.json`文件：

```json
{
    "是否记录日志": true,
    "全局GitHub镜像": "https://github.Tooldelta.top",
    "插件市场源": "https://pm.tooldelta.top",
    "使用哪个序号的机器人账号进服": 0,
    "NeOmega接入点启动模式": {
        "服务器号": 114514,
        "密码": "",
        "验证服务器地址(更换时记得更改fbtoken)": ""
    }
}
```

对于使用 FateArk 接入点的用户，请使用下方的`ToolDelta基本配置.json`文件：

```json
{
    "启动器启动模式(请不要手动更改此项, 改为0可重置)": 5,
    "是否记录日志": true,
    "全局GitHub镜像": "https://github.Tooldelta.top",
    "插件市场源": "https://pm.tooldelta.top",
    "FateArk接入点启动模式": {
        "服务器号": 114514,
        "密码": "",
        "验证服务器地址(更换时记得更改fbtoken)": ""
    }
}
```

完成修改后保存配置文件并重启应用即可生效。
