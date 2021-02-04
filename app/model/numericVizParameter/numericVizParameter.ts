import { INumericVizParameter } from './numericVizParameter.types'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export class NumericVizParameter
  extends VizParameter
  implements INumericVizParameter {
  private _min: number
  private _max: number
  protected _value: number

  constructor(data: INumericVizParameter) {
    super({ id: data.id, name: data.name })
    this._min = data.min
    this._max = data.max
    this._value = data.value
  }

  get min() {
    return this._min
  }

  set min(newMin: number) {
    this._min = newMin
  }

  get max() {
    return this._max
  }

  set max(newMax: number) {
    this._min = newMax
  }

  get value(): number {
    return this._value
  }

  set value(newValue: number) {
    if (typeof newValue !== 'undefined') {
      if (this._min <= newValue && newValue <= this._max) {
        this._value = newValue
      }
    }
  }

  toStoreFormat(): object {
    const obj: any = {}
    Object.entries(this).forEach((entry) => {
      obj[entry[0]] = entry[1]
    })
    return obj
  }
}
