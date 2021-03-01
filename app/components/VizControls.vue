<template>
  <div class="controls">
    <div class="relative w-full h-full">
      <div class="absolute left-0 bottom-0 w-full p-5">
        <BaseButton
          :circle="true"
          :disabled="!activeDataConnections.length > 0"
          @click="onClick"
        >
          <template v-if="!isPlaying">
            <PlayIcon />
          </template>
          <template v-else>
            <PauseIcon />
          </template>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import PlayIcon from '~/assets/icons/outline/play.svg?inline'
import PauseIcon from '~/assets/icons/outline/pause.svg?inline'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
export default Vue.extend({
  name: 'VizControls',
  components: { PlayIcon, PauseIcon },
  computed: {
    ...mapGetters('global', {
      activeDataConnections: GlobalStoreGetter.GET_DATA_CONNECTIONS,
    }),
  },
  data() {
    return {
      isPlaying: false,
    }
  },
  methods: {
    onClick() {
      if (!this.isPlaying) {
        this.$services.dataManager.startDataPropagation()
      } else {
        this.$services.dataManager.stopDataPropagation()
      }
      this.isPlaying = !this.isPlaying
    },
  },
})
</script>

<style lang="scss" scoped>
.controls {
  padding-top: auto;
}
</style>
