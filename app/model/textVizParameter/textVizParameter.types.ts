import { IVizParameter } from '../vizParameter/vizParameter.types'

export interface ITextVizParameter extends IVizParameter {
  regex: string
  value: string
}
