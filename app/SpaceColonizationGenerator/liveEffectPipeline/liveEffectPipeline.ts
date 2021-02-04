import { Vertex } from '../helpers'
import { LiveEffect } from '../liveEffect/liveEffect'
import { ILiveEffectPipeline } from './liveEffectPipeline.types'

export class LiveEffectPipeline implements ILiveEffectPipeline {
  private _effects: Array<LiveEffect>

  constructor() {
    this._effects = []
  }

  addEffect(effect: LiveEffect) {
    this._effects.push(effect)
  }

  removeEffect(effect: LiveEffect) {
    console.log(effect)
  }

  process(vertices: Array<Vertex>): Array<Vertex> {
    let result = vertices
    this._effects.forEach((effect) => {
      result = effect.process()
    })
    return result
  }
}
