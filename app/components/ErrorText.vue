<template>
  <div class="error-text error flex items-start rounded p-2">
    <div class="btn-icon flex-shrink-0 mr-2">
      <svg-icon name="outline/outline-exclamation-circle" />
    </div>
    <p class="error-copy flex-auto">
      <slot />
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.error-text {
  .error-copy {
    margin-top: 2px;
  }
}
</style>
