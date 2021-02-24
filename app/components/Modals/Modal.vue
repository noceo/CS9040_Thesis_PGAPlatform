<template>
  <div class="modal">
    <div
      class="modal__background-shadow relative h-full bg-gray-800 bg-opacity-80"
    >
      <div
        class="absolute top-1/2 left-1/2 w-3/4 h-4/6 p-5 md:p-10 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Modal',
})
</script>
