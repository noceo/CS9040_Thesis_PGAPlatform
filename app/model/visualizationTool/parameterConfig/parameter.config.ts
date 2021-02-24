import { IParameterConfig } from './parameter.types'

const paramConfig: IParameterConfig = {
  numericParameters: [
    {
      name: 'no2',
      min: 0,
      max: 1,
      value: 0,
    },
    {
      name: 'o3',
      min: 0,
      max: 1,
      value: 0,
    },
    {
      name: 'pm10',
      min: 0,
      max: 1,
      value: 0,
    },
  ],
  textParameters: [
    // {
    //   name: 'axiom',
    //   regex: '/F+/',
    //   value: '',
    // },
  ],
  liveParameters: [
    {
      name: 'windForce',
      value: 0,
    },
  ],
}

export default paramConfig
