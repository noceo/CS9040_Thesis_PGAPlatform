<template>
  <div class="export">
    <BaseSelect
      id="test"
      copy="Export Format"
      :options="['png', 'svg']"
      :capitalize="false"
      active-option=""
    />
    <BaseButton copy="Export" type="primary" :disabled="!isExportable" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Export',
  data() {
    return {
      isExportable: true,
    }
  },
})
</script>
