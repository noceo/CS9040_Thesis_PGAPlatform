import { Vertex } from '../helpers'
import { ILiveEffectPipeline } from '../liveEffectPipeline/liveEffectPipeline.types'
import { IInterpreter } from './interpreter.types'
import THREE from 'three'
import { ThreeDimensionalRenderer } from '../renderer/3DRenderer'

type Turtle = {
  pos: Vertex
  rotation: Vertex
}

export class Interpreter implements IInterpreter {
  private _branchingStack: Array<Turtle>
  private _liveEffectPipeline?: ILiveEffectPipeline

  constructor() {
    this._branchingStack = []
  }

  interpret(word: string): void {
    console.log(word)
    throw new Error('Method not implemented.')
    // trigger pipeline and sent processed data to renderer
  }
}
