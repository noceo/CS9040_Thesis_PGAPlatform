import { mockState, mockStore } from '../store.mock'
import { getters } from './getters'

describe('>>> Getters', () => {
  const state = mockState()
  const store = mockStore()

  describe('>> getAllDataRows', () => {
    it('should return all DataRows from the store', () => {
      expect(getters.getAllDataRows.bind(store)(state)).toStrictEqual(
        state.dataRows
      )
    })
  })

  describe('>> getOneDataRowById', () => {
    it('should return one DataRow by provided id from the store', () => {
      const id = state.dataRows[0].id as number
      expect(getters.getOneDataRowById.bind(store)(state)(id)).toStrictEqual(
        state.dataRows[0]
      )
    })

    it('should return undefined if store has no such DataRow', () => {
      expect(getters.getOneDataRowById.bind(store)(state)(1111)).toBeUndefined()
    })
  })
})
