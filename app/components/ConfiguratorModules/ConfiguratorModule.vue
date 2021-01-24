<template>
  <div
    ref="configuratorModule relative"
    class="configurator-module w-full pl-3 pr-5 border-b-2 border-gray-200"
  >
    <BaseButton
      class="expand-button -ml-3 -mr-5 hover:pt-1"
      :copy="headline"
      align="left"
      :rotate="opened ? 0 : 45"
      rotation-direction="left"
      @click="toggleExpand"
    >
      <XIcon />
    </BaseButton>

    <div
      ref="configArea"
      class="configuration-area pl-3 pt-3 pb-5 overflow-hidden max-h-0"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import XIcon from '~/assets/icons/outline/x.svg?inline'
export default Vue.extend({
  name: 'ConfiguratorModule',
  components: { XIcon },
  props: {
    headline: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      opened: true,
      mutationObserver: (null as unknown) as MutationObserver,
    }
  },
  mounted() {
    const configArea = this.$refs.configArea as HTMLElement
    configArea.style.maxHeight = this.expanded
      ? `${configArea.scrollHeight}px`
      : ''

    // Callback function to execute when mutations are observed
    const callback = function (mutations: any) {
      // Use traditional 'for loops' for IE 11
      mutations.forEach((mutation: any) => {
        if (mutation.type === 'childList') {
          console.warn('NODE ADDED')
          configArea.style.maxHeight = `${configArea.scrollHeight}px`
        }
      })
    }
    // Create an observer instance linked to the callback function
    this.mutationObserver = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    this.mutationObserver.observe(configArea, {
      attributes: false,
      childList: true,
      subtree: true,
    })

    // window.addEventListener('resize', () => {
    //   configArea.style.maxHeight = `${configArea.scrollHeight}px`
    // })
    // window.dispatchEvent(new Event('resize'))
  },
  beforeDestroy() {
    this.mutationObserver.disconnect()
  },
  methods: {
    toggleExpand(): void {
      const configArea = this.$refs.configArea as HTMLElement
      if (configArea.style.maxHeight !== '') {
        configArea.style.maxHeight = ''
        configArea.style.paddingTop = '0px'
        configArea.style.paddingBottom = '0px'
        this.opened = false
        return
      }
      configArea.style.paddingTop = ''
      configArea.style.paddingBottom = ''
      // Padding values cannot be calculated right due to css transition
      // workaround: magic number 30px gets used to compensate missing padding
      configArea.style.maxHeight = `${configArea.scrollHeight + 30}px`
      this.opened = true
    },
  },
})
</script>

<style lang="postcss" scoped>
.expand-button {
  transition: padding 0.15s ease-in-out;
}

.configuration-area {
  transition: max-height 0.3s ease-out, padding 0.3s ease-out;
}

.configuration-area > div {
  @apply flex flex-col space-y-5;
}
</style>
