import { Module } from 'vuex'
import { getters } from './getters/getters'
import { actions } from './actions/actions'
import { mutations } from './mutations/mutations'
import { state } from './state/state'
import { IGlobalState } from './state/state.types'
import { IRootState } from '~/store/index'

const namespaced: boolean = true

export const global: Module<IGlobalState, IRootState> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
}
