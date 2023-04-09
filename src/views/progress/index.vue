<template>
  <div class="progress-container">
    <z-progress :percentage="40" />
    <br>
    <br>
    <z-progress :percentage="55" is-animate />
    <br>
    <br>
    <z-progress :percentage="75" is-animate @finish="doFinish" />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

const doFinish = () => {
  ElMessage.success('加载成功!')
}

</script>

<style lang="scss" scoped>

</style>
