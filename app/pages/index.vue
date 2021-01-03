<template>
  <div class="min-h-screen flex relative md:grid md:grid-cols-12">
    <!-- <notifications group="all" position="top left" /> -->
    <NotificationStack />
    <Visualization class="w-full md:col-span-8" />
    <Configurator
      class="absolute top-0 right-0 w-72 h-screen md:static md:w-full md:col-span-4"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
