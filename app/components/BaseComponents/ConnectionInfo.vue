<template>
  <div class="mapping-control flex text-sm">
    <div class="mapping-control__container flex flex-1">
      <div
        class="flex-1 flex items-center bg-white border-gray-300 border rounded-md px-3"
      >
        <p class="m-0">
          {{ inputParam.name }}
        </p>
      </div>
      <div
        class="flex-1 flex items-center bg-white border-gray-300 border rounded-md px-3"
      >
        <p class="m-0">
          {{ mappingFunction }}
        </p>
      </div>
      <div
        class="flex-1 flex items-center bg-white border-gray-300 border rounded-md px-3"
      >
        <p class="m-0">
          {{ outputParam.name }}
        </p>
      </div>
    </div>
    <BaseButton class="flex-shrink-0" @click="onRemove">
      <XIcon />
    </BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import XIcon from '~/assets/icons/outline/x.svg?inline'
import { IDataParameter } from '~/model/IDataParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
export default Vue.extend({
  name: 'ConnectionInfo',
  components: { XIcon },
  props: {
    connectionId: {
      type: String,
      required: true,
    },
    inputParam: {
      type: Object as () => IDataParameter,
      required: true,
    },
    mappingFunction: {
      type: String as () => ParamMappingType,
      required: true,
    },
    outputParam: {
      type: Object as () => IDataParameter,
      required: true,
    },
  },
  computed: {
    ...mapGetters('global', [
      GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC,
      GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC,
      GlobalStoreGetter.GET_MAPPING_FUNCTIONS,
    ]),
  },
  methods: {
    onRemove(): void {
      this.$emit('remove', {
        id: this.connectionId,
        dataParamId: this.inputParam.id,
        mappingFunction: this.mappingFunction,
        vizParamId: this.outputParam.id,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.mapping-control {
  &__container {
    > div {
      position: relative;
      margin-right: 10px;

      &::after {
        content: '';
        width: 10px;
        top: 50%;
        left: calc(100% + 1px);
        transform: translate3d(0, -50%, 0);
        @apply absolute h-1 bg-gray-500;
      }

      &:last-child {
        margin-right: 0;

        &::after {
          width: 0;
        }
      }
    }
  }
}
</style>
