<template>
  <div class="configurator bg-gray-100 shadow-md overflow-y-auto">
    <ConfiguratorModule name="Data Browser">
      <!-- Here content can be injected -->
      <DataBrowser />
    </ConfiguratorModule>
    <ConfiguratorModule name="Parameter Mapping" />
    <ConfiguratorModule name="Export" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
