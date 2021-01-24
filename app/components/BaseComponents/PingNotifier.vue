<template>
  <div
    class="ping-notifier w-4 h-4 cursor-pointer transform transition-transform hover:scale-125"
  >
    <span
      class="animate-ping absolute h-full w-full rounded-full bg-pink-400 opacity-75"
    ></span>
    <span class="absolute rounded-full h-full w-full bg-pink-500"></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
