import { DataRow } from './dataRow'
import { mockDataRow } from './dataRow.mock'
describe('>>> DataRow', () => {
  describe('>>> validate', () => {
    it('should fail validation if id is a negative number', () => {
      const dataRow = new DataRow({
        ...mockDataRow()[0],
        id: -1,
      })
      expect(dataRow.validate()).toBeFalsy()
    })
  })
})
