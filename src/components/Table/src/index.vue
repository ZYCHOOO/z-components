<template>
  <el-table :data="data" v-bind="$attrs">
    <template v-for="item in tableColumns" :key="item.prop">
      <el-table-column
        v-if="!item.slot"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      />
      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope" />
        </template>
      </el-table-column>
    </template>

    <!-- 操作项 -->
    <el-table-column
      :label="actionColumn!.label"
      :align="actionColumn!.align"
      :width="actionColumn!.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { ColumnItem } from './type'

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnItem[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})

// 过滤操作项以外的配置
const tableColumns = computed(() => props.columns.filter(item => !item.action))

// 操作项配置
const actionColumn = computed(() => props.columns.find(item => item.action))



</script>

<style lang="scss" scoped>

</style>
