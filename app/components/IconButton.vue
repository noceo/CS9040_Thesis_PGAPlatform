<template>
  <button class="focus:outline-none rounded w-6 h-6 p-1" @click="onClick">
    <div
      class="w-full h-full transform transition-transform"
      :class="
        rotationDirection === 'right' ? `rotate-${rotate}` : `-rotate-${rotate}`
      "
    >
      <svg-icon :name="iconName" class="w-full h-full" />
    </div>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    iconName: {
      type: String,
      required: true,
    },
    rotate: {
      type: Number,
      required: false,
      default: null,
    },
    rotationDirection: {
      type: String,
      required: false,
      default: 'right',
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
})
</script>
