<template>
  <div class="modal-parameter-mapping flex flex-col h-full">
    <div class="modal-paramter-mapping__container flex-1">
      <div>
        <BaseSelect
          id="Input Parameter"
          copy="InputParameter"
          :capitalize="false"
          :options="GET_DATA_PARAMS_NUMERIC"
          @change="onInputParamChanged"
        />
      </div>
      <div>
        <BaseSelect
          id="Mapping Function"
          copy="Mapping Function"
          :capitalize="false"
          :options="GET_MAPPING_FUNCTIONS"
          @change="onMappingFunctionChanged"
        />
      </div>
      <div>
        <BaseSelect
          id="Output Parameter"
          copy="Output Parameter"
          :capitalize="false"
          :options="GET_UNUSED_VIZ_PARAMS_NUMERIC"
          @change="onOutputParamChanged"
        />
      </div>
    </div>
    <div class="flex mt-10">
      <BaseButton
        class="flex-1 mr-10"
        type="secondary"
        copy="Cancel"
        @click="onCancel"
      />
      <BaseButton
        class="flex-1"
        type="primary"
        copy="Add"
        :disabled="!addButtonActive"
        @click="onAdd"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { generateID } from '~/model/helpers/idGenerator'
import { IDataConnection } from '~/model/IDataConnection'
import { IDataParameter } from '~/model/IDataParameter'
import { IVizParameter } from '~/model/IVizParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
export default Vue.extend({
  name: 'ModalParameterMapping',
  data() {
    return {
      actInputParam: undefined as IDataParameter | undefined,
      actMappingFunction: undefined as ParamMappingType | undefined,
      actOutputParam: undefined as IVizParameter | undefined,
    }
  },
  computed: {
    ...mapGetters('global', [
      GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC,
      GlobalStoreGetter.GET_MAPPING_FUNCTIONS,
      GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC,
    ]),
    addButtonActive(): boolean {
      return (
        this.actInputParam !== undefined &&
        this.actMappingFunction !== undefined &&
        this.actOutputParam !== undefined
      )
    },
  },
  methods: {
    onInputParamChanged(inputParam: IDataParameter) {
      this.actInputParam = inputParam
    },
    onMappingFunctionChanged(mappingFunction: ParamMappingType) {
      this.actMappingFunction = mappingFunction
    },
    onOutputParamChanged(outputParam: IVizParameter) {
      this.actOutputParam = outputParam
    },
    onCancel(): void {
      this.closeModal()
    },
    onAdd(): void {
      const newConnection: IDataConnection = {
        id: generateID(),
        dataParamId: this.actInputParam!.id,
        vizParamId: this.actOutputParam!.id,
        mappingType: this.actMappingFunction!,
      }
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`,
        newConnection
      )
      this.closeModal()
    },
    closeModal(): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_MAPPING_MODAL_STATE}`,
        false
      )
    },
  },
})
</script>

<style lang="scss" scoped>
.modal-parameter-mapping {
  &__container {
    > div {
      position: relative;
      margin-top: 20px;

      &::after {
        content: '';
        height: 20px;
        transform: translate3d();
        // absolute top-full left-1/2 w-2 transform -translate-x-1/2 bg-gray-300;
      }

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
