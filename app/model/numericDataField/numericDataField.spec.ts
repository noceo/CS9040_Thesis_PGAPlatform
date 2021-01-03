import { NumericDataField } from './numericDataField'
import { mockNumericDataField } from './numericDataField.mock'

describe('>>> NumericDataField', () => {
  describe('>>> validate', () => {
    it('should fail if there is no numeric value provided', () => {
      const entity = new NumericDataField({
        ...mockNumericDataField()[0],
        value: 7,
      })
      expect(entity.validate()).toBeFalsy()
    })
  })
})
