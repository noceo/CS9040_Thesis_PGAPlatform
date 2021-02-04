import { IParameterConfig } from './parameter.types'

const paramConfig: IParameterConfig = {
  numericParameters: [
    {
      name: 'xRotationAngle',
      min: 0,
      max: 100,
      value: 40,
    },
    {
      name: 'yRotationAngle',
      min: 0,
      max: 1,
      value: 0,
    },
    {
      name: 'zRotationAngle',
      min: 0,
      max: 1,
      value: 0,
    },
    {
      name: 'branchLength',
      min: 0,
      max: 1,
      value: 0,
    },
    {
      name: 'branchColor',
      min: 0,
      max: 1,
      value: 0,
    },
  ],
  textParameters: [
    {
      name: 'axiom',
      regex: '/F+/',
      value: '',
    },
  ],
}

export default paramConfig
