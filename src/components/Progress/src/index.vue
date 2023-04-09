<template>
  <el-progress :percentage="p" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emits = defineEmits(['finish'])
const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  isAnimate: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const p = ref(0)

onMounted(() => {
  if (props.isAnimate) {
    const t = Math.ceil(props.duration % props.percentage)
    let timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        emits('finish')
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }

})
</script>

<style lang="scss" scoped>

</style>
