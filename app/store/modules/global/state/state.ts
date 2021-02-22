import { IGlobalState, DataMode } from './state.types'

export const state: IGlobalState = {
  // here all properties that belong to the global state get saved
  dataMode: DataMode.STATIC,
  currentDataRow: undefined,
  dataParams: {
    numeric: {},
  },
  vizParams: {
    numeric: {},
    text: {},
  },
  visualizationActive: false,
  vizDebugActive: false,
  dataConnections: {},
}
