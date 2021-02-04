import { MutationTree } from 'vuex'
import { IGlobalState, DataMode } from '../state/state.types'
import { Mutations, GlobalStoreMutation } from './mutations.types'
import { IDataField, IDataRow } from '~/model'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export const mutations: MutationTree<IGlobalState> & Mutations = {
  // global mutations get defined here
  [GlobalStoreMutation.SET_DATAMODE](state, payload: DataMode) {
    state.dataMode = payload
  },
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state, payload: IDataRow) {
    state.currentDataRow = payload
  },
  [GlobalStoreMutation.SET_DATAFIELDS](state, payload: Array<IDataField>) {
    state.dataFields = payload
  },
  [GlobalStoreMutation.SET_VIZ_PARAMETERS](
    state,
    payload: Array<VizParameter>
  ) {
    const vizParameters: any = {}
    payload.forEach((element) => {
      const param = element.toStoreFormat()
      vizParameters[element.id] = param
    })
    state.vizParameters = vizParameters
  },
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](state, payload: boolean) {
    state.visualizationActive = payload
  },
}
