<template>
  <div>
    <template v-if="GET_DATA_PARAMS_NUMERIC">
      <MappingControl
        v-for="(param, key) in GET_DATA_PARAMS_NUMERIC"
        :key="'mapping-data-param-' + key"
        class="text-sm"
        :input-param="param"
        :mapping-functions="[]"
        :output-param-options="vizParams"
        @change="onParamChanged"
      />
    </template>
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
  name: 'ParameterMapping',
  computed: {
    ...mapGetters('global', [
      GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC,
      GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC,
    ]),
    vizParams() {
      return Object.values(this.GET_UNUSED_VIZ_PARAMS_NUMERIC)
    },
  },
  methods: {
    onParamChanged(
      dataParam: IDataParameter,
      mappingFunction: ParamMappingType | undefined,
      vizParam: IVizParameter | undefined
    ): void {
      // update mapping
      // search for existing dataConnection
      const existingConnection: IDataConnection = this.$store.getters[
        `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_DATA_CONNECTION_BY_DATA_PARAM_ID}`
      ](dataParam.id)
      if (!existingConnection) {
        if (!vizParam || !mappingFunction) {
          return
        }
        // add new connection
        if (vizParam && mappingFunction) {
          const newConnection: IDataConnection = {
            id: generateID(),
            dataParamId: dataParam.id,
            vizParamId: vizParam.id,
            mappingType: mappingFunction,
          }
          this.$store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`,
            newConnection
          )
        }
      } else {
        // remove connection
        if (!vizParam || !mappingFunction) {
          this.$store.commit(
            `${StoreModule.GLOBAL}/${GlobalStoreMutation.REMOVE_DATA_CONNECTION}`
          )
          return
        }
        // update connection
        const updatedConnection: IDataConnection = {
          id: existingConnection.id,
          dataParamId: dataParam.id,
          vizParamId: vizParam.id,
          mappingType: mappingFunction,
        }
        this.$store.commit(
          `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_CONNECTION}`,
          updatedConnection
        )
      }
    },
  },
})
</script>
