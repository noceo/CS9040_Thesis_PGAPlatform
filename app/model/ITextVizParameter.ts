import { IVizParameter } from './IVizParameter'

export interface ITextVizParameter extends IVizParameter {
  regex: string
  value: string
}
