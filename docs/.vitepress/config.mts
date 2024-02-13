import { defineConfig } from "vitepress";
import pkg from "../../package.json";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  lang: "zh-CN",
  title: "ToolDelta Wiki",
  description: "ToolDelta 文档",
  ignoreDeadLinks: true,
  head: [
    ["link", { rel: "icon", href: "/logo.ico" }],
    ["script", { async: "", src: "/m.js" }],
    ["script", { async: "true", src: "/cursor.js" }],
  ],
  sitemap: {
    hostname: "https://tooldelta.tblstudio.cn",
  },
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: "/logo.ico", width: 23, height: 15 },
    editLink: {
      pattern:
        "https://github.com/ToolDelta/ToolDelta_wiki/tree/main/docs/:path",
    },
    nav: [
      { text: "主界面   ", link: "/" },
      { text: "百科", link: "/intro" },
      {
        text: "关于",
        items: [
          { text: "关于我们", link: "/about/intro" },
          { text: "认识成员", link: "/about/team" },
          { text: "联系我们", link: "/about/contact" },
        ],
      },
    ],

    sidebar: [
      {
        text: "教程",
        items: [
          { text: "👋 欢迎来到 ToolDelta Wiki", link: "/intro" },
          { text: "🌹 FAQ", link: "/FAQ" },
          { text: "📘 项目介绍", link: "/jieshao" },
          {
            text: "✨ 组合式插件开发指南",
            items: [
              { text: "添加一个插件文件", link: "/class-plugin/添加文件" },
              { text: "方法和接口", link: "/class-plugin/方法和接口" },
              {
                text: "进阶",
                items: [
                  { text: "插件API", link: "/class-plugin/up/插件API" },
                  {
                    text: "Builtins 与 Config 的方法",
                    link: "/class-plugin/up/Builtins 与 Config 的方法",
                  },
                ],
              },
              {
                text: "附录",
                items: [
                  {
                    text: "虚拟JSON文件系统",
                    link: "/class-plugin/add-on/虚拟JSON文件系统",
                  },
                  {
                    text: "game_ctrl 的方法",
                    link: "/class-plugin/add-on/game_ctrl",
                  },
                  {
                    text: "config检测样式",
                    link: "/class-plugin/add-on/config检测样式",
                  },
                ],
              },
              {
                text: "# 敬请期待 #",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/wling-art/ToolDelta_wiki" },
    ],
    footer: {
      message: `基于 GPL-3.0 license 许可发布 | 文档版本 ${pkg.version}`,
      copyright: `版权所有 © 2023-${new Date().getFullYear()} ToolDelta`,
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
