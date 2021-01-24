import { IGlobalState, DataMode } from './state.types'

export const state: IGlobalState = {
  // here all properties that belong to the global state get saved
  dataMode: DataMode.STATIC,
  currentDataRow: undefined,
  dataFields: undefined,
}
