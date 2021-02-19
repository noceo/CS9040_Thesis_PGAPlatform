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

  generateNewTree(
    crownHeight: number,
    crownSize: number,
    material: Material,
    debugMaterial: Material
  ): void {
    const lastGeneratedTree = this._trees[this._trees.length - 1]
    let newTreePosition = new Vector3(0, 0, 0)
    if (lastGeneratedTree) {
      newTreePosition = lastGeneratedTree.position
        .clone()
        .add(new Vector3(this._distanceBetweenTrees, 0, 0))
    }

    console.log(newTreePosition)
    const crownSideLength = mapParam(crownSize, 0, 1, 20, 100)
    console.log('crownSideLength', crownSideLength)
    const height = mapParam(crownHeight, 0, 1, 30, 80)
    console.log('height', height)

    // generate attractors and set to min height
    const attractorCount = mapParam(crownSize, 0, 1, 10, 200)
    console.log('AttractorCount', attractorCount)
    const attractors = randomPointsInSphere(
      attractorCount,
      crownSideLength / 1.5
    )

    const minHeight = crownSideLength / 2

    attractors.forEach((attractor) => {
      attractor.add(newTreePosition)
      attractor.add(new Vector3(0, minHeight + height, 0))
    })

    this._trees.push(
      new Tree(
        this._scene,
        material,
        debugMaterial,
        newTreePosition,
        attractors,
        'Test',
        6
      )
    )
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

  get trees(): Array<Tree> {
    return this._trees
  }
}
