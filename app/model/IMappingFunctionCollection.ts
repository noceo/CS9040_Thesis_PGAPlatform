import { ParamMappingType } from './ParamMappingType'

export type IMappingFunctionCollection = {
  [key in ParamMappingType]: (
    input: number,
    orgRangeStart: number,
    orgRangeEnd: number,
    destRangeStart: number,
    destRangeEnd: number
  ) => any
}
