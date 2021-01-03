import { GetterTree } from 'vuex'
import { IGlobalState } from '../state/state.types'
import { Getters, GlobalStoreGetter } from './getters.types'
import { IRootState } from '~/store/index'

export const getters: GetterTree<IGlobalState, IRootState> & Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_CURRENT_DATAROW]: (state) => {
    return state.currentDataRow
  },
}
