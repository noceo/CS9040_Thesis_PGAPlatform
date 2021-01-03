import { IVizParameterConstraint } from '../vizParameterConstraint/vizParameterConstraint.types'

export interface IVizParameter {
  readonly name: string
  readonly constraints?: Array<IVizParameterConstraint>
}
