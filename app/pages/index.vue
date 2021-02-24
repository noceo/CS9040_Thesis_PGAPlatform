<template>
  <div class="h-screen relative">
    <NotificationStack />
    <div class="relative">
      <transition name="fade">
        <Modal
          v-if="GET_MAPPING_MODAL_STATE"
          class="absolute top-0 left-0 right-0 bottom-0 z-50"
        >
          <ModalParameterMapping />
        </Modal>
      </transition>
      <Visualization class="h-full" />
      <VizControls class="absolute left-0 top-0 w-32 h-full" />
    </div>
    <Configurator class="absolute top-0 right-0 w-48 md:w-96 h-screen" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'

export default Vue.extend({
  name: 'Index',
  computed: {
    ...mapGetters('global', [GlobalStoreGetter.GET_MAPPING_MODAL_STATE]),
  },
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
