import { Vector3 } from 'three'

export class Attractor extends Vector3 {
  private _reached: boolean

  constructor(x: number, y: number, z: number) {
    super(x, y, z)
    this._reached = false
  }

  get reached(): boolean {
    return this._reached
  }

  set reached(reached: boolean) {
    this._reached = reached
  }
}
