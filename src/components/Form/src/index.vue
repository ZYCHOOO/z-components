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
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
        />
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

const props = defineProps({
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  } 
})

const model = ref<any>(null)
const rules = ref<any>(null)

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

</script>

<style lang="scss" scoped>

</style>
