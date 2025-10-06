<template>
    <h2>插件与整合包</h2>
    <div v-if="loading">加载中...</div>
    <div v-else class="plugin-grid">
        <div class="plugin-card" v-for="item in itemList" :key="item.name" :class="{ 'package-card': item.isPackage }">
            <div class="plugin-header" @click="openGithub(item)" style="cursor: pointer;">
                <div class="plugin-name">{{ item.name }}</div>
            </div>
            <div class="plugin-meta">
                <div class="plugin-author">{{ item.author }}</div>
                <div class="plugin-version">{{ item.version }}</div>
            </div>
            <div class="plugin-description">{{ item.description || '暂无描述' }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const itemList = ref([])
const loading = ref(true)
const pluginNameMap = ref({})

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

        // 将插件转换为数组并获取描述
        const plugins = []

        for (const pluginId in data.MarketPlugins) {
            const pluginInfo = data.MarketPlugins[pluginId]
            const pluginName = pluginIdsMap[pluginId]

            if (pluginName) {
                // 保存插件名到文件夹名的映射
                pluginNameMap.value[pluginInfo.name] = pluginName

                try {
                    const datasResponse = await fetch(`https://pm.tooldelta.top/${pluginName}/datas.json`)
                    const datasJson = await datasResponse.json()

                    plugins.push({
                        ...pluginInfo,
                        description: datasJson.description || '暂无描述',
                        isPackage: false
                    })
                } catch (e) {
                    plugins.push({
                        ...pluginInfo,
                        description: '暂无描述',
                        isPackage: false
                    })
                }
            }
        }

        // 合并整合包和插件，整合包放在前面
        itemList.value = [...packages, ...plugins]
    } catch (error) {
        console.error('加载插件数据失败:', error)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.plugin-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)) !important;
    gap: 25px !important;
    width: 100% !important;
}

.plugin-card {
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.5s, border-color 0.5s;
    display: flex;
    flex-direction: column;
}

.dark .plugin-card {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.plugin-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.dark .plugin-card:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.plugin-header {
    padding: 20px 25px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    position: relative;
    transition: opacity 0.3s ease;
}

.plugin-header:hover {
    opacity: 0.9;
}

.package-card .plugin-header {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.plugin-name {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 5px;
}

.plugin-meta {
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    border-bottom: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-soft);
    transition: background-color 0.5s, border-color 0.5s;
}

.plugin-author,
.plugin-version {
    font-size: 0.95rem;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
}

.plugin-author::before {
    content: "👤 ";
    margin-right: 5px;
}

.plugin-version::before {
    content: "🔖 ";
    margin-right: 5px;
}

.plugin-description {
    padding: 20px 25px;
    color: var(--vp-c-text-1);
    font-size: 1rem;
    line-height: 1.7;
    transition: color 0.5s;
}

@media (max-width: 768px) {
    .plugin-grid {
        grid-template-columns: 1fr;
    }

    .plugin-meta {
        flex-direction: column;
        gap: 10px;
    }

    .plugin-name {
        font-size: 1.5rem;
    }
}
</style>