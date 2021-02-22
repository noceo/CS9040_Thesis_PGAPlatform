<template>
  <div class="base-select relative text-sm">
    <!-- <label :id="id" class="block">{{ copy }}</label>
    <div class="relative mt-1">
      <button
        class="relative w-full pl-3 pr-10 py-2 text-left focus:outline-none bg-white border border-gray-300 focus:border-pink-500 rounded-md shadow-sm"
      >
        <span>
          {{ actOption }}
        </span>
        <span
          class="absolute ml-3 inset-y-0 right-0 h-5 flex items-center pr-2 pointer-events-none"
        ></span>
      </button>
    </div>
    <div class="absolute w-full rounded-md bg-white shadow-lg">
      <ul
        class="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
      >
        <li
          v-for="(option, key) in options"
          :id="`listbox-item-${key}`"
          :key="key"
          role="option"
          class="relative py-2 pl-3 pr-9 cursor-default select-none"
        >
          <span class="block ml-3 truncate">{{ option | capitalize }}</span>
          <span class="absolute inset-y-0 right-0 pr-4"></span>
        </li>
      </ul>
    </div> -->

    <label :for="id" class="block mb-1">{{ copy }}</label>
    <select
      :id="id"
      :name="id"
      class="block w-full bg-white focus:outline-none"
      :value="activeOption"
      @change="onChange"
    >
      <option />
      <template v-if="optionType === 'string'">
        <option v-for="(option, key) in options" :key="'select-option-' + key">
          {{ capitalizeOptionString(option) }}
        </option>
      </template>
      <template v-else>
        <option v-for="(option, key) in options" :key="'select-option-' + key">
          {{ capitalizeOptionString(option.name) }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'BaseSelect',
  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    copy: {
      type: String,
      required: false,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    activeOption: {
      type: String,
      required: false,
      default: '',
    },
    capitalize: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    optionType(): string {
      if (this.options.every((element: any) => typeof element === 'string')) {
        return 'string'
      } else {
        return 'object'
      }
    },
  },
  methods: {
    onChange(event: any) {
      this.$emit('change', event.target.value)
    },
    capitalizeOptionString(value: string): string {
      return this.capitalize
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value
    },
  },
})
</script>
