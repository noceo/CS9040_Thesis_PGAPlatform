import { ActionTree } from 'vuex'
import { IGlobalState } from '../state/state.types'
import { Actions } from './actions.types'
import { IRootState } from '~/store/index'

export const actions: ActionTree<IGlobalState, IRootState> & Actions = {
  // global actions get defined here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // [GlobalStoreAction.GET_CURRENT_DATAROW]({ commit }) {},
}
