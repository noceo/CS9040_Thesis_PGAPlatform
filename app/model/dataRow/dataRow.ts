import { IDataField } from '../dataField'
import { ISerializable } from '../interfaces/ISerializable'
import { IDataRow, IDataRowData } from './dataRow.types'

export class DataRow implements IDataRow, ISerializable {
  readonly id: number
  readonly timestamp: string
  readonly dataFields: Array<IDataField>

  constructor(data: IDataRowData) {
    this.id = data.id
    this.timestamp = data.timestamp
    this.dataFields = data.dataFields
  }

  serialize(): string {
    return JSON.stringify(this)
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
