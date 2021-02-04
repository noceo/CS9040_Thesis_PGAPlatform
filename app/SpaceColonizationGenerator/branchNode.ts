import { Vector3 } from 'three'

export class BranchNode {
  private _parent: BranchNode | null
  private _pos: Vector3
  private _dir: Vector3
  private _originalDir: Vector3
  private _length: number
  private _attractorCount: number
  private _childCount: number

  constructor(
    parent: BranchNode | null,
    pos: Vector3,
    dir: Vector3,
    // geometry: BufferGeometry,
    // material: Material | Array<Material>,
    length: number
  ) {
    this._parent = parent
    this._pos = new Vector3()
    this._pos.copy(pos)
    this._dir = dir.normalize()
    this._originalDir = new Vector3()
    this._originalDir.copy(this._dir)
    this._length = length
    this._attractorCount = 0
    this._childCount = 0
    // const renderPosition = pos
    //   .clone()
    //   .addScaledVector(this._dir, this._length / 2)
    // this.position.set(renderPosition.x, renderPosition.y, renderPosition.z)
    // const rotationAxis = new Vector3()
    // rotationAxis.crossVectors(this._dir, new Vector3(0, 1, 0))
    // const angle = this._dir.y < 0 ? Math.PI / 2 : -Math.PI / 2
    // this.quaternion.setFromAxisAngle(rotationAxis, angle)

    // this.geometry = geometry
    // this.material = material
  }

  nextNode(): BranchNode {
    this._childCount++
    console.log('CHILDS', this._childCount)
    const nextPos = this._pos.clone().addScaledVector(this._dir, this._length)
    return new BranchNode(
      this,
      nextPos,
      this._dir.clone(),
      // this.geometry,
      // this.material,
      this._length
    )
  }

  reset(): void {
    this._dir.copy(this._originalDir)
    this._attractorCount = 0
  }

  get parent(): BranchNode | null {
    return this._parent
  }

  set parent(parent: BranchNode | null) {
    this._parent = parent
  }

  get pos(): Vector3 {
    return this._pos
  }

  set pos(pos: Vector3) {
    this._pos = pos
  }

  get dir(): Vector3 {
    return this._dir
  }

  set dir(dir: Vector3) {
    this._dir = dir
  }

  get length(): number {
    return this._length
  }

  set length(length: number) {
    this._length = length
  }

  get attractorCount(): number {
    return this._attractorCount
  }

  set attractorCount(attractorCount: number) {
    this._attractorCount = attractorCount
  }

  get childCount(): number {
    return this._childCount
  }

  set childCount(childCount: number) {
    this._childCount = childCount
  }
}
