import { IMappingFunctionCollection } from '~/model/IMappingFunctionCollection'
import { ParamMappingType } from '~/model/ParamMappingType.ts'
export const mappingFunctions: IMappingFunctionCollection = {
  [ParamMappingType.LINEAR](
    input: number,
    orgRangeStart: number,
    orgRangeEnd: number,
    destRangeStart: number,
    destRangeEnd: number
  ): number {
    if (input >= orgRangeStart && input <= orgRangeEnd) {
      const percentage = input / orgRangeEnd
      const destParam =
        destRangeStart + (destRangeEnd - destRangeStart) * percentage
      return destParam
    } else {
      return destRangeEnd
    }
  },
  [ParamMappingType.LINEAR_REVERSE](
    input: number,
    orgRangeStart: number,
    orgRangeEnd: number,
    destRangeStart: number,
    destRangeEnd: number
  ): number {
    if (input >= orgRangeStart && input <= orgRangeEnd) {
      const percentage = input / orgRangeEnd
      const destParam =
        destRangeStart + (destRangeEnd - destRangeStart) * percentage
      return destRangeEnd - destParam
    } else {
      return destRangeStart
    }
  },
  [ParamMappingType.LOG_MAPPING](
    input: number,
    orgRangeStart: number,
    orgRangeEnd: number,
    destRangeStart: number,
    destRangeEnd: number
  ): number {
    if (input >= orgRangeStart && input <= orgRangeEnd) {
      const percentage = input / orgRangeEnd
      const destParam =
        destRangeStart + (destRangeEnd - destRangeStart) * percentage
      return destParam
    } else {
      return destRangeEnd
    }
  },
}
