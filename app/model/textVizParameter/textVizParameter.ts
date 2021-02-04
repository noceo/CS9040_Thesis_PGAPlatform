import { ITextVizParameter } from './textVizParameter.types'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export class TextVizParameter
  extends VizParameter
  implements ITextVizParameter {
  private _regex: string
  protected _value: string

  constructor(data: ITextVizParameter) {
    super({ id: data.id, name: data.name })
    this._regex = data.regex
    this._value = data.value
  }

  get regex() {
    return this._regex
  }

  set regex(newRegex: string) {
    this._regex = newRegex
  }

  get value(): string {
    return this._value
  }

  set value(newValue: string) {
    if (typeof newValue !== 'undefined') {
      this._value = newValue
    }
  }

  toStoreFormat(): object {
    const obj: object = {}
    Object.entries(this).forEach((entry) => {
      Object.assign(obj, entry)
    })
    return obj
  }
}
