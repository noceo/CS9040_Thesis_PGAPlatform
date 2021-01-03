import { IGlobalState } from '../state/state.types'
import { IDataRowData } from '~/model'

export enum GlobalStoreGetter {
  GET_CURRENT_DATAROW = 'GET_CURRENT_DATAROW',
}

export type Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_CURRENT_DATAROW](
    state: IGlobalState
  ): IDataRowData | undefined
}
