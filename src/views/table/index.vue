<template>
  <div class="table-container">
    <z-table
      pagination
      :columns="columns"
      :data="tableData"
      :total="tableData.length"
      pagination-align="center"
    >
      <template #name="{ scope }">
        <el-tag>{{ scope.row.name }}</el-tag>
      </template>
      <template #action="{ scope }">
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
      </template>
      <template #edit-cell="{ scope }">
        <el-button type="primary" size="small">确认</el-button>
        <el-button type="danger" size="small">取消</el-button>
      </template>
    </z-table>
  </div>
</template>

<script setup lang="ts">
import { ColumnItem } from '../../components/Table/src/type';

const columns: ColumnItem[] = [
  { prop: 'date', label: '日期', align: 'center', editable: true },
  { prop: 'name', label: '姓名', align: 'center', slot: 'name' },
  { prop: 'address', label: '地址', align: 'center', editable: true },
  { action: true, label: '操作', align: 'center' }
]

const tableData = [
  { date: '2016-05-03', name: 'Tim', address: '广东', },
  { date: '2016-05-02', name: 'Tom', address: '湖南', },
  { date: '2016-05-04', name: 'Tod', address: '贵阳', },
  { date: '2016-05-01', name: 'Tony', address: 'Los Angle', },
]

</script>

<style lang="scss" scoped>

</style>
