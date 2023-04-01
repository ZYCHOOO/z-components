<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        default-active="1"
        :collapse="isCollaspe"
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
    </el-aside>
    <el-container>
      <el-header>
        <component :is="currentComponent" @click="toggleCollapse" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isCollaspe = ref(false)
const currentComponent = computed(() => {
  return isCollaspe.value ? 'el-icon-expand' : 'el-icon-fold'
})

const toggleCollapse = () => {
  isCollaspe.value = !isCollaspe.value
}
</script>

<style lang="scss" scoped>
.layout-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
