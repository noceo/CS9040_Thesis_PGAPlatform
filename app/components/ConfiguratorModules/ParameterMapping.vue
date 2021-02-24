<template>
  <div>
    <ConnectionInfo
      v-for="(connection, key) in dataConnections"
      :key="'mapping-data-connection-' + key"
      class="text-sm"
      :connection-id="connection.id"
      :input-param="connection.inputParam"
      :mapping-function="connection.mappingFunction"
      :output-param="connection.outputParam"
      @remove="removeDataConnection"
    />
    <BaseButton
      v-if="fileStatus"
      type="primary"
      @click="openModalParameterMapping"
    >
      <PlusIcon />
    </BaseButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
// import { generateID } from '~/model/helpers/idGenerator'
import { IDataConnection } from '~/model/IDataConnection'
import { IDataParameter } from '~/model/IDataParameter'
import { IVizParameter } from '~/model/IVizParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { GlobalStoreGetter } from '~/store/modules/global/getters/getters.types'
import { GlobalStoreMutation } from '~/store/modules/global/mutations/mutations.types'
import { StoreModule } from '~/store/store-modules'
import PlusIcon from '~/assets/icons/outline/plus.svg?inline'

interface Connection {
  id: string
  inputParam: IDataParameter
  mappingFunction: ParamMappingType
  outputParam: IVizParameter
}

export default Vue.extend({
  name: 'ParameterMapping',
  components: { PlusIcon },
  computed: {
    ...mapGetters('global', {
      fileStatus: GlobalStoreGetter.GET_FILE_STATE,
      storedDataConnections: GlobalStoreGetter.GET_DATA_CONNECTIONS,
    }),
    dataConnections(): Array<Connection> {
      const connections = []
      const storedConnections: Array<IDataConnection> = Object.values(
        this.storedDataConnections
      )
      for (const element of storedConnections) {
        const inputParam: IDataParameter = this.$store.getters[
          `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_DATA_PARAM_NUMERIC_BY_ID}`
        ](element.dataParamId)
        const mappingFunction: ParamMappingType = element.mappingType
        const outputParam: IVizParameter = this.$store.getters[
          `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_VIZ_PARAM_NUMERIC_BY_ID}`
        ](element.vizParamId)
        connections.push({
          id: element.id,
          inputParam,
          mappingFunction,
          outputParam,
        })
      }
      return connections
    },
  },
  methods: {
    openModalParameterMapping(): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.SET_MAPPING_MODAL_STATE}`,
        true
      )
    },
    removeDataConnection(connection: IDataConnection): void {
      this.$store.commit(
        `${StoreModule.GLOBAL}/${GlobalStoreMutation.REMOVE_DATA_CONNECTION}`,
        connection
      )
    },
    // onParamChanged(
    //   dataParam: IDataParameter,
    //   mappingFunction: ParamMappingType | undefined,
    //   vizParam: IVizParameter | undefined
    // ): void {
    //   // update mapping
    //   // search for existing dataConnection
    //   const existingConnection: IDataConnection = this.$store.getters[
    //     `${StoreModule.GLOBAL}/${GlobalStoreGetter.GET_DATA_CONNECTION_BY_DATA_PARAM_ID}`
    //   ](dataParam.id)
    //   if (!existingConnection) {
    //     if (!vizParam || !mappingFunction) {
    //       return
    //     }
    //     // add new connection
    //     if (vizParam && mappingFunction) {
    //       const newConnection: IDataConnection = {
    //         id: generateID(),
    //         dataParamId: dataParam.id,
    //         vizParamId: vizParam.id,
    //         mappingType: mappingFunction,
    //       }
    //       this.$store.commit(
    //         `${StoreModule.GLOBAL}/${GlobalStoreMutation.ADD_DATA_CONNECTION}`,
    //         newConnection
    //       )
    //     }
    //   } else {
    //     // remove connection
    //     if (!vizParam || !mappingFunction) {
    //       this.$store.commit(
    //         `${StoreModule.GLOBAL}/${GlobalStoreMutation.REMOVE_DATA_CONNECTION}`
    //       )
    //       return
    //     }
    //     // update connection
    //     const updatedConnection: IDataConnection = {
    //       id: existingConnection.id,
    //       dataParamId: dataParam.id,
    //       vizParamId: vizParam.id,
    //       mappingType: mappingFunction,
    //     }
    //     this.$store.commit(
    //       `${StoreModule.GLOBAL}/${GlobalStoreMutation.UPDATE_DATA_CONNECTION}`,
    //       updatedConnection
    //     )
    //   }
    // },
  },
})
</script>
