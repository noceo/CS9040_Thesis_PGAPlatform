import { IGlobalState } from '../state/state.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { ITextDataParameter } from '~/model/ITextDataParameter'
import { ILiveVizParameter } from '~/model/ILiveVizParameter'

export enum GlobalStoreGetter {
  GET_FILE_STATE = 'GET_FILE_STATE',
  GET_MAPPING_MODAL_STATE = 'GET_MAPPING_MODAL_STATE',
  GET_VIZ_DEBUG_STATE = 'GET_VIZ_DEBUG_STATE',
  GET_DATA_TRANSFER_STATE = 'GET_DATA_TRANSFER_STATE',

  GET_DATA_PARAMS_NUMERIC = 'GET_DATA_PARAMS_NUMERIC',
  GET_USED_DATA_PARAMS_NUMERIC = 'GET_USED_DATA_PARAMS_NUMERIC',
  GET_DATA_PARAM_NUMERIC_BY_ID = 'GET_DATA_PARAM_NUMERIC_BY_ID',
  GET_DATA_PARAMS_TEXT = 'GET_DATA_PARAMS_TEXT',

  GET_ALL_VIZ_PARAMS_NUMERIC = 'GET_ALL_VIZ_PARAMS_NUMERIC',
  GET_UNUSED_VIZ_PARAMS_NUMERIC = 'GET_UNUSED_VIZ_PARAMS_NUMERIC',
  GET_USED_VIZ_PARAMS_NUMERIC = 'GET_USED_VIZ_PARAMS_NUMERIC',
  GET_VIZ_PARAM_NUMERIC_BY_ID = 'GET_VIZ_PARAM_NUMERIC_BY_ID',

  GET_LIVE_PARAMS = 'GET_LIVE_PARAMS',

  GET_DATA_CONNECTIONS = 'GET_DATA_CONNECTIONS',
  GET_DATA_CONNECTION_BY_DATA_PARAM_ID = 'GET_DATA_CONNECTION_BY_DATA_PARAM_ID',

  GET_MAPPING_FUNCTIONS = 'GET_MAPPING_FUNCTIONS',
}

export type Getters = {
  // global getters get defined here
  [GlobalStoreGetter.GET_FILE_STATE](state: IGlobalState): boolean
  [GlobalStoreGetter.GET_MAPPING_MODAL_STATE](state: IGlobalState): boolean

  [GlobalStoreGetter.GET_DATA_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericDataParameter>
  [GlobalStoreGetter.GET_USED_DATA_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericDataParameter>
  [GlobalStoreGetter.GET_DATA_PARAM_NUMERIC_BY_ID](
    state: IGlobalState
  ): (param: string) => INumericDataParameter | undefined
  [GlobalStoreGetter.GET_DATA_PARAMS_TEXT](
    state: IGlobalState
  ): Array<ITextDataParameter>

  [GlobalStoreGetter.GET_ALL_VIZ_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericVizParameter>
  [GlobalStoreGetter.GET_UNUSED_VIZ_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericVizParameter>
  [GlobalStoreGetter.GET_USED_VIZ_PARAMS_NUMERIC](
    state: IGlobalState
  ): Array<INumericVizParameter>
  [GlobalStoreGetter.GET_VIZ_PARAM_NUMERIC_BY_ID](
    state: IGlobalState
  ): (param: string) => INumericVizParameter | undefined

  [GlobalStoreGetter.GET_LIVE_PARAMS](
    state: IGlobalState
  ): Array<ILiveVizParameter>

  [GlobalStoreGetter.GET_VIZ_DEBUG_STATE](state: IGlobalState): boolean
  [GlobalStoreGetter.GET_DATA_TRANSFER_STATE](state: IGlobalState): boolean

  [GlobalStoreGetter.GET_DATA_CONNECTIONS](
    state: IGlobalState
  ): Array<IDataConnection>
  [GlobalStoreGetter.GET_DATA_CONNECTION_BY_DATA_PARAM_ID](
    state: IGlobalState
  ): (param: string) => IDataConnection | undefined
  [GlobalStoreGetter.GET_MAPPING_FUNCTIONS](
    state: IGlobalState
  ): Array<ParamMappingType>
}
