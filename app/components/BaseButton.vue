<template>
  <div class="base-button">
    <button
      class="flex items-center w-full text-sm font-medium rounded-lg px-3 py-4 -mr-5 focus:outline-none"
      :class="[
        { 'bg-pink-500 text-white': type === 'primary' },
        { 'bg-white border border-gray-300 text-black': type === 'secondary' },
        { 'pointer-events-none opacity-50': !isActive },
        classes,
      ]"
      @click="onClick"
    >
      <span class="inline-block">
        <svg-icon
          v-if="iconName"
          :name="iconName"
          class="btn-icon transform transition-transform"
          :class="
            rotationDirection === 'right'
              ? `rotate-${rotate}`
              : `-rotate-${rotate}`
          "
        />
      </span>
      <span class="label ml-2">
        <slot />
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      required: false,
      default: '',
    },
    iconName: {
      type: String,
      required: false,
      default: '',
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
    classes: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => {
    return {
      isActive: true as boolean,
    }
  },
  methods: {
    onClick(): void {
      this.$emit('click')
    },
  },
})
</script>
