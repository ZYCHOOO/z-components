<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    :class="['modal-form-dialog', isScroll ? 'scrollable' : '' ]"
  >
    <template #default>
      <z-form
        ref="formRef"
        :label-width="labelWidth"
        :options="options"
        @on-change="onChange"
        @before-upload="beforeUpload"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @before-remove="beforeRemove"
        @on-success="onSuccess"
        @on-exceed="onExceed"
      >
        <template #upload-area>
          <slot name="upload-area" />
        </template>
        <template #upload-tip>
          <slot name="upload-tip" />
        </template>
      </z-form>
    </template>
    <template #footer>
      <slot name="footer" :form="formRef" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue'
import { FormOption } from '../../Form/src/types/type'

const props = defineProps({
  isScroll: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  options: {
    type: Array as PropType<FormOption[]>,
    required: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  }
})

const emits = defineEmits(['update:visible'])

const formRef = ref()
const dialogVisible = ref<boolean>(props.visible)

watch(() => props.visible, (val) => {
  dialogVisible.value = val
})
watch(() => dialogVisible.value, (val) => {
  emits('update:visible', val)
})

</script>

<style lang="scss">
.scrollable {
   .el-dialog__body {
    height: 50vh;
    overflow: scroll;
  }
}
</style>

