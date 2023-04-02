<template>
  <div class="layout-header">
    <component :is="currentComponent" @click="toggleCollapse" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  collapse: boolean
}>()

const emits = defineEmits(['update:collapse'])

const currentComponent = computed(() => {
  return props.collapse ? 'el-icon-expand' : 'el-icon-fold'
})

const toggleCollapse = () => {
  emits('update:collapse', !props.collapse)
}

</script>

<style lang="scss" scoped>
.layout-header {
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 60px;
}
</style>
