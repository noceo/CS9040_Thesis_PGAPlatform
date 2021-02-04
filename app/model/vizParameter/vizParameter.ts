import { IStoreable } from '../helpers/IStorable'
import { IVizParameter } from './vizParameter.types'

export abstract class VizParameter implements IVizParameter, IStoreable {
  readonly id: string
  readonly name: string
  protected _value: any

  constructor(data: IVizParameter) {
    this.id = data.id
    this.name = data.name
  }

  abstract get value(): any
  abstract set value(newValue: any)

  abstract toStoreFormat(): object
}
