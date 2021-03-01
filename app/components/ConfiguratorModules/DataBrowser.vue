<template>
  <div class="data-browser">
    <ButtonStrip :buttons="buttons" :active="mode" @click="setDataMode" />
    <transition name="fade">
      <FileChooser />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { StoreModule } from '~/store/store-modules'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { DataMode } from '~/store/modules/global/state/state.types'
export default Vue.extend({
  name: 'DataBrowser',
  computed: {
    ...mapState('global', ['dataMode']),
    mode(): string {
      return this.dataMode.toLowerCase()
    },
    buttons(): Array<string> {
      return Object.values(DataMode).map((value) => value.toLowerCase())
    },
  },
  methods: {
    setDataMode(mode: string): void {
      if (mode !== this.dataMode) {
        if (mode === 'static') {
          this.$store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATAMODE}`,
            DataMode.STATIC
          )
        } else {
          this.$store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_DATAMODE}`,
            DataMode.LIVE
          )
        }
      }
    },
  },
})
</script>
