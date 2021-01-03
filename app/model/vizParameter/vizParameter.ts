import { IVizParameterConstraint } from '../vizParameterConstraint/vizParameterConstraint.types'
import { IVizParameter } from './vizParameter.types'

export class VizParameter implements IVizParameter {
  readonly name: string
  readonly constraints?: Array<IVizParameterConstraint>

  constructor(data: IVizParameter) {
    this.name = data.name
    this.constraints = data.constraints
  }
}
