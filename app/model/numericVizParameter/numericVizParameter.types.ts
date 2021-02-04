import { IVizParameter } from '../vizParameter/vizParameter.types'

export interface INumericVizParameter extends IVizParameter {
  min: number
  max: number
  value: number
}
