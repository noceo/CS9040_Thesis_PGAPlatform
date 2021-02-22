import { GetterTree } from 'vuex'
import { IGlobalState } from '../state/state.types'
import { Getters, GlobalStoreGetter } from './getters.types'
import { IRootState } from '~/store/index'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { IDataConnection } from '~/model/IDataConnection'

export const getters: GetterTree<IGlobalState, IRootState> & Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_CURRENT_DATAROW]: (state: IGlobalState) => {
    return state.currentDataRow
  },
  [GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC]: (state: IGlobalState) => {
    const params: Array<INumericDataParameter> = []
    for (const element of Object.values(state.dataParams.numeric)) {
      params.push(element)
    }
    return params
  },
  [GlobalStoreGetter.GET_ALL_VIZ_PARAMS_NUMERIC]: (state: IGlobalState) => {
    const params: Array<INumericVizParameter> = []
    for (const element of Object.values(state.vizParams.numeric)) {
      params.push(element)
    }
    return params
  },
  [GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC]: (state: IGlobalState) => {
    return Object.values(state.vizParams.numeric).filter(
      (element) => element.dataConnectionId === ''
    )
  },
  [GlobalStoreGetter.GET_VIZ_DEBUG_STATE]: (state: IGlobalState) => {
    return state.vizDebugActive
  },
  [GlobalStoreGetter.GET_DATA_CONNECTIONS]: (state: IGlobalState) => {
    const dataConnections: Array<IDataConnection> = []
    for (const element of Object.values(state.dataConnections)) {
      dataConnections.push(element)
    }
    return dataConnections
  },
  [GlobalStoreGetter.GET_DATA_CONNECTION_BY_DATA_PARAM_ID]: (
    state: IGlobalState
  ) => (paramId: string) => {
    return Object.values(state.dataConnections).find(
      (connection) => connection.dataParamId === paramId
    )
  },
}
