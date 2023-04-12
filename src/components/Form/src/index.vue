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
      <el-form-item
      v-if="!item.children || !item.children!.length"
      :label="item.label"
      :prop="item.prop"
      >
        <!-- 正常组件 -->
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        />

        <!-- 上传组件 -->
        <el-upload
          v-if="item.type === 'upload'"
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

        <!-- 富文本编辑器 -->
        <div id="editor" v-if="item.type === 'editor'" />
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
import E from 'wangeditor'
import { upload } from './upload'
import cloneDeep from 'lodash/cloneDeep'
import { FormOptions, FormInstance } from './types/type'
import { ref, PropType, onMounted, watch, defineExpose, nextTick } from 'vue'

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
const editor = ref()
const { onPreview, onRemove, onSuccess, onError, onProgress, onChange, beforeUpload, beforeRemove, onExceed } = upload(props, emits, model)

// 初始化表单
const initForm = () => {
  if (props.options && props.options.length) {
    const m: any = {}
    const r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      if (item.type === 'editor') {
        initEditor(item)
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 初始化富文本编辑器
const initEditor = (item: FormOptions) => {
  nextTick(() => {
    if (document.getElementById('editor')) {
      const e = new E('#editor')
      e.config.placeholder = item.placeholder!
      e.create()
      // 初始化富文本编辑器的值
      e.txt.html(item.value!)
      e.config.onchange = (html: string) => {
        model.value[item.prop!] = html
      }
      editor.value = e
    }
  })
}

// 重置表单
const resetFields = () => {
  // 重置 element-plus 表单
  formRef.value?.resetFields()
  // 重置富文本编辑器
  if (props.options && props.options.length) {
    const editorItem = props.options.find(item => item.type === 'editor')
    editor.value.txt.html(editorItem?.value)
  }
}

// 表单验证方法
let validate = () => {
  return formRef.value!.validate
}
// 获取表单数据
let getFormData = () => {
  return model.value
}

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的值
watch(() => props.options, () => {
  initForm()
}, { deep: true })

defineExpose({
  resetFields,
  validate,
  getFormData
})
</script>

<style lang="scss" scoped>

</style>
