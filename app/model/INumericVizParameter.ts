import { IVizParameter } from './IVizParameter'

export interface INumericVizParameter extends IVizParameter {
  value: number
  min: number
  max: number
}
