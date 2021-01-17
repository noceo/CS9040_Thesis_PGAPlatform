<template>
  <div class="value-slider flex flex-wrap bg-white rounded-md p-3 text-sm">
    <span class="copy w-1/5 mr-3 truncate">
      {{ copy }}
    </span>
    <div class="slider-container flex flex-1 items-center -mt-3">
      <span class="flex flex-1 mt-3 mr-3">
        <vue-slider
          v-model="sliderValue"
          class="flex-1"
          :min="minMax[0]"
          :max="minMax[1]"
          :interval="interval"
          :tooltip="'none'"
          :contained="true"
          :drag-on-click="true"
          @change="onChange"
        />
      </span>
      <input v-model="sliderValue" class="w-10 mt-3 text-center" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    copy: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    minMax: {
      type: Array,
      required: false,
      default() {
        return [0, 1]
      },
    },
    interval: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  data() {
    return {
      sliderValue: this.value,
    }
  },
  methods: {
    onChange(): void {
      this.$emit('change', this.sliderValue)
    },
  },
})
</script>

<style lang="postcss" scoped>
.copy {
  min-width: 20px;
}

.slider-container {
  min-width: 150px;
}
</style>
