---
layout: page
title: 认识团队
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'


const coreMembers = [

]

const partners = []
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      认识团队（待施工）
    </template>
    <template #lead>
      在这个页面你将了解为项目做出贡献的人
    </template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>管理团队</template>
    <template #lead>这是目前是ToolDelta的开发团队, 感谢他们让ToolDelta更美好!</template>
    <template #members>
      <VPTeamMembers size="medium" :members="coreMembers" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>赞助者</template>
    <template #lead>这些是为 ToolDelta 贡献过的人, 感谢他们让项目更完善!(排名不分先后)</template>
    <template #members>
      <VPTeamMembers size="small" :members="partners" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
