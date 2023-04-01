<template>
  <el-container>
    <el-aside width="auto">
      <layout-menu :collapse="isCollaspe" />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <layout-header v-model:collapse="isCollaspe" />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import layoutMenu from './layoutMenu.vue';
import layoutHeader from './layoutHeader.vue';

const isCollaspe = ref(false)

</script>

<style lang="scss" scoped>

</style>
