import {
  BufferGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Mesh,
  MeshPhongMaterial,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
} from 'three'
import _ from 'lodash'
import { Attractor } from './attractor'
import { BranchNode } from './branchNode'
import { randomPointsInCube, randomPointsInSphere, Vertex } from './helpers'

export class Tree {
  // private _attractorSegments: Array<Array<Attractor>>
  // private _attractorGeometries: Array<BufferGeometry>
  // private _branches: Array<BranchNode>
  private _scene: Scene
  private _root!: BranchNode
  private _rootBranch!: Array<BranchNode>
  private _minDistance: number
  private _maxDistance: number
  private _attractors: Array<Attractor>
  private _branches: Array<Array<BranchNode>>
  private _branchGeometries: Array<BufferGeometry>
  private _isCreated: boolean
  private _drawRange: number
  private _branchDetail: number

  constructor(scene: Scene, branchDetail = 6) {
    this._scene = scene
    this._minDistance = 5
    this._maxDistance = 20
    this._attractors = []
    this._branches = []
    this._branchGeometries = []
    this._isCreated = false
    this._drawRange = 0
    this._branchDetail = branchDetail
    this.init()
  }

  init(): void {
    // const randomPoints = randomPointsInSphere(30, 10)
    const randomPoints2 = randomPointsInSphere(300, 50)
    // this.generateAttractorSegment(randomPoints, new Vector3(0, 50, 0))
    this.generateAttractorSegment(randomPoints2, new Vector3(0, 80, 0))
    // add branches from root until it reaches the first attractor's min range
    this._root = new BranchNode(
      null,
      new Vector3(0, 0, 0),
      new Vector3(0, 1, 0),
      2
    )
    this._rootBranch = [this._root]
    this._branches.push(this._rootBranch)

    let foundNearAttractor = false
    let currentNode = this._root
    while (!foundNearAttractor) {
      for (let i = 0; i < this._attractors.length; i++) {
        const distance = currentNode.pos.distanceTo(this._attractors[i])
        if (distance < this._maxDistance) {
          foundNearAttractor = true
          break
        }
      }
      if (!foundNearAttractor) {
        currentNode = currentNode.nextNode()
        this._rootBranch.push(currentNode)
      }
    }
    // const vertices: Array<Vector3> = [
    //   new Vector3(0, 0, 0),
    //   new Vector3(5, 10, 0),
    //   new Vector3(10, 20, 0),
    //   new Vector3(15, 30, 0),
    //   new Vector3(10, 40, 10),
    //   new Vector3(10, 50, 10),
    //   // new Vector3(-25, 90, -5),
    //   // new Vector3(-20, 85, 0),
    //   // new Vector3(-15, 80, 5),
    //   // new Vector3(-4, 48, 2),
    //   // new Vector3(-8, 55, 3),
    // ]
    // this.generateBranchSegment(vertices, 0.5, 8)

    for (let i = 0; i < 100; i++) {
      this.grow()
    }

    // calculate tree
    // let isGrowing = true
    // while (isGrowing) {
    //   isGrowing = this.grow()
    // }

    // create mesh for each branch and set initial drawRange to 0
    for (
      let j = 0, r = this._branches.length - 1;
      j < this._branches.length;
      j++, r--
    ) {
      const branch = this._branches[j]
      const vertices: Array<Vector3> = []
      branch.forEach((branchNode) => {
        vertices.push(branchNode.pos)
      })
      const branchMesh = this.generateBranchMesh(
        vertices,
        r / 400,
        this._branchDetail
      )
      if (branchMesh) {
        const geometry = branchMesh.geometry
        geometry.setDrawRange(0, 0)
        this._branchGeometries.push(geometry)
      }
    }
    console.log(this._branches)
    console.log(this._branchGeometries)
    this._isCreated = true
  }

