<template>
  <div>
    <!-- <div class="paramgroup">
      <h4>L-System related parameters</h4>
      <div class="bg-white border rounded-md">
        <ValueInput class="block" type="text" copy="Axiom" />
      </div>
    </div> -->
    <div v-if="GET_USED_VIZ_PARAMS_NUMERIC.length > 0" class="paramgroup">
      <div class="bg-white border rounded-md">
        <ValueSlider
          v-for="(param, key) in GET_USED_VIZ_PARAMS_NUMERIC"
          :key="key"
          :copy="param.name"
          :value="param._value"
          :min-max="[param._min, param._max]"
          :interval="1"
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
  name: 'ParameterAdjusting',
  computed: {
    ...mapGetters('global', [GlobalStoreGetter.GET_USED_VIZ_PARAMS_NUMERIC]),
  },
  methods: {
    onSliderChange(sliderStatus: { id: string; value: number }): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_VALUE_MODIFIER}`,
        sliderStatus
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
