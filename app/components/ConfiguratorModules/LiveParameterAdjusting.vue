<template>
  <div>
    <!-- <div class="paramgroup">
      <h4>L-System related parameters</h4>
      <div class="bg-white border rounded-md">
        <ValueInput class="block" type="text" copy="Axiom" />
      </div>
    </div> -->
    <div v-if="liveParams.length > 0" class="paramgroup">
      <div class="bg-white border rounded-md">
        <ValueSlider
          v-for="(param, key) in liveParams"
          :id="param.id"
          :key="'live-parameter-adjusting-slider' + key"
          :copy="param.name"
          :value="param.value"
          :min-max="[0, 1]"
          :interval="0.1"
          @change="onSliderChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'

export default Vue.extend({
  name: 'LiveParameterAdjusting',
  computed: {
    ...mapGetters('global', { liveParams: GlobalStoreGetter.GET_LIVE_PARAMS }),
  },
  methods: {
    onSliderChange(sliderStatus: { id: string; value: number }): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_LIVE_PARAM}`,
        { id: sliderStatus.id, value: sliderStatus.value }
      )
    },
  },
})
</script>

<style lang="postcss" scoped>
.paramgroup > div {
  @apply border-b rounded-b-none;

  &:last-child {
    @apply border-b-0 rounded-b;
  }
}
</style>
