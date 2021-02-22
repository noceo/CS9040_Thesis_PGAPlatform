<template>
  <div class="h-screen relative">
    <NotificationStack />
    <div class="relative">
      <Visualization class="h-full" />
      <VizControls class="absolute left-0 top-0 w-32 h-full" />
    </div>
    <Configurator class="absolute top-0 right-0 w-48 md:w-96 h-screen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
