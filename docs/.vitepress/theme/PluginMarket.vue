<template>
    <h2>插件与整合包</h2>
    <div v-if="loading">加载中...</div>
    <div v-else>
        <div class="search-box">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索插件名、作者或描述..."
                class="search-input"
            />
        </div>
        <div v-if="filteredList.length === 0" class="no-results">
            未找到匹配的插件或整合包
        </div>
        <div v-else class="plugin-grid">
            <div class="plugin-card" v-for="item in filteredList" :key="item.name" :class="{ 'package-card': item.isPackage }">
                <div class="plugin-header" @click="openGithub(item)" style="cursor: pointer;">
                    <div class="plugin-name">{{ item.name }}</div>
                </div>
                <div class="plugin-meta">
                    <div class="plugin-author">{{ item.author }}</div>
                    <div class="plugin-version">{{ item.version }}</div>
                </div>
                <div class="plugin-description" @click="showFullDescription(item)" :class="{ 'expanded': expandedItem === item.name }" v-html="parseMinecraftColor(item.description || '暂无描述')">
                </div>
            </div>
        </div>
    </div>

    <!-- 模态框 -->
    <div v-if="modalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h3>{{ currentItem?.name }}</h3>
                <button class="modal-close" @click="closeModal">×</button>
            </div>
            <div class="modal-body">
                <div class="modal-meta">
                    <span>作者: {{ currentItem?.author }}</span>
                    <span>版本: {{ currentItem?.version }}</span>
                </div>
                <div class="modal-description" v-html="parseMinecraftColor(currentItem?.description || '暂无描述')">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const itemList = ref([])
const loading = ref(true)
const pluginNameMap = ref({})
const searchQuery = ref('')
const modalVisible = ref(false)
const currentItem = ref(null)
const expandedItem = ref(null)

// Minecraft 颜色代码映射
const colorMap = {
    '0': '#000000', // black
    '1': '#0000AA', // dark_blue
    '2': '#00AA00', // dark_green
    '3': '#00AAAA', // dark_aqua
    '4': '#AA0000', // dark_red
    '5': '#AA00AA', // dark_purple
    '6': '#FFAA00', // gold
    '7': '#AAAAAA', // gray
    '8': '#555555', // dark_gray
    '9': '#5555FF', // blue
    'a': '#55FF55', // green
    'b': '#55FFFF', // aqua
    'c': '#FF5555', // red
    'd': '#FF55FF', // light_purple
    'e': '#FFFF55', // yellow
    'f': '#FFFFFF', // white
    'g': '#DDD605', // minecoin_gold
    'h': '#E3D4D1', // material_quartz
    'i': '#CECACA', // material_iron
    'j': '#443A3B', // material_netherite
    'm': '#971607', // material_redstone
    'n': '#B4684D', // material_copper
    'p': '#DEB12D', // material_gold
    'q': '#47A036', // material_emerald
    's': '#2CBAA8', // material_diamond
    't': '#21497B', // material_lapis
    'u': '#9A5CC6', // material_amethyst
    'v': '#EB7114'  // material_resin
}

// 转换 Minecraft 颜色代码为 HTML
const parseMinecraftColor = (text) => {
    if (!text) return ''

    let result = ''
    let currentColor = null
    let i = 0

    while (i < text.length) {
        if (text[i] === '§' && i + 1 < text.length) {
            const code = text[i + 1].toLowerCase()

            // §r 重置颜色
            if (code === 'r') {
                if (currentColor !== null) {
                    result += '</span>'
                    currentColor = null
                }
                i += 2
                continue
            }

            // 检查是否是有效的颜色代码
            if (colorMap[code]) {
                // 如果已有颜色，先闭合
                if (currentColor !== null) {
                    result += '</span>'
                }
                // 开始新颜色
                currentColor = colorMap[code]
                result += `<span style="color: ${currentColor}">`
                i += 2
                continue
            }
        }

        // 普通字符
        result += text[i]
        i++
    }

    // 闭合未关闭的标签
    if (currentColor !== null) {
        result += '</span>'
    }

    return result
}

const filteredList = computed(() => {
    if (!searchQuery.value.trim()) {
        return itemList.value
    }

    const query = searchQuery.value.toLowerCase()
    return itemList.value.filter(item => {
        return (
            item.name.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
        )
    })
})

const openGithub = (item) => {
    const baseUrl = 'https://github.com/ToolDelta-Basic/PluginMarket/tree/main'
    let path = ''

    if (item.isPackage) {
        // 整合包：添加 [pkg] 前缀
        const packageName = item.name.replace('[整合包] ', '')
        path = `/%5Bpkg%5D${encodeURIComponent(packageName)}`
    } else {
        // 插件：通过插件名获取对应的文件夹名
        const pluginFolderName = pluginNameMap.value[item.name]
        if (pluginFolderName) {
            path = `/${encodeURIComponent(pluginFolderName)}`
        }
    }

    if (path) {
        window.open(baseUrl + path, '_blank')
    }
}

const showFullDescription = (item) => {
    currentItem.value = item
    modalVisible.value = true
}

const closeModal = () => {
    modalVisible.value = false
    currentItem.value = null
}

