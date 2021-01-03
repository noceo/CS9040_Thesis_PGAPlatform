import { IDataField } from './dataField.types'

export abstract class DataField implements IDataField {
  name: string

  constructor(data: IDataField) {
    this.name = data.name
  }

  abstract validate(): boolean
}
