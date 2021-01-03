import { IDataRowData } from '~/model'

export enum DataMode {
  STATIC = 'STATIC',
  LIVE = 'LIVE',
}

export interface IGlobalState {
  // here all properties that belong to the global state get defined
  dataMode: DataMode
  currentDataRow?: IDataRowData
}
