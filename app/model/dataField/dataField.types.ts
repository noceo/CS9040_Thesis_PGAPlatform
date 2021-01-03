export interface IDataField {
  readonly name: string

  validate(): boolean
}
