<template>
  <div>
    <vue-slider :v-model="sliderValue" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      sliderValue: this.value,
    }
  },
  computed: {},
})
</script>
