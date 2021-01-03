import { DataField } from '../dataField'
import { INumericDataField } from './numericDataField.types'

export class NumericDataField extends DataField implements INumericDataField {
  readonly value: number
  readonly min?: number
  readonly max?: number

  constructor(data: INumericDataField) {
    super(data)
    this.value = data.value
  }

  validate(): boolean {
    if (typeof this.min !== 'undefined' && typeof this.max !== 'undefined') {
      return Number.isFinite(this.value) && this.min < this.max
    }
    return false
  }
}
