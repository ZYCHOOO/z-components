<template>
  <ul class="icons-container">
    <li
      v-for="item in Icons"
      :key="item.name"
      class="icons-container-item"
      @click="copyIcon(item.name)"
    >
      <component :is="`el-icon${camelCase2Line(item.name)}`" />
      <span class="icon-name">{{ item.name }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import * as Icons from '@element-plus/icons'
import { useCopy } from '../../hooks/useCopy'
import { camelCase2Line } from '../../utils/index'

const copyIcon = (name: string) => {
  const copyValue = `<el-icon${camelCase2Line(name)} />`
  useCopy(copyValue)
}

</script>

<style lang="scss" scoped>
  .icons-container {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-top: 1px solid rgb(76, 77, 79);
    border-left: 1px solid rgb(76, 77, 79);
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      list-style: none;
      height: 90px;
      border-right: 1px solid rgb(76, 77, 79);
      border-bottom: 1px solid rgb(76, 77, 79);
      &:hover {
        color: #4685FF;
        cursor: pointer;
      }
    }
    .icon-name {
      margin-top: 8px;
    }
  }
</style>
