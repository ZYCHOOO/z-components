<template>
  <el-dialog :visible="modalVisible" v-bind="$attrs">
    <template #default>表单</template>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:visible'])

const modalVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
  modalVisible.value = val
})

watch(() => modalVisible, (val) => {
  emits('update:visible', val)
})

</script>

