import { IVizParameter } from './IVizParameter'

export interface INumericVizParameter extends IVizParameter {
  value: number
  readonly min: number
  readonly max: number
  valueModifier: number
}
