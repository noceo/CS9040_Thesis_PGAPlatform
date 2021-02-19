<template>
  <div class="visualization relative">
    <button class="absolute top-0 left-1/2 w-5 h-5" @click="play">Play</button>
    <canvas ref="canvas" class="block w-full h-full" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { SpaceColonizationTool } from '~/SpaceColonizationGenerator/SpaceColonization/SpaceColonization'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
import VisualizationTool from '~/model/visualizationTool/visualizationTool'

export default Vue.extend({
  name: 'Visualization',
  data() {
    return {
      viz: (null as unknown) as VisualizationTool,
    }
  },
  computed: {
    ...mapState('global', ['dataMode', 'currentDataRow', 'vizDebugActive']),
  },
  watch: {
    currentDataRow(newVal) {
      this.viz.onNewDataRow(newVal)
    },
    vizDebugActive(newVal) {
      this.viz.debugMode = newVal
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
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VIZ_PARAMETERS}`,
        availableParams
      )
    },
    play() {
      this.viz.play()
    },
  },
})
</script>
