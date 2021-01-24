import { DataMode, IGlobalState } from '../state/state.types'
import { IDataRow } from '~/model/dataRow/dataRow.types'
import { IDataField } from '~/model'

export enum GlobalStoreMutation {
  SET_DATAMODE = 'SET_DATAMODE',
  SET_CURRENT_DATAROW = 'SET_CURRENT_DATAROW',
  SET_DATAFIELDS = 'SET_DATAFIELDS',
}

export type Mutations<S = IGlobalState> = {
  [GlobalStoreMutation.SET_DATAMODE](state: S, payload: DataMode): void
  [GlobalStoreMutation.SET_CURRENT_DATAROW](state: S, payload: IDataRow): void
  [GlobalStoreMutation.SET_DATAFIELDS](
    state: S,
    payload: Array<IDataField>
  ): void
}
