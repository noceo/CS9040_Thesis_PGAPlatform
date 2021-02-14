import { Scene, Vector3 } from 'three'
import { mapParam, randomPointsInCube } from './helpers'
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

  generateNewTree(crownHeight: number, crownSize: number): void {
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
    const attractors = randomPointsInCube(attractorCount, crownSideLength)

    const minHeight = crownSideLength / 2

    attractors.forEach((attractor) => {
      attractor.add(newTreePosition)
      attractor.add(new Vector3(0, minHeight + height, 0))
    })

    this._trees.push(new Tree(this._scene, newTreePosition, attractors, 'Test'))
  }

  get trees(): Array<Tree> {
    return this._trees
  }
}
