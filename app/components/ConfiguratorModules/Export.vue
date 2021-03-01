<template>
  <div class="export">
    <BaseButton
      copy="Export"
      type="primary"
      :disabled="!isExportable"
      @click="onClick"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
export default Vue.extend({
  name: 'Export',
  data() {
    return {
      isExportable: true,
    }
  },
  methods: {
    onClick(): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_EXPORT_STATE}`,
        true
      )
      Vue.nextTick(() => {
        this.$store.commit(
          `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_EXPORT_STATE}`,
          false
        )
      })
    },
  },
})
</script>
