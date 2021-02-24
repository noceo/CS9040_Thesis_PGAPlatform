import {
  DataMode,
  IGlobalState,
  IStoreLiveParams,
  IStoreVizParams,
} from '../state/state.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { IVizParameter } from '~/model/IVizParameter'
import { ITextDataParameter } from '~/model/ITextDataParameter'

export enum GlobalStoreMutation {
  SET_FILE_STATE = 'SET_FILE_STATE',
  SET_MAPPING_MODAL_STATE = 'SET_MAPPING_MODAL_STATE',
  SET_DATAMODE = 'SET_DATAMODE',

  SET_VISUALIZATION_ACTIVE = 'SET_VISUALIZATION_ACTIVE',
  SET_VIZ_DEBUG_STATE = 'SET_VIZ_DEBUG_STATE',
  SET_DATA_TRANSFER_STATE = 'SET_DATA_TRANSFER_STATE',

  SET_DATA_PARAMS_NUMERIC = 'SET_DATA_PARAMS',
  UPDATE_DATA_PARAM_NUMERIC_BY_NAME = 'UPDATE_DATA_PARAM_NUMERIC_BY_NAME',
  SET_DATA_PARAMS_TEXT = 'SET_DATA_PARAMS_TEXT',
  UPDATE_DATA_PARAM_TEXT_BY_NAME = 'UPDATE_DATA_PARAM_TEXT_BY_NAME',
  REMOVE_DATA_PARAMS = 'REMOVE_DATA_PARAMS',

  SET_VIZ_PARAMS = 'SET_VIZ_PARAMS',
  UPDATE_VIZ_PARAM_NUMERIC = 'UPDATE_VIZ_PARAM_NUMERIC',
  SET_VALUE_MODIFIER = 'SET_VALUE_MODIFIER',

  SET_LIVE_PARAMS = 'SET_LIVE_PARAMS',
  UPDATE_LIVE_PARAM = 'UPDATE_LIVE_PARAM',

  ADD_DATA_CONNECTION = 'ADD_DATA_CONNECTION',
  REMOVE_DATA_CONNECTION = 'REMOVE_DATA_CONNECTION',
  UPDATE_DATA_CONNECTION = 'UPDATE_DATA_CONNECTION',

  SET_MAPPING_FUNCTIONS = 'SET_MAPPING_FUNCTIONS',
}

export type Mutations<S = IGlobalState> = {
  [GlobalStoreMutation.SET_MAPPING_MODAL_STATE](
    state: S,
    payload: boolean
  ): void
  [GlobalStoreMutation.SET_DATAMODE](state: S, payload: DataMode): void
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](
    state: S,
    payload: boolean
  ): void
  [GlobalStoreMutation.SET_VIZ_DEBUG_STATE](state: S, payload: boolean): void
  [GlobalStoreMutation.SET_DATA_TRANSFER_STATE](
    state: S,
    payload: boolean
  ): void

  [GlobalStoreMutation.SET_DATA_PARAMS_NUMERIC](
    state: S,
    payload: Array<INumericDataParameter>
  ): void
  [GlobalStoreMutation.UPDATE_DATA_PARAM_NUMERIC_BY_NAME](
    state: S,
    payload: { name: string; value: number }
  ): void
  [GlobalStoreMutation.SET_DATA_PARAMS_TEXT](
    state: S,
    payload: Array<ITextDataParameter>
  ): void
  [GlobalStoreMutation.UPDATE_DATA_PARAM_TEXT_BY_NAME](
    state: S,
    payload: { name: string; value: string }
  ): void
  [GlobalStoreMutation.REMOVE_DATA_PARAMS](state: S, payload: undefined): void

  [GlobalStoreMutation.SET_VIZ_PARAMS](state: S, payload: IStoreVizParams): void
  [GlobalStoreMutation.UPDATE_VIZ_PARAM_NUMERIC](
    state: S,
    payload: IVizParameter
  ): void
  [GlobalStoreMutation.SET_VALUE_MODIFIER](
    state: S,
    payload: { vizParamId: string; modifierValue: number }
  ): void

  [GlobalStoreMutation.SET_LIVE_PARAMS](
    state: S,
    payload: IStoreLiveParams
  ): void
  [GlobalStoreMutation.UPDATE_LIVE_PARAM](
    state: S,
    payload: { id: string; value: number }
  ): void

  [GlobalStoreMutation.ADD_DATA_CONNECTION](
    state: S,
    payload: IDataConnection
  ): void
  [GlobalStoreMutation.REMOVE_DATA_CONNECTION](
    state: S,
    payload: IDataConnection
  ): void
  [GlobalStoreMutation.UPDATE_DATA_CONNECTION](
    state: S,
    payload: IDataConnection
  ): void

  [GlobalStoreMutation.SET_MAPPING_FUNCTIONS](
    state: S,
    payload: Array<ParamMappingType>
  ): void
}
