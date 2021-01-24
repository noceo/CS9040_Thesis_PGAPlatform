/* eslint-disable no-dupe-class-members */
import { injectable } from 'inversify'
import Papa from 'papaparse'
import { IFileParser } from './FileParser.types'
import { IParseResult } from './IParseResult'

@injectable()
export class CSVParser implements IFileParser<any> {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  parse(file: File, config: object): IParseResult<any>
  parse(csv: string, config: object): IParseResult<any>
  parse(csv: any, config: any): IParseResult<any> {
    console.warn('PAPA PArsing')
    if (typeof config !== 'undefined') {
      return Papa.parse(csv, config)
    }
    return Papa.parse(csv)
  }
}
