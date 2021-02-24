export interface IDataManager {
  processNewFile(file: File, parserConfig: object): Promise<any>
  startDataPropagation(): void
  stopDataPropagation(): void
}
