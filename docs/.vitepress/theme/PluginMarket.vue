<template>
    <h2>插件</h2>
    <div v-if="loading">加载中...</div>
    <div v-else>
        <div class="plugin-card" v-for="item in pluginList" :key="item.name">
            <div class="plugin-header">
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

const pluginList = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await fetch('https://pm.tooldelta.top/market_tree.json')
        const data = await response.json()
        
        // 将对象转换为数组
        const plugins = []
        for (const key in data.MarketPlugins) {
            plugins.push(data.MarketPlugins[key])
        }
        
        pluginList.value = plugins
    } catch (error) {
        console.error('加载插件数据失败:', error)
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.plugin-card {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 600px;
    margin-bottom: 25px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.plugin-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.plugin-header {
    padding: 20px 25px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    position: relative;
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
    border-bottom: 1px solid #eee;
    background-color: #f8f9fa;
}

.plugin-author,
.plugin-version {
    font-size: 0.95rem;
    color: #555;
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
    color: #444;
    font-size: 1rem;
    line-height: 1.7;
}

@media (max-width: 768px) {
    .plugin-card {
        max-width: 100%;
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