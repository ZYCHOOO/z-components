<template>
  <div class="modal-form-container">
    <el-button type="primary" @click="doOpen">打开弹出框表单</el-button>
    <z-modal-form
      title="编辑用户"
      width="50%"
      :options="options"
      v-model:visible="visible"
      :on-change="handleChange"
      :on-success="handleSuccess"
    >
      <template #footer="scope">
        <el-button @click="doCancel(scope.form)">取消</el-button>
        <el-button type="primary" @click="doConfirm(scope.form)">确认</el-button>
      </template>
      <template #upload-area>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #upload-tip>
        <div style="color: #ccc;font-size: 12px;">jpg/png files with a size less than 500kb</div>
      </template>
    </z-modal-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { FormOptions, FormInstance } from '../../components/Form/src/types/type'

const visible = ref<boolean>(false)

const doOpen = () => {
  visible.value = true
}

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

const doConfirm = (form: any) => {
  const validate = form.validate()
  validate((valid: boolean) => {
    if (valid) {
      console.log(form.getFormData)
      ElMessage.success('提交成功！')
    } else {
      ElMessage.error('请完成表单填写！')
    }
  })
}

const doCancel = (form: any) => {}

const handleChange = (val: any) => {}

const handleSuccess = (val: any) => {}

</script>

<style lang="scss" scoped>

</style>
