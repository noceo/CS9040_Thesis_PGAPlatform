import { Vertex } from '../helpers'
import { LiveEffect } from '../liveEffect/liveEffect'

export interface ILiveEffectPipeline {
  addEffect(effect: LiveEffect): void
  removeEffect(effect: LiveEffect): void
  process(vertices: Array<Vertex>): Array<Vertex>
}
