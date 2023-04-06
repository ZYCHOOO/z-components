<template>
  <el-menu
    class="nav-menu"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template
      v-for="menuItem in data"
      :key="menuItem.index"
    >
      <!-- 一级菜单 -->
      <el-menu-item
        v-if="!menuItem.children || !menuItem.children.length"
        :index="menuItem.index"
      >
        <component v-if="menuItem.icon" :is="`el-icon${camelCase2Line(menuItem.icon)}`" />
        <span v-html="menuItem.name" />
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu
        v-if="menuItem.children && menuItem.children.length"
        :index="menuItem.index"
      >
        <template #title>
          <component v-if="menuItem.icon" :is="`el-icon${camelCase2Line(menuItem.icon)}`" />
          <span v-html="menuItem.name" />
        </template>
        <el-menu-item
          v-for="subMenuItem in menuItem.children"
          :key="subMenuItem.index"
          :index="subMenuItem.index"
        >
          <component v-if="subMenuItem.icon" :is="`el-icon${camelCase2Line(subMenuItem.icon)}`" />
          <span v-html="subMenuItem.name" />
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { MenuItem } from './types'
import { camelCase2Line } from '../../../utils'

const props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true
  },
  // 默认选中菜单
  defaultActive: {
    type: String,
    default: ''
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false
  }
})


</script>

<style lang="scss" scoped>

.nav-menu {
  svg {
    margin-right: 4px;
  }
}
</style>
