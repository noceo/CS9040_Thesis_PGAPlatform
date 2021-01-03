import { DataMode, IGlobalState } from '../state/state.types'
import { IDataRow } from '~/model/dataRow/dataRow.types'

export enum GlobalStoreMutation {
  SET_DATAMODE = 'SET_DATAMODE',
  SET_CURRENT_DATAROW = 'SET_CURRENT_DATAROW',
}

export type Mutations<S = IGlobalState> = {
  [GlobalStoreMutation.SET_DATAMODE](state: S, payload: DataMode): void
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state: S, payload: IDataRow): void
}
