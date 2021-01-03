import { IDataField } from '../dataField'

export interface IDataRowData {
  readonly id: number
  readonly timestamp: string
  readonly dataFields: Array<IDataField>
}

export interface IDataRow extends IDataRowData {
  validate(): boolean
}