  grow(): boolean {
    if (this._attractors.length === 0) {
      console.log('NO ATTRACTORS')
      return false
    }
    for (let i = 0; i < this._attractors.length; i++) {
      const attractor = this._attractors[i]
      let closestNode = null
      let closestDistance = this._maxDistance
      for (let j = 0; j < this._branches.length; j++) {
        const branch = this._branches[j]
        for (let k = 0; k < branch.length; k++) {
          const node = branch[k]
          const distance = attractor.distanceTo(node.pos)
          if (distance < this._minDistance) {
            attractor.reached = true
            closestNode = null
            break
          } else if (distance < closestDistance) {
            closestNode = node
            closestDistance = distance
          }
        }
      }

      if (closestNode !== null) {
        const newDirection = attractor.clone().sub(closestNode.pos)
        newDirection.normalize()
        closestNode.dir.add(newDirection)
        closestNode.attractorCount++
      }
    }

    for (let x = this._attractors.length - 1; x >= 0; x--) {
      if (this._attractors[x].reached) {
        this._attractors.splice(x, 1)
        console.log('ATTRACTOR DELETED')
      }
    }

    for (let u = this._branches.length - 1; u >= 0; u--) {
      const branch = this._branches[u]
      for (let s = branch.length - 1; s >= 0; s--) {
        const node = branch[s]
        if (node.attractorCount > 0) {
          node.dir.divideScalar(node.attractorCount + 1)
          node.dir.normalize()
          const newNode = node.nextNode()

          // create new branch if there is a parent with more than 1 child
          if (newNode.parent !== null) {
            if (newNode.parent.childCount > 1) {
              // console.log('NODE', newNode.pos.x, newNode.pos.y, newNode.pos.z)
              const newBranchRootNode = _.cloneDeep(newNode.parent)
              newBranchRootNode.childCount = 0
              newBranchRootNode.reset()
              newNode.parent = newBranchRootNode
              this._branches.push([newBranchRootNode, newNode])
            } else {
              branch.push(newNode)
            }
          }
          node.reset()
        }
      }
    }
    // console.log('RUNNING')
    return true
  }

  generateAttractorSegment(
    points: Array<Vertex>,
    translateVector: Vector3
  ): void {
    for (let i = 0; i < points.length; i++) {
      this._attractors.push(
        new Attractor(
          points[i][0] + translateVector.x,
          points[i][1] + translateVector.y,
          points[i][2] + translateVector.z
        )
      )
    }

    const attractorGeometry = new BufferGeometry()
    const positions: Array<number> = []
    this._attractors.forEach((element) => {
      positions.push(element.x)
      positions.push(element.y)
      positions.push(element.z)
    })
    attractorGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    )

