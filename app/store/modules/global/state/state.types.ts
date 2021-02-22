import { IDataConnection } from '~/model/IDataConnection'
import { IDataRowData } from '~/model/dataRow/dataRow.types'
import { ITextVizParameter } from '~/model/ITextVizParameter'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { INumericDataParameter } from '~/model/INumericDataParameter'

export enum DataMode {
  STATIC = 'STATIC',
  LIVE = 'LIVE',
}

export interface IStoreDataParams {
  numeric: {
    [key: string]: INumericDataParameter
  }
}

export interface IStoreVizParams {
  numeric: { [key: string]: INumericVizParameter }
  text: { [key: string]: ITextVizParameter }
}

export interface IStoreDataConnections {
  [key: string]: IDataConnection
}

export interface IGlobalState {
  // here all properties that belong to the global state get defined
  dataMode: DataMode
  currentDataRow?: IDataRowData
  dataParams: IStoreDataParams
  vizParams: IStoreVizParams
  visualizationActive: boolean
  vizDebugActive: boolean
  dataConnections: IStoreDataConnections
}