onMounted(async () => {
    try {
        const response = await fetch('https://pm.tooldelta.top/market_tree.json')
        const data = await response.json()

        // 获取插件ID映射
        const pluginIdsMap = await fetch('https://pm.tooldelta.top/plugin_ids_map.json').then(r => r.json())

        // 将整合包转换为数组
        const packages = []
        for (const key in data.Packages) {
            packages.push({
                name: `[整合包] ${key}`,
                originalName: key,
                author: data.Packages[key].author,
                version: data.Packages[key].version,
                description: data.Packages[key].description,
                isPackage: true
            })
        }

        // 先快速显示插件基本信息
        const plugins = []
        const pluginDataPromises = []

        for (const pluginId in data.MarketPlugins) {
            const pluginInfo = data.MarketPlugins[pluginId]
            const pluginName = pluginIdsMap[pluginId]

            if (pluginName) {
                // 保存插件名到文件夹名的映射
                pluginNameMap.value[pluginInfo.name] = pluginName

                // 先添加基本信息到列表
                plugins.push({
                    ...pluginInfo,
                    description: '加载中...',
                    isPackage: false
                })

                // 并发获取详细描述
                const pluginIndex = plugins.length - 1
                pluginDataPromises.push(
                    fetch(`https://pm.tooldelta.top/${pluginName}/datas.json`)
                        .then(r => r.json())
                        .then(datasJson => {
                            // 通过索引更新，触发响应式更新
                            const allItems = itemList.value
                            const targetIndex = packages.length + pluginIndex
                            allItems[targetIndex] = {
                                ...allItems[targetIndex],
                                description: datasJson.description || '暂无描述'
                            }
                            itemList.value = [...allItems]
                        })
                        .catch(() => {
                            const allItems = itemList.value
                            const targetIndex = packages.length + pluginIndex
                            allItems[targetIndex] = {
                                ...allItems[targetIndex],
                                description: '暂无描述'
                            }
                            itemList.value = [...allItems]
                        })
                )
            }
        }

        // 合并整合包和插件，整合包放在前面，立即显示
        itemList.value = [...packages, ...plugins]
        loading.value = false

        // 等待所有描述加载完成
        await Promise.all(pluginDataPromises)
    } catch (error) {
        console.error('加载插件数据失败:', error)
        loading.value = false
    }
})
</script>

<style scoped>
.search-box {
    margin-bottom: 24px;
}

.search-input {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    transition: border-color 0.2s;
}

.search-input:focus {
    outline: none;
    border-color: #0969da;
}

.dark .search-input:focus {
    border-color: #58a6ff;
}

.search-input::placeholder {
    color: var(--vp-c-text-3);
}

.no-results {
    text-align: center;
    padding: 40px 20px;
    color: var(--vp-c-text-2);
    font-size: 14px;
}

.plugin-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px !important;
    width: 100% !important;
}

.plugin-card {
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    overflow: hidden;
    transition: border-color 0.2s;
    display: flex;
    flex-direction: column;
}

.plugin-card:hover {
    border-color: var(--vp-c-text-3);
}

.plugin-header {
    padding: 16px;
    border-bottom: 1px solid var(--vp-c-divider);
    transition: background-color 0.2s;
}

.plugin-header:hover {
    background-color: var(--vp-c-bg-soft);
}

.package-card .plugin-name::before {
    content: "📦 ";
    margin-right: 6px;
}

.plugin-name {
    font-size: 14px;
    font-weight: 600;
    color: #0969da;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dark .plugin-name {
    color: #58a6ff;
}

.plugin-meta {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    gap: 12px;
}

.plugin-author,
.plugin-version {
    font-size: 12px;
    color: var(--vp-c-text-2);
}

.plugin-author::before {
    content: "";
    margin-right: 0;
}

.plugin-version::before {
    content: "";
    margin-right: 0;
}

.plugin-description {
    padding: 0 16px 16px 16px;
    color: var(--vp-c-text-2);
    font-size: 12px;
    line-height: 1.5;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
    transition: color 0.2s;
}

/* 浅色主题下为描述添加灰色背景 */
.plugin-description:not(.dark .plugin-description) {
    background-color: #f6f6f7;
    padding: 8px 16px 8px 16px;
    margin: 0 16px 16px 16px;
    border-radius: 4px;
}

.plugin-description:hover {
    color: var(--vp-c-text-1);
}

/* 模态框样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background-color: var(--vp-c-bg);
    border-radius: 6px;
    border: 1px solid var(--vp-c-divider);
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .modal-content {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--vp-c-divider);
}

.modal-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.modal-close {
    background: none;
    border: none;
    font-size: 28px;
    color: var(--vp-c-text-2);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;
}

.modal-close:hover {
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}

.modal-body {
    padding: 20px;
}

.modal-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    font-size: 12px;
    color: var(--vp-c-text-2);
}

.modal-description {
    font-size: 14px;
    line-height: 1.6;
    color: var(--vp-c-text-1);
    white-space: pre-wrap;
}

@media (max-width: 768px) {
    .plugin-grid {
        grid-template-columns: 1fr !important;
    }

    .plugin-meta {
        flex-direction: column;
        gap: 8px;
    }

    .plugin-name {
        font-size: 14px;
    }

    .modal-content {
        max-width: 100%;
    }

    .modal-meta {
        flex-direction: column;
        gap: 8px;
    }
}
</style>