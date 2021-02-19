import { DataMode, IGlobalState } from '../state/state.types'
import { IDataRow } from '~/model/dataRow/dataRow.types'
import { IDataField } from '~/model'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export enum GlobalStoreMutation {
  SET_DATAMODE = 'SET_DATAMODE',
  SET_CURRENT_DATAROW = 'SET_CURRENT_DATAROW',
  SET_DATAFIELDS = 'SET_DATAFIELDS',
  SET_VIZ_PARAMETERS = 'SET_VIZ_PARAMETERS',
  SET_VISUALIZATION_ACTIVE = 'SET_VISUALIZATION_ACTIVE',
  SET_VIZ_DEBUG_STATE = 'SET_VIZ_DEBUG_STATE',
}

export type Mutations<S = IGlobalState> = {
  [GlobalStoreMutation.SET_DATAMODE](state: S, payload: DataMode): void
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state: S, payload: IDataRow): void
  [GlobalStoreMutation.SET_DATAFIELDS](
    state: S,
    payload: Array<IDataField>
  ): void
  [GlobalStoreMutation.SET_VIZ_PARAMETERS](
    state: S,
    payload: Array<VizParameter>
  ): void
  [GlobalStoreMutation.SET_VISUALIZATION_ACTIVE](
    state: S,
    payload: boolean
  ): void
  [GlobalStoreMutation.SET_VIZ_DEBUG_STATE](state: S, payload: boolean): void
}
