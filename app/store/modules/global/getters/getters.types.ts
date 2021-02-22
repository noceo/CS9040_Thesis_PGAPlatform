import { IGlobalState } from '../state/state.types'
import { IDataRowData } from '~/model/dataRow/dataRow.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { INumericVizParameter } from '~/model/INumericVizParameter'

export enum GlobalStoreGetter {
  GET_CURRENT_DATAROW = 'GET_CURRENT_DATAROW',
  GET_VIZ_DEBUG_STATE = 'GET_VIZ_DEBUG_STATE',

  GET_DATA_PARAMS_NUMERIC = 'GET_DATA_PARAMS_NUMERIC',

  GET_ALL_VIZ_PARAMS_NUMERIC = 'GET_ALL_VIZ_PARAMS_NUMERIC',
  GET_UNUSED_VIZ_PARAMS_NUMERIC = 'GET_UNUSED_VIZ_PARAMS_NUMERIC',

  GET_DATA_CONNECTIONS = 'GET_DATA_CONNECTION',
  GET_DATA_CONNECTION_BY_DATA_PARAM_ID = 'GET_DATA_CONNECTION_BY_DATA_PARAM_ID',
}

export type Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_CURRENT_DATAROW](
    state: IGlobalState
  ): IDataRowData | undefined

  [GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericDataParameter>

  [GlobalStoreGetter.GET_ALL_VIZ_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericVizParameter>
  [GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericVizParameter>

  [GlobalStoreGetter.GET_VIZ_DEBUG_STATE](state: IGlobalState): boolean

  [GlobalStoreGetter.GET_DATA_CONNECTIONS](
    state: IGlobalState
  ): Array<IDataConnection>
  [GlobalStoreGetter.GET_DATA_CONNECTION_BY_DATA_PARAM_ID](
    state: IGlobalState
  ): (param: string) => IDataConnection | undefined
}
