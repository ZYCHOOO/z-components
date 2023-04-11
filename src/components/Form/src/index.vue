<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    ref="formRef"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, i) in options" :key="i">
      <!-- 正常组件 -->
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-if="item.type !== 'upload'"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        />
        <el-upload
          v-else
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="upload-area" />
          <slot name="upload-tip" />
        </el-upload>
      </el-form-item>

      <!-- 多选/单选 -->
      <el-form-item
        v-if="item.children && item.children.length"
        :prop="item.prop"
        :label="item.label"
      >
        <component
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          />
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="formRef" :model="model" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, watch } from 'vue'
import { FormOptions, FormInstance } from './types/type'
import cloneDeep from 'lodash/cloneDeep'

const emits = defineEmits([
  'onPreview',
  'onRemove',
  'onSuccess',
  'onError',
  'onProgress',
  'onChange',
  'beforeUpload',
  'beforeRemove',
  'onExceed'
])

const props = defineProps({
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传行为
  httpRequest: {
    type: Function
  }
})

const model = ref<any>(null)
const rules = ref<any>(null)
const formRef = ref<FormInstance | null>()

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    const r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的值
watch(() => props.options, () => {
  initForm()
}, { deep: true })

// 上传组件的所有方法
const onPreview = (file: File) => {
  emits('onPreview', file)
}
const onRemove = (file: File, fileList: FileList) => {
  emits('onRemove', { file, fileList })
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
  const uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('onSuccess', { response, file, fileList })
}
const onError = (err: any, file: File, fileList: FileList) => {
  emits('onError', { err, file, fileList })
}
const onProgress = (event: any, file: File, fileList: FileList) => {
  emits('onProgress', { event, file, fileList })
}
const onChange = (file: File, fileList: FileList) => {
  emits('onChange', { file, fileList })
}
const beforeUpload = (file: File) => {
  emits('beforeUpload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
  emits('beforeRemove', { file, fileList })
}
const onExceed = (files: File, fileList: FileList) => {
  emits('onExceed', { files, fileList })
}

</script>

<style lang="scss" scoped>

</style>
