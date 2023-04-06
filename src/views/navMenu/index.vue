<template>
  <div class="nav-menu-container">
    <z-nav-menu :data="data" />
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'

const data = [
  { name: '导航1', index: '1', icon: 'Document' },
  { name: '导航2', index: '2', icon: 'Document' },
  { name: '导航3', index: '3', icon: 'Document', children: [
    { name: '导航3-1', index: '3-1', icon: 'Document' },
    { name: '导航3-2', index: '3-2', icon: 'Document' },
  ] }
]

</script>

<style lang="scss" scoped>
.nav-menu-container {
  width: 200px;
}
</style>
