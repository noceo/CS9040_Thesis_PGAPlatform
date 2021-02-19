import { IGlobalState } from '../state/state.types'
import { IDataRowData } from '~/model'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export enum GlobalStoreGetter {
  GET_CURRENT_DATAROW = 'GET_CURRENT_DATAROW',
  GET_VIZ_PARAMETERS = 'GET_VIZ_PARAMETERS',
  GET_VIZ_DEBUG_STATE = 'GET_VIZ_DEBUG_STATE',
}

export type Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_CURRENT_DATAROW](
    state: IGlobalState
  ): IDataRowData | undefined
  [GlobalStoreGetter.GET_VIZ_PARAMETERS](
    state: IGlobalState
  ): Array<VizParameter> | undefined
  [GlobalStoreGetter.GET_VIZ_DEBUG_STATE](
    state: IGlobalState
  ): boolean | undefined
}
