<template>
  <el-menu
    default-active="1"
    :collapse="collapse"
    class="layout-menu"
  >
    <el-menu-item index="1">
      <el-icon-menu />
      <span>Navigator One</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu />
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon-menu />
      <span>Navigator Three</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import {} from 'vue'

const props = defineProps<{
  collapse: boolean
}>()

</script>

<style lang="scss" scoped>
.layout-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
