import { IDataParameter } from './IDataParameter'

export interface INumericDataParameter extends IDataParameter {
  value: number
  readonly min: number
  readonly max: number
}
