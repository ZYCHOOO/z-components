<template>
  <div class="form-container">
    <z-form :options="options" />
  </div>
</template>

<script setup lang="ts">
import { FormOptions } from '../../components/Form/src/types/type'

const options: FormOptions[] = [
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
      // showPassword: true
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
    ]
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
  }
]

</script>

<style lang="scss" scoped>

</style>
