<template>
  <z-nav-menu
    router
    :data="menuData"
    :collapse="collapse"
    :default-active="$route.path"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  collapse: boolean
}>()

const menuData = [
  { name: '首页', index: '/home', icon: 'House' },
  { name: '图标', index: '/icons', icon: 'Aim' },
  { name: '省市区选择器', index: '/chooseArea', icon: 'Location' },
  { name: '城市选择器', index: '/chooseCity', icon: 'OfficeBuilding' },
  { name: '趋势标记', index: '/trend', icon: 'Histogram' },
  { name: '消息通知', index: '/notification', icon: 'Bell' },
  { name: '导航菜单', index: '/navMenu', icon: 'Menu' },
  { name: '进度条', index: '/progress', icon: 'Loading' },
  { name: '表单', index: '/form', icon: 'Tickets' },
  { name: '弹出框表单', index: '/modalForm', icon: 'DocumentCopy' },
  { name: '表格', index: '/table', icon: 'Grid' },
]

</script>

