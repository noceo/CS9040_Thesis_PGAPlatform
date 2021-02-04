import { Vertex } from '../helpers'

export interface IRenderer {
  startRender(vertices: Array<Vertex>): void
  stopRender(): void
  onDataChange(): void
}
