<template>
  <div class="button-strip flex">
    <button
      v-for="name in buttons"
      :key="name"
      :class="{
        'text-pink-500 font-bold border-pink-500 bg-pink-500 bg-opacity-10':
          name === active,
      }"
      class="target flex-auto bg-white h-6 text-xs text-center border border-gray-300 focus:outline-none first:rounded-l-md last:rounded-r-md"
      @click="setActiveButton(name)"
    >
      <span> {{ name }} </span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonStrip',
  props: {
    buttons: {
      type: Array,
      required: true,
      validator(buttons: string) {
        return buttons.length >= 2
      },
    },
    active: {
      type: String,
      required: true,
    },
  },
  methods: {
    setActiveButton(name: string): void {
      this.$emit('click', name)
    },
  },
})
</script>
