<template>
  <div class="loading-spinner">
    <div class="relative spinner-container">
      <div class="spinner absolute top-0 left-0 w-full h-full" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="postcss" scoped>
.spinner-container {
  width: 100%;
  padding-top: 100%;
}

.spinner::after {
  @apply block w-full h-full rounded-full border-pink-500;

  border-width: 0.1em;
  border-color: rgba(236, 72, 153, 1) rgba(236, 72, 153, 1)
    rgba(236, 72, 153, 1) transparent;
  content: '';
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
