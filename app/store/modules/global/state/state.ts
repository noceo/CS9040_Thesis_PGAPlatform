import { IGlobalState, DataMode } from './state.types'

export const state: IGlobalState = {
  // here all properties that belong to the global state get saved
  fileExists: false,
  mappingModalOpened: true,
  dataMode: DataMode.STATIC,
  dataParams: {
    numeric: {},
    text: {},
  },
  vizParams: {
    numeric: {},
    text: {},
  },
  visualizationActive: false,
  vizDebugActive: false,
  dataTransferActive: false,
  dataConnections: {},
  mappingFunctions: [],
}
