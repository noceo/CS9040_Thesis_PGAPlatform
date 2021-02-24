<template>
  <div class="visualization relative">
    <button class="absolute top-0 left-1/2 w-5 h-5" @click="play">Play</button>
    <canvas ref="canvas" class="block w-full h-full" />
    <VizDataInfo class="absolute top-4 left-4 w-52" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { SpaceColonizationTool } from '~/SpaceColonizationGenerator/SpaceColonization/SpaceColonization'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
import VisualizationTool from '~/model/visualizationTool/visualizationTool'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'

export default Vue.extend({
  name: 'Visualization',
  data() {
    return {
      viz: (null as unknown) as VisualizationTool,
    }
  },
  computed: {
    ...mapState('global', ['dataMode', 'vizDebugActive']),
    ...mapGetters('global', {
      dataTransferState: GlobalStoreGetter.GET_DATA_TRANSFER_STATE,
      liveParams: GlobalStoreGetter.GET_LIVE_PARAMS,
    }),
  },
  watch: {
    vizDebugActive(newVal) {
      this.viz.debugMode = newVal
    },
    dataTransferState(newVal) {
      console.log('TRANSFER', newVal)
      if (newVal === true) {
        const newVizParams = this.$store.getters[
          `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_USED_VIZ_PARAMS_NUMERIC}`
        ]
        const newTextParams = this.$store.getters[
          `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_DATA_PARAMS_TEXT}`
        ]
        this.viz.onNewData({
          vizParams: newVizParams,
          textParams: newTextParams,
        })
      }
    },
    liveParams: {
      handler(newVal) {
        console.log('WTF', newVal)
        this.viz.onNewLiveParams(newVal)
      },
      deep: true,
    },
  },
  mounted() {
    this.vizInit()
    this.saveAvailableParametersToStore()
  },
  methods: {
    vizInit(): void {
      this.viz = new SpaceColonizationTool(
        this.$refs.canvas as HTMLCanvasElement,
        this.vizDebugActive
      )
    },
    saveAvailableParametersToStore(): void {
      const availableParams = this.viz.getAvailableParameters()
      const availableLiveParams = this.viz.getAvailableLiveParameters()
      console.log('LIVEPARAMS', availableLiveParams)
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VIZ_PARAMS}`,
        availableParams
      )
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_LIVE_PARAMS}`,
        availableLiveParams
      )
    },
    play() {
      this.viz.play()
    },
  },
})
</script>
