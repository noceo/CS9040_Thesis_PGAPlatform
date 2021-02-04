import { IDataField, IDataRowData } from '~/model'
import { VizParameter } from '~/model/vizParameter/vizParameter'

export enum DataMode {
  STATIC = 'STATIC',
  LIVE = 'LIVE',
}

export interface IGlobalState {
  // here all properties that belong to the global state get defined
  dataMode: DataMode
  currentDataRow?: IDataRowData
  dataFields?: Array<IDataField>
  vizParameters?: Array<VizParameter>
  visualizationActive: boolean
}
