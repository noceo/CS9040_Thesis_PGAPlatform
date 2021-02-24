import { Material, Scene, Vector3 } from 'three'
import { mapParam, randomPointsInSphere } from './helpers'
import { Tree } from './tree'

export class TreeGenerator {
  private _scene: Scene
  private _trees: Array<Tree>
  private _distanceBetweenTrees: number

  constructor(scene: Scene, distanceBetweenTrees: number) {
    this._scene = scene
    this._trees = []
    this._distanceBetweenTrees = distanceBetweenTrees
  }

  animateTrees(): void {
    if (this._trees.every((tree) => tree.isCreated)) {
      this._trees.forEach((tree) => {
        tree.animate()
      })
    }
  }

  private generateNewTree(
    position: Vector3,
    paramValue: number,
    material: Material,
    debugMaterial: Material
  ): Tree {
    // const lastGeneratedTree = this._trees[this._trees.length - 1]
    // let newTreePosition = new Vector3(0, 0, 0)
    // if (lastGeneratedTree) {
    //   newTreePosition = lastGeneratedTree.position
    //     .clone()
    //     .add(new Vector3(this._distanceBetweenTrees, 0, 0))
    // }
    const newTreePosition = position

    const attractors = this.calcTreeAttractors(newTreePosition, paramValue)

    const newTree = new Tree(
      this._scene,
      material,
      debugMaterial,
      newTreePosition,
      attractors,
      'Test',
      6
    )
    return newTree
  }

  updateTreeAtIndex(
    index: number,
    paramValue: number,
    material?: Material,
    debugMaterial?: Material
  ): void {
    const treePosition = new Vector3(index * this._distanceBetweenTrees, 0, 0)
    if (index > this._trees.length - 1) {
      if (material && debugMaterial) {
        this._trees.push(
          this.generateNewTree(
            treePosition,
            paramValue,
            material,
            debugMaterial
          )
        )
      }
      return
    }
    console.log('NEW TREE AT INDEX', index, 'TREE ARRAY', this._trees)
    const existingTree = this._trees[index]
    existingTree.removeFromScene()
    this._trees[index] = this.generateNewTree(
      treePosition,
      paramValue,
      existingTree.material,
      existingTree.debugMaterial
    )
  }

  removeTrees(): void {
    this._trees.forEach((tree) => {
      tree.removeFromScene()
    })
    this._trees = []
  }

  computeMiddleX(): number {
    if (this._trees.length > 0) {
      return this._trees[this._trees.length - 1].position.x / 2
    }
    return 0
  }

  setDebug(isDebug: boolean): void {
    this._trees.forEach((tree) => {
      tree.setDebug(isDebug)
    })
  }

  private calcTreeAttractors(
    position: Vector3,
    paramValue: number
  ): Array<Vector3> {
    console.log(position)
    const crownSideLength = mapParam(paramValue, 0, 1, 20, 100)
    console.log('crownSideLength', crownSideLength)
    const height = mapParam(paramValue, 0, 1, 30, 80)
    console.log('height', height)

    // generate attractors and set to min height
    const attractorCount = mapParam(paramValue, 0, 1, 10, 200)
    console.log('AttractorCount', attractorCount)
    const attractors = randomPointsInSphere(
      attractorCount,
      crownSideLength / 1.5
    )

    const minHeight = crownSideLength / 2

    attractors.forEach((attractor) => {
      attractor.add(position)
      attractor.add(new Vector3(0, minHeight + height, 0))
    })
    return attractors
  }

  get trees(): Array<Tree> {
    return this._trees
  }
}
