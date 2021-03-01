import { MutationTree } from 'vuex'
import Vue from 'vue'
import {
  IGlobalState,
  DataMode,
  IStoreVizParams,
  IStoreLiveParams,
} from '../state/state.types'
import { Mutations, GlobalStoreMutation } from './mutations.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { ITextDataParameter } from '~/model/ITextDataParameter'

export const mutations: MutationTree<IGlobalState> & Mutations = {
  // global mutations get defined here
  [GlobalStoreMutation.SET_FILE_STATE](state, payload: boolean) {
    state.fileExists = payload
  },
  [GlobalStoreMutation.SET_EXPORT_STATE](state, payload: boolean) {
    state.exportFile = payload
  },
  [GlobalStoreMutation.SET_GENERATE_STATE](state, payload: boolean) {
    state.generateStatic = payload
  },
  [GlobalStoreMutation.SET_MAPPING_MODAL_STATE](state, payload: boolean) {
    state.mappingModalOpened = payload
  },
  [GlobalStoreMutation.SET_DATAMODE](state, payload: DataMode) {
    state.dataMode = payload
  },
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](state, payload: boolean) {
    state.visualizationActive = payload
  },
  [GlobalStoreMutation.SET_VIZ_DEBUG_STATE](state, payload: boolean) {
    state.vizDebugActive = payload
  },
  [GlobalStoreMutation.SET_DATA_TRANSFER_STATE](state, payload: boolean) {
    state.dataTransferActive = payload
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
  [GlobalStoreMutation.UPDATE_DATA_PARAM_NUMERIC_BY_NAME](
    state,
    payload: { name: string; value: number }
  ) {
    const foundDataParam = Object.values(state.dataParams.numeric).find(
      (dataParam) => dataParam.name === payload.name
    )
    if (foundDataParam) {
      state.dataParams.numeric[foundDataParam.id].value = payload.value
    }
  },
  [GlobalStoreMutation.UPDATE_DATA_PARAM_TEXT_BY_NAME](
    state,
    payload: { name: string; value: string }
  ) {
    const foundDataParam = Object.values(state.dataParams.text).find(
      (dataParam) => dataParam.name === payload.name
    )
    if (foundDataParam) {
      state.dataParams.text[foundDataParam.id].value = payload.value
    }
  },
  [GlobalStoreMutation.SET_DATA_PARAMS_TEXT](
    state,
    payload: Array<ITextDataParameter>
  ) {
    const dataParams: any = {}
    for (const element of payload) {
      dataParams[element.id] = element
    }
    state.dataParams.text = dataParams
  },
  [GlobalStoreMutation.REMOVE_DATA_PARAMS](state) {
    state.dataParams.numeric = {}
    state.dataParams.text = {}
    state.dataConnections = {}
  },

  [GlobalStoreMutation.SET_VIZ_PARAMS](state, payload: IStoreVizParams) {
    state.vizParams = payload
  },
  [GlobalStoreMutation.UPDATE_VIZ_PARAM_NUMERIC](
    state,
    payload: INumericVizParameter
  ) {
    state.vizParams.numeric[payload.id] = payload
  },
  [GlobalStoreMutation.SET_VALUE_MODIFIER](
    state,
    payload: { vizParamId: string; modifierValue: number }
  ) {
    // TODO: Check if vizParamId is set
    if (state.vizParams.numeric[payload.vizParamId]) {
      state.vizParams.numeric[payload.vizParamId].valueModifier =
        payload.modifierValue
    }
  },

  [GlobalStoreMutation.SET_LIVE_PARAMS](state, payload: IStoreLiveParams) {
    for (const param of Object.values(payload)) {
      Vue.set(state.liveParams, param.id, param)
    }
  },
  [GlobalStoreMutation.UPDATE_LIVE_PARAM](
    state,
    payload: { id: string; value: number }
  ) {
    state.liveParams[payload.id].value = payload.value
  },

  [GlobalStoreMutation.ADD_DATA_CONNECTION](state, payload: IDataConnection) {
    // Vue.set() required because of reactivity issues
    Vue.set(state.dataConnections, payload.id, payload)
    state.dataParams.numeric[payload.dataParamId].dataConnectionId = payload.id
    let vizParam: any
    for (const vizParamCategory of Object.values(state.vizParams)) {
      vizParam = Object.values(vizParamCategory).find(
        (param: any) => param.id === payload.vizParamId
      )
      if (vizParam) {
        break
      }
    }
    if (vizParam) {
      vizParam.dataConnectionId = payload.id
    }
  },
  [GlobalStoreMutation.REMOVE_DATA_CONNECTION](
    state,
    payload: IDataConnection
  ) {
    state.dataParams.numeric[payload.dataParamId].dataConnectionId = ''
    let vizParam: any
    for (const vizParamCategory of Object.values(state.vizParams)) {
      vizParam = Object.values(vizParamCategory).find(
        (param: any) => param.id === payload.vizParamId
      )
      if (vizParam) {
        break
      }
    }
    if (vizParam) {
      vizParam.dataConnectionId = ''
    }
    Vue.delete(state.dataConnections, payload.id)
  },
  [GlobalStoreMutation.UPDATE_DATA_CONNECTION](
    state,
    payload: IDataConnection
  ) {
    state.dataConnections[payload.id] = payload
  },

  [GlobalStoreMutation.SET_MAPPING_FUNCTIONS](
    state,
    payload: Array<ParamMappingType>
  ) {
    state.mappingFunctions = payload
  },
}
