import { IDataField } from '../dataField'

export interface INumericDataField extends IDataField {
  readonly value: number
  readonly min?: number
  readonly max?: number
}
