<template>
  <div class="base-button">
    <button
      class="flex items-center w-full text-sm font-medium rounded-lg px-3 focus:outline-none"
      :class="[
        `justify-${align}`,
        paddingY,
        {
          'bg-pink-500 text-white hover:bg-pink-400':
            type === 'primary' && !disabled,
        },
        {
          'bg-white border border-gray-300 text-black':
            type === 'secondary' && !disabled,
        },
        { 'pointer-events-none opacity-40 bg-gray-300': disabled },
        classes,
      ]"
      @click="onClick"
    >
      <span v-if="$slots.default" class="text-icon">
        <div
          class="transform transition-transform"
          :class="
            rotationDirection === 'right'
              ? `rotate-${rotate}`
              : `-rotate-${rotate}`
          "
        >
          <slot />
        </div>
      </span>
      <span
        v-if="copy"
        class="label text-left"
        :class="{ 'ml-2': $slots.default }"
      >
        {{ copy }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BaseButton',
  props: {
    copy: {
      type: String,
      required: false,
      default: '',
    },
    align: {
      type: String,
      required: false,
      default: 'center',
    },
    type: {
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
    paddingY: {
      type: String,
      required: false,
      default: 'py-4',
    },
    classes: {
      type: String,
      required: false,
      default: '',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onClick(event: Event): void {
      this.$emit('click', event)
    },
  },
})
</script>
