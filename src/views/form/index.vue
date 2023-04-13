<template>
  <div class="form-container">
    <z-form ref="formRef" :options="options" label-width="100px">
      <template #upload-area>
        <el-button type="primary">upload</el-button>
      </template>
      <template #upload-tip>
        <div style="color: #ccc; font-size: 12px;">
          jpg/png files with a size of 500kb
        </div>
      </template>
      <template #action="scope" >
        <el-button type="primary" @click="doSubmit(scope)">提交</el-button>
        <el-button type="default" plain @click="doReset">重置</el-button>
      </template>
    </z-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { FormOption, FormInstance } from '../../components/Form/src/types/type'

interface Scope {
  form: FormInstance,
  model: any
}

const formRef = ref()

const options: FormOption[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 2, max: 6, message: '用户名在2-6位之间' }
    ],
    attrs: {
      clearable: true
    }
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 15, message: '密码在6-15位之间' }
    ],
    attrs: {
      showPassword: true,
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    rules: [
      { required: true, message: '职位不能为空', trigger: 'blur' }
    ],
    children: [
      { type: 'option', label: '学生', value: 1 },
      { type: 'option', label: '教师', value: 2 },
      { type: 'option', label: '家长', value: 3 }
    ],
    attrs: {
      style: {
        width: '100%'
      }
    }
  },
  {
    type: 'checkbox-group',
    value: [],
    prop: 'like',
    label: '爱好',
    children: [
      { type: 'checkbox', label: '足球', value: 1 },
      { type: 'checkbox', label: '篮球', value: 2 }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    prop: 'gender',
    label: '性别',
    children: [
      { type: 'radio', label: '男', value: 1 },
      { type: 'radio', label: '女', value: 2 }
    ]
  },
  {
    type: 'upload',
    label: '附件',
    prop: 'pic',
    uploadAttrs: {
      action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
      multiple: true,
      limit: 3
    },
    rules: [
      { required: true, message: '附件不能为空！', trigger: 'blur' }
    ]
  },
  {
    type: 'editor',
    label: '描述',
    value: '',
    prop: 'desc',
    placeholder: '请输入描述',
    rules: [
      { required: true, message: '描述不能为空！', trigger: 'blur' }
    ]
  }
]

const doSubmit = (scope: Scope) => {
  const { form, model } = scope
  form.validate((valid) => {
    if (valid) {
      console.log(model)
      ElMessage.success('提交成功！')
    } else {
      ElMessage.error('请完成表单填写！')
    }
  })
}

const doReset = () => {
  formRef.value.resetFields()
}

</script>

<style lang="scss" scoped>

</style>
