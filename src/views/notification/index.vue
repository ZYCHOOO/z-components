<template>
  <div class="notification-container">
    <z-notification value="22" />
    <br>
    <br>
    <z-notification value="50" :max="30" />
    <br>
    <br>
    <z-notification value="22" is-dot />
    <br>
    <br>
    <z-notification value="22">
      <template #default>
        <z-tab-list :list="list" :actions="actions"/>
      </template>
    </z-notification>
  </div>
</template>

<script setup lang="ts">
import { list, actions } from './data'

</script>

<style lang="scss" scoped>

</style>
