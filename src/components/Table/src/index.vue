<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    class="z-table"
    v-loading="loading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingViewBox"
  >
    <template v-for="item in tableColumns" :key="item.prop">
      <el-table-column
         v-if="!item.action"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <!-- 编辑 单元格 -->
          <template v-if="(scope.$index + scope.column.id) === currentEdit">
            <div class="action-cell">
              <el-input size="small" v-model="scope.row[item.prop!]" />
              <div class="action-cell-extension" @click="handleExtension">
                <slot v-if="slots['edit-cell']" name="edit-cell" :scope="scope" />
                <template v-else>
                  <el-icon-check class="confirm-icon" @click="handleConfirm(scope)" />
                  <el-icon-close class="cancel-icon" @click="handleCancel(scope)" />
                </template>
              </div>
              </div>
          </template>
          <!-- 常规/自定义 单元格 -->
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope" />
            <span v-else>{{ scope.row[item.prop!] }}</span>
            <component
              v-if="item.editable"
              class="edit-icon"
              :is="`el-icon${camelCase2Line(editIcon)}`"
              @click="clickEditIcon(scope)"
            />
          </template>
        </template>
      </el-table-column>
      <!-- 自定义列 -->
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
  <div v-if="pagination && !loading" class="pagination" :style="{ justifyContent }">
    <el-pagination
      :modalValue="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed, useSlots } from 'vue'
import { camelCase2Line } from '../../../utils'
import { ColumnItem } from './type'

const slots = useSlots()

const props = defineProps({
  columns: {
    type: Array as PropType<ColumnItem[]>,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  // 加载的文案
  elementLoadingText: { type: String },
  // 加载的图标名
  elementLoadingSpinner: { type: String },
  // 加载背景颜色
  elementLoadingBackground: { type: String },
  // 加载 svg
  elementLoadingSvg: { type: String },
  // 加载 svg 的配置
  elementLoadingViewBox: { type: String },
  // 编辑图标
  editIcon: {
    type: String,
    default: 'Edit'
  },
  // 是否展示分页
  pagination: {
    type: Boolean,
    default: false
  },
    // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40]
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['handle-confirm', 'handle-cancel', 'size-change', 'current-change'])

// 当前进入编辑的单元格
let currentEdit = ref<string>('')

// 过滤操作项以外的配置
const tableColumns = computed(() => props.columns.filter(item => !item.action))

// 操作项配置
const actionColumn = computed(() => props.columns.find(item => item.action))

// 表格分页的排列方式
const justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})

// 点击单元格内的编辑图标
const clickEditIcon = (scope: any) => {
  currentEdit.value = scope.$index + scope.column.id
}

// 点击单元格内按钮范围
const handleExtension = () => {
  currentEdit.value = ''
}

// 点击单元格内的确认图标
const handleConfirm = (scope: any) => {
  emits('handle-confirm', scope)
}
// 点击单元格内的取消图标
const handleCancel = (scope: any) => {
  emits('handle-confirm', scope)
}

// 分页的每一页数据变化
let handleSizeChange = (val: number) => {
  emits('size-change', val)
  // console.log(val)
}
// 分页页数改变
let handleCurrentChange = (val: number) => {
  emits('current-change', val)
  // console.log(val)
}
</script>

<style lang="scss" scoped>

.confirm-icon, .cancel-icon, .edit-icon {
  cursor: pointer;
}

.edit-icon {
  margin-left: 4px;
  position: relative;
  top: 2px;
}

.action-cell {
  @include flex-align-center;
  &-extension {
    @include flex-row;
    margin-left: 6px;
    .confirm-icon {
      color: #67C23A;
    }
    .cancel-icon {
      margin-left: 4px;
      color: #F56C6C;
    }
  }
}

.pagination {
  @include flex-row;
  margin-top: 10px;
}
</style>
