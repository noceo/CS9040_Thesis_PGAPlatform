import { NumericDataField } from './numericDataField'
import { INumericDataField } from './numericDataField.types'

const mock = (): Array<INumericDataField> => [
  {
    name: 'test',
    value: 5,
  },
  {
    name: 'test',
    value: 10.5,
  },
]

export const mockNumericDataField = (
  data: Array<INumericDataField> = mock()
): Array<INumericDataField> => data.map((item) => new NumericDataField(item))
