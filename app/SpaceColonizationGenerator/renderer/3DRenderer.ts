import { Vertex } from '../helpers'

export class ThreeDimensionalRenderer {
  startRender(vertices: Array<Vertex>): void {
    console.log(vertices)
    throw new Error('Method not implemented.')
  }

  stopRender(): void {
    throw new Error('Method not implemented.')
  }

  onDataChange(): void {
    throw new Error('Method not implemented.')
  }
}
