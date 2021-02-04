<template>
  <div class="visualization">
    <canvas ref="canvas" class="block w-full h-full" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { SpaceColonizationTool } from '~/SpaceColonizationGenerator/SpaceColonization/SpaceColonization'
import { IVisualizationTool } from '~/model/visualizationTool/visualizationTool.types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'

export default Vue.extend({
  name: 'VisualizationDriver',
  data() {
    return {
      viz: (null as unknown) as IVisualizationTool,
    }
  },
  computed: {
    ...mapState('global', ['dataMode', 'currentDataRow']),
  },
  watch: {
    currentDataRow(newVal) {
      this.viz.onNewDataRow(newVal)
    },
  },
  mounted() {
    this.vizInit()
    this.saveAvailableParametersToStore()
  },
  methods: {
    vizInit(): void {
      this.viz = new SpaceColonizationTool(
        this.$refs.canvas as HTMLCanvasElement
      )
    },
    saveAvailableParametersToStore(): void {
      const availableParams = this.viz.getAvailableParameters()
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VIZ_PARAMETERS}`,
        availableParams
      )
    },
  },
})
</script>