    const attractorSystem = new Points(
      attractorGeometry,
      new PointsMaterial({ color: 0x000000 })
    )
    this._scene.add(attractorSystem)
  }

  generateBranchMesh(
    midVertices: Array<Vector3>,
    radius: number,
    ringSegments: number
  ): Mesh | undefined {
    if (midVertices.length < 2) {
      console.log('Not enough mid vertices (segments)')
      return
    }
    if (ringSegments < 3) {
      console.log('Too less detail')
      return
    }

    const indices: Array<number> = []
    const vertices: Array<number> = []
    const normals: Array<number> = []
    const colors: Array<number> = []

    // create vertices, normals and colors
    for (let i = 0; i < midVertices.length - 1; i++) {
      const midVertex = midVertices[i].clone()
      const nextMidVertex = midVertices[i + 1].clone()
      this.generateNextCylinderPart(
        midVertex,
        nextMidVertex,
        ringSegments,
        radius,
        vertices,
        normals,
        colors
      )
    }

    // special case for last cylinder part
    const midVertex = midVertices[midVertices.length - 1].clone()
    const prevMidVertex = midVertices[midVertices.length - 2].clone()
    this.generateNextCylinderPart(
      midVertex,
      null,
      ringSegments,
      radius,
      vertices,
      normals,
      colors,
      prevMidVertex
    )

    // create indices
    for (let k = 0; k < ringSegments * (midVertices.length - 1); k++) {
      let a: number
      let b: number
      let c: number
      let d: number
      if ((k + 1) % ringSegments === 0) {
        a = k
        b = k - ringSegments + 1
        c = k + 1
        d = k + ringSegments
      } else {
        a = k
        b = k + 1
        c = k + ringSegments + 1
        d = k + ringSegments
      }
      indices.push(a, d, b)
      indices.push(b, d, c)
    }

    // create indices for fan of last segment
    const beginOfLastSegment = ringSegments * (midVertices.length - 1)
    for (
      let l = beginOfLastSegment;
      l < beginOfLastSegment + ringSegments;
      l++
    ) {
      const a = l
      const b = beginOfLastSegment + ringSegments
      const c = l - 1
      indices.push(a, c, b)
    }

    const geometry = new BufferGeometry()
    geometry.setIndex(_.clone(indices))
    geometry.setAttribute(
      'position',
      new Float32BufferAttribute(_.clone(vertices), 3)
    )
    geometry.setAttribute(
      'normal',
      new Float32BufferAttribute(_.clone(normals), 3)
    )
    geometry.setAttribute(
      'color',
      new Float32BufferAttribute(_.clone(colors), 3)
    )

    console.log('GEOMETRY', geometry.getAttribute('position').itemSize)
    const material = new MeshPhongMaterial({
      vertexColors: true,
    })
    const mesh = new Mesh(geometry, material)
    this._scene.add(mesh)
    return mesh
  }

  /**
   * Generates a new set of vertices, normals and colors for a given midVertex and pushes them into the given arrays
   * @param midVertex
   * @param nextMidVertex
   * @param ringSegments
   * @param radius
   * @param vertices
   * @param normals
   * @param colors
   * @param previousMidVertex: if set the orientation of the cylinder part will be the same as the previous one
   */
  generateNextCylinderPart(
    midVertex: Vector3,
    nextMidVertex: Vector3 | null,
    ringSegments: number,
    radius: number,
    vertices: Array<number>,
    normals: Array<number>,
    colors: Array<number>,
    previousMidVertex?: Vector3
  ): void {
    // generate vertices
    let up = null
    if (nextMidVertex) {
      up = nextMidVertex.clone().sub(midVertex).normalize()
    } else if (previousMidVertex) {
      up = midVertex.clone().sub(previousMidVertex).normalize()
    } else {
      return
    }
    const helperVectorOnPlane = new Vector3(-1, 0, 0)
    if (
      Math.abs(up.x) === Math.abs(helperVectorOnPlane.x) &&
      up.y === helperVectorOnPlane.y &&
      up.z === helperVectorOnPlane.z
    ) {
      helperVectorOnPlane.set(0, 1, 0)
    }
    const ringUnitVectorX = helperVectorOnPlane.clone().cross(up).normalize()
    const ringUnitVectorY = ringUnitVectorX.clone().cross(up).normalize()

    const ringVertexAngle = (2 * Math.PI) / ringSegments

    // build geometry
    for (let j = 0; j < ringSegments; j++) {
      const dir = ringUnitVectorX
        .clone()
        .multiplyScalar(Math.cos(j * ringVertexAngle))
        .add(
          ringUnitVectorY.clone().multiplyScalar(Math.sin(j * ringVertexAngle))
        )
        .multiplyScalar(radius)
      const ringVertex = midVertex.clone().add(dir)
      const normal = dir.clone().normalize()
      vertices.push(ringVertex.x, ringVertex.y, ringVertex.z)
      normals.push(normal.x, normal.y, normal.z)
      colors.push(0.65, 0.16, 0.16)
    }

    // if it is the last segment include midVertex
    if (previousMidVertex) {
      for (let k = 0; k < ringSegments; k++) {
        const dir = ringUnitVectorX
          .clone()
          .multiplyScalar(Math.cos(k * ringVertexAngle))
          .add(
            ringUnitVectorY
              .clone()
              .multiplyScalar(Math.sin(k * ringVertexAngle))
          )
          .multiplyScalar(radius)
        const ringVertex = midVertex.clone().add(dir)
        vertices.push(ringVertex.x, ringVertex.y, ringVertex.z)
        normals.push(up.x, up.y, up.z)
        colors.push(0.65, 0.16, 0.16)
      }
      vertices.push(midVertex.x, midVertex.y, midVertex.z)
      normals.push(up.x, up.y, up.z)
      colors.push(0.65, 0.16, 0.16)
    }
  }

  animate(): void {
    if (this._isCreated) {
      this._branchGeometries.forEach((geometry) => {
        geometry.setDrawRange(
          0,
          geometry.drawRange.count + 1 * this._branchDetail
        )
      })
    }
  }

  // increaseDrawRangeOfBranch(index: number): void {
  //   const geometry = this._branchGeometries[index]
  //   geometry.setDrawRange(0, geometry.drawRange.count + 1 * this._branchDetail)
  // }
}
