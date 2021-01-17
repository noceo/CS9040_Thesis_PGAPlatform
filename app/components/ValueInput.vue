<template>
  <div
    class="value-input flex flex-wrap items-center bg-white rounded-md p-3 text-sm cursor-pointer"
    @click="focusInput"
  >
    <span class="mr-3 w-1/5 truncate">{{ copy }}</span>
    <span class="flex flex-1 -mt-3">
      <input
        ref="input"
        v-model="actValue"
        class="border-none mt-3 w-full cursor-pointer"
        :type="type"
        @input="onChange"
      />
      <div v-if="valueChanged" class="flex ml-3 mt-3">
        <BaseButton
          class="mr-2"
          copy="Save"
          type="primary"
          padding-y="py-2"
          @click="onSave"
        />
        <BaseButton
          copy="Cancel"
          type="secondary"
          padding-y="py-2"
          @click="onCancel"
        />
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ValueInput',
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['text', 'number'].includes(value)
      },
    },
    copy: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      actValue: this.value ? this.value : '',
      oldValue: this.value ? this.value : '',
      valueChanged: false as Boolean,
    }
  },
  mounted() {
    ;(this.$refs.input as HTMLElement).addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.saveChanges()
      }
    })
  },
  methods: {
    onChange(): void {
      if (this.actValue !== this.oldValue) {
        this.valueChanged = true
        return
      }
      this.valueChanged = false
    },
    onSave(event: Event) {
      event.stopPropagation()
      this.saveChanges()
    },
    onCancel() {
      this.actValue = this.oldValue
      this.valueChanged = false
    },
    saveChanges() {
      this.oldValue = this.actValue
      this.valueChanged = false
      ;(this.$refs.input as HTMLElement).blur()
      this.$emit('changed', this.actValue)
    },
    focusInput() {
      ;(this.$refs.input as HTMLElement).focus()
    },
  },
})
</script>
