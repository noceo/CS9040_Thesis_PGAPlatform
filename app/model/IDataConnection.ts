import { ParamMappingType } from './ParamMappingType'

export interface IDataConnection {
  readonly id: string
  readonly dataParamId: string
  readonly vizParamId: string
  readonly mappingType: ParamMappingType
}
