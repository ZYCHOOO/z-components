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
  { name: '省市区选择', index: '/chooseArea', icon: 'Location' },
  { name: '趋势标记', index: '/trend', icon: 'Histogram' },
  { name: '消息通知', index: '/notification', icon: 'Bell' },
  { name: '导航菜单', index: '/navMenu', icon: 'Menu' },
  { name: '进度条', index: '/progress', icon: 'Loading' },
  // { name: '', index: '', icon: '' },
  // { name: '', index: '', icon: '' },
  // { name: '', index: '', icon: '' },
  // { name: '', index: '', icon: '' }
]

</script>

