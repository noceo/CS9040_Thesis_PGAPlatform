import { MutationTree } from 'vuex'
import { IGlobalState, DataMode, IStoreVizParams } from '../state/state.types'
import { Mutations, GlobalStoreMutation } from './mutations.types'
import { IDataRowData } from '~/model/dataRow/dataRow.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'

export const mutations: MutationTree<IGlobalState> & Mutations = {
  // global mutations get defined here
  [GlobalStoreMutation.SET_DATAMODE](state, payload: DataMode) {
    state.dataMode = payload
  },
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state, payload: IDataRowData) {
    state.currentDataRow = payload
  },
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](state, payload: boolean) {
    state.visualizationActive = payload
  },
  [GlobalStoreMutation.SET_VIZ_DEBUG_STATE](state, payload: boolean) {
    state.vizDebugActive = payload
  },

  [GlobalStoreMutation.SET_DATA_PARAMS_NUMERIC](
    state,
    payload: Array<INumericDataParameter>
  ) {
    const dataParams: any = {}
    for (const element of payload) {
      dataParams[element.id] = element
    }
    state.dataParams.numeric = dataParams
  },
  [GlobalStoreMutation.REMOVE_DATA_PARAMS_NUMERIC](state) {
    // for (const dataType of Object.keys(state.dataParams)) {
    //   TODO: state.dataParams[dataType] = {}
    // }
    state.dataParams.numeric = {}
  },

  [GlobalStoreMutation.SET_VIZ_PARAMS](state, payload: IStoreVizParams) {
    state.vizParams = payload
  },

  [GlobalStoreMutation.ADD_DATA_CONNECTION](state, payload: IDataConnection) {
    state.dataConnections[payload.id] = payload
  },
  [GlobalStoreMutation.REMOVE_DATA_CONNECTION](state, payload: string) {
    delete state.dataConnections[payload]
  },
  [GlobalStoreMutation.UPDATE_DATA_CONNECTION](
    state,
    payload: IDataConnection
  ) {
    state.dataConnections[payload.id] = payload
  },
}
