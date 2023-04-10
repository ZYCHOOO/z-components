<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, i) in options" :key="i">
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
          :on-seccess="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpReqeust"
          :on-exceed="onExceed"
        >
          <slot name="upload-area" />
          <slot name="upload-tip" />
        </el-upload>
      </el-form-item>

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
  </el-form>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted, watch } from 'vue'
import { FormOptions } from './types/type'
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
  'httpRequest',
  'onExceed'
])

const props = defineProps({
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  } 
})

const model = ref<any>(null)
const rules = ref<any>(null)

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
const onPreview = (file: any) => {
  emits('onPreview', file)
}
const onRemove = (file: any, fileList: any[]) => {
  emits('onRemove', { file, fileList })
}
const onSuccess = (response: any, file: any, fileList: any[]) => {
  emits('onSuccess', { response, file, fileList })
}
const onError = (err: any, file: any, fileList: any[]) => {
  emits('onError', { err, file, fileList })
}
const onProgress = (event: any, file: any, fileList: any[]) => {
  emits('onProgress', { event, file, fileList })
}
const onChange = (file: any, fileList: any[]) => {
  emits('onChange', { file, fileList })
}
const beforeUpload = (file: any) => {
  emits('beforeUpload', file)
}
const beforeRemove = (file: any, fileList: any[]) => {
  emits('beforeRemove', { file, fileList })
}
const httpReqeust = () => {
  emits('httpRequest')
}
const onExceed = (file: any, fileList: any[]) => {
  emits('onExceed', { file, fileList })
}

</script>

<style lang="scss" scoped>

</style>
