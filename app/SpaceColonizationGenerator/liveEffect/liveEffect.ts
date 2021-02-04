import { Vertex } from '../helpers'

export abstract class LiveEffect {
  private _vertices: Array<Vertex>

  constructor(vertices: Array<Vertex>) {
    this._vertices = vertices
  }

  abstract process(): Array<Vertex>
}
