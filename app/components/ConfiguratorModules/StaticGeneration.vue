<template>
  <div>
    <BaseButton copy="Generate" type="primary" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
export default Vue.extend({
  name: 'StaticGeneration',
  methods: {
    onClick() {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_GENERATE_STATE}`,
        true
      )
      Vue.nextTick(() => {
        this.$store.commit(
          `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_GENERATE_STATE}`,
          false
        )
      })
    },
  },
})
</script>
