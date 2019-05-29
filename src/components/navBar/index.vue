<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" :router="true" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/message">消息中心</el-menu-item>
    <el-menu-item index="/news">新闻中心</el-menu-item>
    <el-menu-item index="/charts">图表统计</el-menu-item>
    <el-menu-item index="/about">关于</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'navbar',
})
export default class NavBar extends Vue {
  private handleSelect(key: string) {}
}
</script>

<style lang="scss" scoped>

</style>

