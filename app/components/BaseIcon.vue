<template>
  <div class="base-icon"><svg-icon :name="name" /></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>
