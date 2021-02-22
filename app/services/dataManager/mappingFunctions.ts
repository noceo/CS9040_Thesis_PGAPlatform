import { IMappingFunctionCollection } from '~/model/IMappingFunctionCollection'
import { ParamMappingType } from '~/model/ParamMappingType.ts'
export const mappingFunctions: IMappingFunctionCollection = {
  [ParamMappingType.LINEAR_MAPPING](
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
  // [ParamMappingType.LOG_MAPPING](
  //   input: number,
  //   orgRangeStart: number,
  //   orgRangeEnd: number,
  //   destRangeStart: number,
  //   destRangeEnd: number
  // ): number {
  //   return 0
  // },
}
