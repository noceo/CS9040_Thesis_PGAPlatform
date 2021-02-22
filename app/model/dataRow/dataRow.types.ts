import { IDataParameter } from '../dataParameter/dataParameter.types'

export interface IDataRowData {
  readonly id: number
  readonly timestamp: string
  readonly dataFields: Array<IDataParameter>
}

export interface IDataRow extends IDataRowData {
  validate(): boolean
}
