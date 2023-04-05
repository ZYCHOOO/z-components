<template>
  <div class="trend">
    <div class="trend-text" :style="{ color: textColor }">
      <slot v-if="slots.default" />
      <span v-else>{{ text }}</span>
    </div>
    <div class="trend-icon">
      <slot v-if="slots.ascendIcon" name="ascendIcon" />
      <component
        v-if="!slots.ascendIcon && type === 'ascend'"
        :is="`el-icon${camelCase2Line(ascendIcon)}`"
        :style="{ color: ascendIconColor }"
      />
      <slot v-if="slots.descendIcon && type === 'descend'" name="descendIcon" />
      <component
        v-if="!slots.descendIcon && type === 'descend'"
        :is="`el-icon${camelCase2Line(descendIcon)}`"
        :style="{ color: descendIconColor }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'
import { camelCase2Line } from '../../../utils'

const slots = useSlots()
const props = defineProps({
  text: { type: String, default: '' },
  type: {
    type: String,
    default: 'ascend',
    validator: (value: string) => {
      return ['ascend', 'descend'].indexOf(value) !== -1
    }
  },
  ascendTextColor: { type: String, default: '#333' },
  descendTextColor: { type: String, default: '#333' },
  ascendIcon: { type: String, default: 'ArrowUp' },
  descendIcon: { type: String, default: 'ArrowDown' },
  ascendIconColor: { type: String, default: '#F5222D' },
  descendIconColor: { type: String, default: '#67C23A' }
})

console.log(slots)

const textColor = computed(() => {
  return props.type === 'ascend' ? props.ascendTextColor : props.descendTextColor
})
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  flex-direction: row;
  align-items: center;
  &-icon {
    margin-left: 6px;
    display: flex;
    font-size: 12px;
  }
}
</style>
