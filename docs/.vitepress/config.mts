import {
    defineConfig
} from "vitepress";
import pkg from "../../package.json";
// https://vitepress.dev/reference/site-config


export default defineConfig({
    lastUpdated: true,
    lang: "zh-CN",
    title: "ToolDelta Wiki",
    description: "ToolDelta 文档",
    ignoreDeadLinks: true,
    cleanUrls: true,
    head: [
        ["link", {
            rel: "icon",
            href: "/logo.ico"
        }],
        ["script", {
            async: "",
            src: "/m.js"
        }],
        ["script", {
            async: "true",
            src: "/cursor.js"
        }],
    ],

    sitemap: {
        hostname: "https://td-wiki.dqyt.online",
    },

    themeConfig: {
        search: {
            provider: "local",
            options: {
                _render(src, env, md) {
                    const html = md.render(src, env);
                    if (env.frontmatter?.search === false) {
                        return "";
                    }
                    return html;
                },
            },
        },
        // https://vitepress.dev/reference/default-theme-config
        // logo: { src: "/logo.ico", width: 23, height: 15 },
        editLink: {
            pattern: "https://github.com/daqyt/ToolDelta-Wiki/tree/main/docs/:path",
        },

        nav: [
            {
                text: "使用",
                link: "/use"
            },
            {
                text: "插件开发指南",
                link: "/plugin-dev"
            },
            {
                text: "协助文档维护",
                link: "/help"
            },
            {
                text: "关于",
                items: [{
                    text: "关于我们",
                    link: "/intro"
                },
                {
                    text: "联系我们",
                    link: "/contact"
                },
                ],
            },
        ],

        sidebar: {
            "/use": [
                {
                    text: "👋 欢迎来到 ToolDelta Wiki",
                    link: "./"
                },
                {
                    text: "🌹 FAQ",
                    link: "./FAQ"
                },
                {
                    text: "使用教程",
                    items: [
                        {
                            text: "📖 使用教程",
                            link: "./learn_use"
                        },
                        {
                            text: "🧊 插件市场",
                            link: "./plugin_market"
                        },
                    ],
                }
            ],
            "/plugin-dev": [
                {
                    text: "✨ 公用开发接口",
                    items: [{
                        text: "程序框架和基本游戏接口",
                        link: "/plugin-dev/api/frame"
                    },
                    {
                        text: "高级游戏交互接口",
                        link: "/plugin-dev/api/game_utils"
                    },
                    {
                        text: "各类实用方法",
                        link: "/plugin-dev/api/utils-methods"
                    },
                    {
                        text: "控制台输出",
                        link: "/plugin-dev/api/color_print"
                    },
                    {
                        text: "配置文件读取方法",
                        link: "/plugin-dev/api/cfg-use"
                    },
                    {
                        text: "NeOmega 额外接口",
                        link: "/plugin-dev/api/spec-neomega"
                    },
                    ],
                },
                {
                    text: "✨ 类式插件开发指南",
                    items: [{
                        text: "创建插件",
                        link: "/plugin-dev/class-plugin/创建插件"
                    },
                    {
                        text: "编写插件主体",
                        link: "/plugin-dev/class-plugin/插件主体"
                    },
                    {
                        text: "创建一个跨插件接口",
                        link: "/plugin-dev/class-plugin/插件API"
                    },{
                        text: "插件编写实战-商店系统",
                        link: "/plugin-dev/class-plugin/demo/示例插件.md"
                    }],
                },
                {
                    text: "✨ 注入式插件开发指南",
                    items: [{
                        text: "添加一个插件文件",
                        link: "/plugin-dev/injected-plugin/创建插件.md",
                    },
                    {
                        text: "编写教程",
                        link: "/plugin-dev/injected-plugin/编写教程",
                    },
                    {
                        text: "事件获取API",
                        link: "/plugin-dev/injected-plugin/事件获取",
                    },
                    ],
                },
                {
                    text: "额外功能",
                    items: [{
                        text: "ToolDelta中文编程",
                        items: [{
                            text: "介绍",
                            link: "/plugin-dev/api/extras/Z-Basic/intro"
                        },
                        {
                            text: "入门ZBasic",
                            link: "/plugin-dev/api/extras/Z-Basic/入门ZBasic"
                        },
                        {
                            text: "指令语句",
                            link: "/plugin-dev/api/extras/Z-Basic/所有指令语句"
                        },
                        {
                            text: "内置函数",
                            link: "/plugin-dev/api/extras/Z-Basic/内置函数"
                        },
                        {
                            text: "扩展函数&语法",
                            link: "/plugin-dev/api/extras/Z-Basic/扩展功能"
                        }],
                    }],
                },
            ],
        },

        socialLinks: [{
            icon: "github",
            link: "https://github.com/ToolDelta/ToolDelta"
        },],
        externalLinkIcon: true, // 展示站外链接箭头 ↗
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
    markdown: {
        lineNumbers: true,
        image: {
            // 图片懒加载
            lazyLoading: true,
        },
        container: {
            tipLabel: "提示",
            warningLabel: "警告",
            dangerLabel: "危险",
            infoLabel: "信息",
            detailsLabel: "详细信息",
        },
    },
});