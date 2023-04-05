<template>
   <el-popover
    placement="top-start"
    :width="300"
    trigger="click"
  >
    <slot name="default" />
    <template #reference>
      <el-badge :value="value" :max="max" :is-dot="isDot" class="notification">
        <component :is="`el-icon${camelCase2Line(icon)}`" />
      </el-badge>
    </template>
   </el-popover>
</template>

<script setup lang="ts">
import {} from 'vue'
import { camelCase2Line } from '../../../utils'

const props = defineProps({
  icon: {
    type: String,
    default: 'Bell'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.notification {
  cursor: pointer;
}
</style>
