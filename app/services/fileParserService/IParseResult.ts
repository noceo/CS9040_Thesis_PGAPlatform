import { IParseError } from './IParseError'
import { IParseMeta } from './IParseMeta'

export interface IParseResult<T> {
  data: Array<T>
  errors: Array<IParseError>
  meta: IParseMeta
}
