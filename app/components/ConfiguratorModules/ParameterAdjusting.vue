<template>
  <div>
    <!-- <div class="paramgroup">
      <h4>L-System related parameters</h4>
      <div class="bg-white border rounded-md">
        <ValueInput class="block" type="text" copy="Axiom" />
      </div>
    </div> -->
    <div class="paramgroup">
      <h4>Groupname</h4>
      <div class="bg-white border rounded-md">
        <ValueSlider
          v-for="(param, key) in GET_VIZ_PARAMETERS"
          :key="key"
          :copy="param.name"
          :value="param._value"
          :min-max="[param._min, param._max]"
          :interval="0.01"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'

export default Vue.extend({
  name: 'ParameterAdjusting',
  computed: {
    ...mapGetters('global', [GlobalStoreGetter.GET_VIZ_PARAMETERS]),
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
