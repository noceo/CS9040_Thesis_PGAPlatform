import { Vertex } from '../helpers'
import { IRenderer } from './renderer.types'

export class TwoDimensionalRenderer implements IRenderer {
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
