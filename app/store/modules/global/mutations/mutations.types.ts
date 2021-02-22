import { DataMode, IGlobalState, IStoreVizParams } from '../state/state.types'
import { IDataRowData } from '~/model/dataRow/dataRow.types'
import { IDataConnection } from '~/model/IDataConnection'
import { INumericDataParameter } from '~/model/INumericDataParameter'

export enum GlobalStoreMutation {
  SET_DATAMODE = 'SET_DATAMODE',
  SET_CURRENT_DATAROW = 'SET_CURRENT_DATAROW',

  SET_VISUALIZATION_ACTIVE = 'SET_VISUALIZATION_ACTIVE',
  SET_VIZ_DEBUG_STATE = 'SET_VIZ_DEBUG_STATE',

  SET_DATA_PARAMS_NUMERIC = 'SET_DATA_PARAMS',
  REMOVE_DATA_PARAMS_NUMERIC = 'REMOVE_DATA_PARAMS',

  SET_VIZ_PARAMS = 'SET_VIZ_PARAMS',

  ADD_DATA_CONNECTION = 'ADD_DATA_CONNECTION',
  REMOVE_DATA_CONNECTION = 'REMOVE_DATA_CONNECTION',
  UPDATE_DATA_CONNECTION = 'UPDATE_DATA_CONNECTION',
}

export type Mutations<S = IGlobalState> = {
  [GlobalStoreMutation.SET_DATAMODE](state: S, payload: DataMode): void
  [GlobalStoreMutation.SET_CURRENT_DATAROW](
    state: S,
    payload: IDataRowData
  ): void
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](
    state: S,
    payload: boolean
  ): void
  [GlobalStoreMutation.SET_VIZ_DEBUG_STATE](state: S, payload: boolean): void

  [GlobalStoreMutation.SET_DATA_PARAMS_NUMERIC](
    state: S,
    payload: Array<INumericDataParameter>
  ): void
  [GlobalStoreMutation.REMOVE_DATA_PARAMS_NUMERIC](
    state: S,
    payload: undefined
  ): void

  [GlobalStoreMutation.SET_VIZ_PARAMS](state: S, payload: IStoreVizParams): void

  [GlobalStoreMutation.ADD_DATA_CONNECTION](
    state: S,
    payload: IDataConnection
  ): void
  [GlobalStoreMutation.REMOVE_DATA_CONNECTION](state: S, payload: string): void
  [GlobalStoreMutation.UPDATE_DATA_CONNECTION](
    state: S,
    payload: IDataConnection
  ): void
}
