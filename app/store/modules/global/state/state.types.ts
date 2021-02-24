import { IDataConnection } from '~/model/IDataConnection'
import { ITextVizParameter } from '~/model/ITextVizParameter'
import { INumericVizParameter } from '~/model/INumericVizParameter'
import { INumericDataParameter } from '~/model/INumericDataParameter'
import { ParamMappingType } from '~/model/ParamMappingType'
import { ITextDataParameter } from '~/model/ITextDataParameter'
import { ILiveVizParameter } from '~/model/ILiveVizParameter'

export enum DataMode {
  STATIC = 'STATIC',
  LIVE = 'LIVE',
}

export interface IStoreDataParams {
  numeric: { [key: string]: INumericDataParameter }
  text: { [key: string]: ITextDataParameter }
}

export interface IStoreVizParams {
  numeric: { [key: string]: INumericVizParameter }
  text: { [key: string]: ITextVizParameter }
}

export interface IStoreLiveParams {
  [key: string]: ILiveVizParameter
}

export interface IStoreDataConnections {
  [key: string]: IDataConnection
}

export interface IGlobalState {
  // here all properties that belong to the global state get defined
  fileExists: boolean
  mappingModalOpened: boolean
  dataMode: DataMode
  dataParams: IStoreDataParams
  vizParams: IStoreVizParams
  liveParams: IStoreLiveParams
  visualizationActive: boolean
  vizDebugActive: boolean
  dataTransferActive: boolean
  dataConnections: IStoreDataConnections
  mappingFunctions: Array<ParamMappingType>
}
