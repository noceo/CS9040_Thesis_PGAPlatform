import { IParseResult } from './IParseResult'

export interface IFileParser<T> {
  parse(file: File, config: object): IParseResult<T>
  parse(csv: string, config: object): IParseResult<T>
}
