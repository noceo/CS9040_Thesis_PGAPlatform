<template>
  <div
    ref="configurator"
    class="configurator bg-gray-100 shadow-md overflow-y-auto"
  >
    <ConfiguratorModule headline="Data Browser">
      <DataBrowser />
    </ConfiguratorModule>
    <ConfiguratorModule v-if="dataMode === 'LIVE'" headline="Parameter Mapping">
      <ParameterMapping />
    </ConfiguratorModule>
    <ConfiguratorModule
      v-if="dataMode === 'LIVE'"
      headline="Live Parameter Controls"
    >
      <LiveParameterAdjusting />
    </ConfiguratorModule>
    <ConfiguratorModule v-if="dataMode !== 'LIVE'" headline="Static Generation">
      <StaticGeneration />
    </ConfiguratorModule>
    <ConfiguratorModule headline="Export">
      <Export />
    </ConfiguratorModule>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Configurator',
  props: {
    minWidth: {
      type: Number,
      required: false,
      default: 350,
    },
  },
  data() {
    return {
      lastMousePositionX: 0 as number,
    }
  },
  computed: {
    ...mapState('global', ['dataMode']),
  },
  mounted() {
    const configurator = this.$refs.configurator as HTMLElement
    let mousePosition: number
    const minWidth = this.minWidth
    const resizeCallback = function (e: any): void {
      const distanceX = mousePosition - e.x
      mousePosition = e.x
      const configuratorWidth = parseInt(
        getComputedStyle(configurator, '').width
      )
      if (configuratorWidth <= minWidth && distanceX < 0) {
        configurator.style.width = `${configuratorWidth}px`
        return
      }
      configurator.style.width = `${configuratorWidth + distanceX}px`
    }

    configurator.addEventListener(
      'mousedown',
      (e: any): void => {
        if (e.offsetX < 4) {
          mousePosition = e.x
          document.addEventListener('mousemove', resizeCallback, false)
        }
      },
      false
    )

    document.addEventListener(
      'mouseup',
      (): void => {
        document.removeEventListener('mousemove', resizeCallback, false)
      },
      false
    )
  },
})
</script>

<style lang="postcss" scoped>
.configurator::after {
  content: '';
  cursor: w-resize;
  @apply fixed top-1/2 w-1 h-1/4 bg-gray-500 transform-gpu -translate-y-1/2;
}
</style>
