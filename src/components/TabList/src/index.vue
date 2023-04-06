<template>
  <div class="tab-list">
    <el-tabs class="tab-list-tabs" v-model="activeName">
      <el-tab-pane
        v-for="tabItem in list"
        :key="tabItem.id"
        :label="tabItem.title"
        :name="tabItem.title"
      >
        <el-scrollbar height="300">
          <div
            v-for="listItem in tabItem.content"
            :key="listItem.id"
            class="tab-list-item"
            @click="itemClick(listItem)"
          >
            <el-avatar v-if="listItem.avatar" :size="50" :src="listItem.avatar" />
            <div class="tab-list-info">
              <div class="tab-list-header">
                <div v-if="listItem.title" class="tab-list-title" v-html="listItem.title" />
                <el-tag v-if="listItem.tag" :type="listItem.tagType">{{ listItem.tag }}</el-tag>
              </div>
              <div v-if="listItem.desc" class="tab-list-desc" v-html="listItem.desc" />
              <div v-if="listItem.time" class="tab-list-time" v-html="listItem.time" />
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div
      v-if="actions.length"
      class="tab-list-actions"
    >
      <div
        v-for="(actionItem, i) in actions"
        :key="actionItem.id"
        :class="['tab-list-action', i === actions.length - 1 ? '' : 'bordered']"
        @click="actionClick(actionItem)"
      >
        <component v-if="actionItem.icon" :is="`el-icon${camelCase2Line(actionItem.icon)}`" />
        <span v-html="actionItem.text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType } from 'vue'
import { camelCase2Line } from '../../../utils'
import { ListOptions, ActionOptions, ListItem } from './types'

const props = defineProps({
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

const activeName = ref()
const emits = defineEmits(['item-click', 'action-click'])

onMounted(() => {
  activeName.value = props.list[0].title
})

const itemClick = (item: ListItem) => {
  emits('item-click', { item })
}

const actionClick = (item: ActionOptions) => {
  emits('action-click', { item })
}


</script>

<style lang="scss" scoped>
  .tab-list {
    &-tabs {
      margin: 0 10px 10px;
      :deep .el-tabs__nav {
        display: flex;
        width: 100%;
      }
      :deep .el-tabs__item {
        flex: 1;
        text-align: center;
      }
    }
    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 4px;
      padding: 8px 4px;
      &:hover {
        border-radius: 8px;
        background: rgba(62, 158, 255, .1);
        cursor: pointer;
      }
      .el-avatar {
        background-color: #FFF;
      }
    }
    &-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      .el-tag {
        margin-left: auto;
      }
    }
    &-title {
      color: #333;
    }
    &-desc, &-time {
      font-size: 12px;
      color: #606260;
    }
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      flex: 1;
    }
    &-actions {
      display: flex;
      height: 50px;
      border-top: 1px solid #EEE;
    }
    &-action {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.bordered::after {
        content: '';
        position: absolute;
        right: 0;
        width: 1px;
        height: 20px;
        background: #EEE;
      }
      &:hover {
        color: #4685FF;
      }
      span {
        margin-left: 4px;
      }
    }
  }
</style>
