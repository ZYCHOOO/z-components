<template>
  <div class="choose-area">
    <el-select v-model="areaValue.province" placeholder="请选择省份" :size="size" clearable>
      <el-option
        v-for="item in provinceOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select v-model="areaValue.city" placeholder="请选择城市" :disabled="!areaValue.province" :size="size" clearable>
      <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
    <el-select v-model="areaValue.region" placeholder="请选择区域" :disabled="!areaValue.province || !areaValue.city" :size="size" clearable>
      <el-option
        v-for="item in regionOptions"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import allAreas from '../lib/pca-code.json'

const props = defineProps<{
  size: string
}>()
const areaValue = ref({
  province: '',
  city: '',
  region: ''
})

// 下拉框省份选项
const provinceOptions = ref(allAreas)
// 下拉框城市选项
const cityOptions = ref<any[]>([])
// 下拉框区域选项
const regionOptions = ref<any>([])

watch(() => areaValue.value.province, val => {
  if (val) {
    const cities = provinceOptions.value.find(item => item.code === val)!.children
    cityOptions.value = cities
  }
  areaValue.value.city = ''
  areaValue.value.region = ''
})

watch(() => areaValue.value.city, val => {
  if (val) {
    const regions = cityOptions.value.find(item => item.code === val)!.children
    regionOptions.value = regions
  }
  areaValue.value.region = ''
})

</script>

<style lang="scss" scoped>
.choose-area {
  .el-select + .el-select {
    margin-left: 10px;
  }
}
</style>
