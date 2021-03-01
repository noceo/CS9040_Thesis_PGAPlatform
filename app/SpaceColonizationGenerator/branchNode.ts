import { Vector3 } from 'three'

/**
 * Interface for saving an object to the R-tree
 */
export interface NeighbourSearchObject {
  minX: number
  minY: number
  minZ: number
  maxX: number
  maxY: number
  maxZ: number
}

/**
 * A branch node representing an anchor point of the tree skeleton
 */
export class BranchNode implements NeighbourSearchObject {
  private _parent: BranchNode | null
  private _pos: Vector3
  private _dir: Vector3
  private _originalDir: Vector3
  private _length: number
  private _attractorCount: number
  private _childCount: number

  minX: number
  minY: number
  minZ: number
  maxX: number
  maxY: number
  maxZ: number

  constructor(
    parent: BranchNode | null,
    pos: Vector3,
    dir: Vector3,
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

    this.minX = this._pos.x
    this.minY = this._pos.y
    this.minZ = this._pos.z
    this.maxX = this._pos.x
    this.maxY = this._pos.y
    this.maxZ = this._pos.z
  }

  /**
   * Creates a next tree node that is influenced by the direction of this instance
   */
  nextNode(random: boolean = true): BranchNode {
    this._childCount++
    // add slightly more random dir for deterministic behavior
    this._dir.normalize()
    if (random) {
      const x = this._dir.x + Math.random() - 0.5
      const y = this._dir.y + Math.random() - 0.5
      const z = this._dir.z + Math.random() - 0.5
      const randomVector = new Vector3(x, y, z).normalize()
      this._dir.add(randomVector).normalize()
    }
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

  /**
   * Resets the instance direction and attractor count
   */
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
