import { ActionContext } from 'vuex'
import { Mutations } from '../mutations/mutations.types'
import { IGlobalState } from '../state/state.types'
import { IRootState } from '~/store'

export enum GlobalStoreAction {
  GET_CURRENT_DATAROW = 'GET_CURRENT_DATAROW',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<IGlobalState, IRootState>, 'commit'>

export interface Actions {
  // global actions get defined here
  // [GlobalStoreAction.GET_CURRENT_DATAROW](
  //   { commit }: AugmentedActionContext,
  //   payload: number
  // ): void
}
