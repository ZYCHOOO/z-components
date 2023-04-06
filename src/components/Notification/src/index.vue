<template>
  <el-popover
    v-if="slots.default"
    placement="bottom-start"
    popper-class="notification-popper"
    :width="300"
    trigger="click"
  >
    <slot name="default" />
    <template #reference>
      <el-badge :value="Number(value)" :max="max" :is-dot="isDot" class="notification">
        <component :is="`el-icon${camelCase2Line(icon)}`" />
      </el-badge>
    </template>
  </el-popover>
  <el-badge v-else :value="Number(value)" :max="max" :is-dot="isDot" class="notification">
    <component :is="`el-icon${camelCase2Line(icon)}`" />
  </el-badge>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import { camelCase2Line } from '../../../utils'

const slots = useSlots()
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
