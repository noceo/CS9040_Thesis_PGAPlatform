<template>
  <div>
    <div
      v-if="usedDataParams.length > 0"
      class="p-5 text-sm bg-white rounded-sm"
    >
      <div
        v-for="(param, key) in usedDataParams"
        :key="'viz-data-info-param' + key"
        class="grid grid-cols-4 gap-5 mb-3 last:mb-0"
      >
        <span class="col-span-3">{{ param.name }}:</span>
        <span>{{ param.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
export default Vue.extend({
  name: 'VizDataInfo',
  computed: {
    ...mapGetters('global', {
      usedDataParams: GlobalStoreGetter.GET_USED_DATA_PARAMS_NUMERIC,
    }),
  },
})
</script>
