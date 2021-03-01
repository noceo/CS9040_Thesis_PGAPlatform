import { IGlobalState, DataMode } from './state.types'

export const state: IGlobalState = {
  // here all properties that belong to the global state get saved
  fileExists: false,
  exportFile: false,
  generateStatic: false,
  mappingModalOpened: false,
  dataMode: DataMode.LIVE,
  dataParams: {
    numeric: {},
    text: {},
  },
  vizParams: {
    numeric: {},
    text: {},
  },
  liveParams: {},
  visualizationActive: false,
  vizDebugActive: false,
  dataTransferActive: false,
  dataConnections: {},
  mappingFunctions: [],
}
