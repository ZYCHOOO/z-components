<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="400"
    trigger="click"
    popper-class="choose-city"
  >
    <template #reference>
      <div class="choose-city-result">
        <span>{{ cityValue }}</span>
        <el-icon-arrow-up :class="{ 'rotate': visible }" />
      </div>
    </template>

    <div class="choose-city-content">
      <!-- 城市选择 - 头部 -->
      <div class="choose-city-header">
        <el-radio-group v-model="radioValue" size="small">
          <el-radio-button label="city" >按城市</el-radio-button>
          <el-radio-button label="province" >按省份</el-radio-button>
        </el-radio-group>
        <el-select
          v-model="selectValue"
          size="small"
          filterable
          :filter-method="filterMethod"
          placeholder="请输入城市名"
          @change="changeSelect"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <!-- 按城市筛选 -->
      <template v-if="radioValue === 'city'">
        <div class="city-option">
          <div
            v-for="letter in Object.keys(cities)"
            :key="letter"
            class="city-option-item"
            @click="clickLetter(letter)"
          >
            {{ letter }}
          </div>
        </div>
        <el-scrollbar height="300px">
          <template v-for="(value, key) in cities" :key="key">
            <div :id="key" class="city-row" >
              <div class="city-row-key">{{ key }}</div>
              <div class="city-row-value">
                <div
                  v-for="cityItem in value"
                  :key="cityItem.id"
                  class="city-row-item"
                  @click="chooseCity(cityItem, radioValue)"
                >
                  {{ cityItem.name }}
                </div>
              </div>
            </div>
          </template>
        </el-scrollbar>
      </template>

      <!-- 按省份筛选 -->
      <template v-else class="choose-city-container">
        <div class="province-option">
          <div
            v-for="letter in Object.keys(provinces)"
            :key="letter"
            class="province-option-item"
            @click="clickLetter(letter)"
          >
            {{ letter }}
          </div>
        </div>
        <el-scrollbar height="300px">
          <template v-for="(province, i) in Object.values(provinces)" :key="i">
            <div
              v-for="provinceItem in province"
              :key="provinceItem.id"
              :id="provinceItem.id"
              class="province-row"
            >
              <div class="province-row-key">{{ provinceItem.name }}</div>
              <div class="province-row-value" style="margin-left: 10px;">
                <div
                  v-for="city in provinceItem.data"
                  :key="city"
                  class="province-row-item"
                  @click="chooseCity(city, radioValue)"
                >
                  {{ city }}
                </div>
              </div>
            </div>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import city from '../lib/city'
import province from '../lib/province.json'
import { CityItem, ProvinceItem } from './types'

const emits = defineEmits(['change'])

// 最终选择的值
const cityValue = ref<string>('请选择城市')
// 控制弹出层显示
const visible = ref<boolean>(false)
// 单选框的值
const radioValue = ref<string>('city')
// 下拉框的值
const selectValue = ref<string>('')
// 所有的城市值
const cities = ref(city.cities)
// 所有的省市值
const provinces = ref(province)
const options = ref<CityItem[]>([])

onMounted(() => { initOptions() })

const initOptions = () => {
  const values = Object.values(cities.value).flat(2)
  options.value = values
}

// 点击字母
const clickLetter = (item: string) => {
  const el = document.getElementById(item)
  if (el) el.scrollIntoView()
}

// 点击城市
const chooseCity = (city: any, currentType: string) => {
  cityValue.value = currentType === 'city' ? city.name : city
  visible.value = false
  emits('change', city)
}

// 自定义搜索过滤
const filterMethod = (val: string) => {
  const values = Object.values(cities.value).flat(2)
  if (!val) {
    initOptions()
    return
  }
  if (radioValue.value === 'city') {
    // 中文和拼音一起过滤
    options.value = values
      .filter(item => item.name.includes(val) || item.spell.includes(val))
  } else {
    // 中文过滤
    options.value = values.filter(item => item.name.includes(val))
  }
}

const changeSelect = (val: number) => {
  const city = options.value.find(item => item.id === val)!
  cityValue.value = city.name
  visible.value = false
  emits('change', city)
}

</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
}
.choose-city {
  &-header {
    @include flex-align-center;
    .el-select {
      margin-left: auto;
    }
  }
  &-result {
    @include flex-align-center;
    width: fit-content;
    cursor: pointer;

    svg {
      margin-left: 4px;
      transition: all .25s linear;
    }
  }
  .city-option, .province-option {
    @include flex-wrap;
    margin-top: 10px;
    &-item {
      @include flex-center;
      margin: 0 4px 4px 0;
      padding: 0 4px;
      min-width: 16px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid #eee;
      cursor: pointer;
    }
  }
  .city-row, .province-row {
    @include flex-row;
    margin-top: 6px;
    &-key {
      min-width: 24px;
      text-align: center;
    }
    &-value {
      flex: 1;
      @include flex-wrap;
    }
    &-item {
      margin: 0 4px 4px 0;
      cursor: pointer;
    }
  }
}
</style>
