<template>
  <div class="mapping-control flex space-between text-sm">
    <div
      class="mapping-control__param-name flex-1 flex items-center bg-white border-gray-300 border rounded-md px-3"
    >
      <p class="m-0">
        {{ inputParam.name }}
      </p>
    </div>
    <BaseSelect
      class="flex-1 bg-white border-gray-300 border rounded-md"
      :options="mappingFunctions"
      active-option=""
      :capitalize="false"
      @change="onMappingFunctionChange"
    />
    <BaseSelect
      class="flex-1 bg-white border-gray-300 border rounded-md"
      :options="outputParamOptions"
      active-option=""
      :capitalize="false"
      @change="onVizParamChange"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IVizParameter } from '~/model/IVizParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
export default Vue.extend({
  name: 'MappingControl',
  props: {
    inputParam: {
      type: Object,
      required: true,
    },
    outputParamOptions: {
      type: Array,
      required: true,
    },
    mappingFunctions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      actMappingFunction: (null as unknown) as ParamMappingType,
      actVizParam: (null as unknown) as IVizParameter | undefined,
    }
  },
  methods: {
    onMappingFunctionChange(mappingFunction: ParamMappingType) {
      this.actMappingFunction = mappingFunction
      this.emitStatus()
    },
    onVizParamChange(vizParam: IVizParameter) {
      this.actVizParam = vizParam
      this.emitStatus()
    },
    emitStatus(): void {
      this.$emit(
        'change',
        this.inputParam,
        this.actMappingFunction,
        this.actVizParam
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.mapping-control {
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
    }
  }
}
</style>
