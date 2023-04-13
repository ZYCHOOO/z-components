<template>
  <div class="table-container">
    <z-table :columns="columns" :data="tableData" >
      <template #name="{ scope }">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <template #action="{ scope }">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
    </z-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnItem } from '../../components/Table/src/type';

const columns: ColumnItem[] = [
  {
    prop: 'date',
    label: '日期',
    align: 'center'
  },
  {
    prop: 'name',
    label: '姓名',
    align: 'center',
    slot: 'name'
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center'
  },
  {
    action: true,
    label: '操作',
    align: 'center'
  }
]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

</script>

<style lang="scss" scoped>

</style>
