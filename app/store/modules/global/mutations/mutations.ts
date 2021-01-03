import { MutationTree } from 'vuex'
import { IGlobalState, DataMode } from '../state/state.types'
import { Mutations, GlobalStoreMutation } from './mutations.types'
import { IDataRow } from '~/model'

export const mutations: MutationTree<IGlobalState> & Mutations = {
  // global mutations get defined here
  [GlobalStoreMutation.SET_DATAMODE](state, payload: DataMode) {
    state.dataMode = payload
  },
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state, payload: IDataRow) {
    state.currentDataRow = payload
  },
}
