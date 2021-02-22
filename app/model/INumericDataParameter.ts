import { IDataParameter } from './IDataParameter'

export interface INumericDataParameter extends IDataParameter {
  readonly value: number
  readonly min?: number
  readonly max?: number
}
