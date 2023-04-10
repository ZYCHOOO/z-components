<template>
  <div class="trend-container">
    <div class="normal-trend">
      <z-trend text="营业额" />
      <z-trend text="营业额" type="descend" />
    </div>
    <div class="custom-icon-trend">
      <z-trend text="销售额" ascend-icon="CaretTop"/>
      <z-trend text="销售额" type="descend" descend-icon="CaretBottom" />
    </div>
    <div class="slot-text-trend">
      <z-trend>
        <span class="demo-text">成交量</span>
      </z-trend>
      <z-trend type="descend">
        <span class="demo-text">成交量</span>
      </z-trend>
    </div>
    <div class="slot-icon-trend">
      <z-trend text="入学率">
        <template #ascendIcon>
          <i class="circle ascend" />
        </template>
      </z-trend>
      <z-trend text="入学率" type="descend">
        <template #descendIcon>
          <i class="circle descend" />
        </template>
      </z-trend>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'

</script>

<style lang="scss" scoped>
.trend-container {
  @include flex-column;
  .normal-trend,
  .custom-icon-trend,
  .slot-text-trend,
  .slot-icon-trend {
    @include flex-row;
  }
}

.demo-text {
  @include flex-align-center;
  &::before {
    content: '';
    display: flex;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ccc;
  }
}

.circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  &.ascend {
    background: red;
  }
  &.descend {
    background: green;
  }
}
</style>
