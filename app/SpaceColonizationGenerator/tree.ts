import {
  BufferGeometry,
  Float32BufferAttribute,
  Material,
  Mesh,
  Points,
  PointsMaterial,
  Scene,
  Vector3,
} from 'three'
import _ from 'lodash'
import { RBush3D } from 'rbush-3d'
import { Attractor } from './attractor'
import { BranchNode, NeighbourSearchObject } from './branchNode'

export class Tree {
  // private _attractorSegments: Array<Array<Attractor>>
  // private _attractorGeometries: Array<BufferGeometry>
  // private _branches: Array<BranchNode>
  private _name: string
  private _scene: Scene
  private _position: Vector3
  private _root!: BranchNode
  private _rootBranch!: Array<BranchNode>
  private _minDistance: number
  private _maxDistance: number
  private _attractors: Array<Attractor>
  private _branches: Array<Array<BranchNode>>
  private _branchNodes: Array<BranchNode>
  private _areaLookUp: RBush3D
  private _branchGeometries: Array<BufferGeometry>
  private _branchMeshes: Array<Mesh>
  private _isCreated: boolean
  private _drawRange: number
  private _branchDetail: number
  private _material: Material
  private _debugMaterial: Material

  constructor(
    scene: Scene,
    material: Material,
    debugMaterial: Material,
    position: Vector3,
    attractors: Array<Vector3>,
    name: string,
    branchDetail: number
  ) {
    this._name = name
    this._scene = scene
    this._position = position
    this._root = new BranchNode(null, position, new Vector3(0, 1, 0), 4)
    this._minDistance = 5
    this._maxDistance = 20
    this._attractors = []
    attractors.forEach((attractor) => {
      this._attractors.push(
        new Attractor(attractor.x, attractor.y, attractor.z)
      )
    })
    this._branches = []
    this._branchNodes = []
    this._areaLookUp = new RBush3D()
    this._branchGeometries = []
    this._branchMeshes = []
    this._isCreated = false
    this._drawRange = 0
    this._branchDetail = branchDetail
    this._material = material
    this._debugMaterial = debugMaterial
    // if (shaderModifier) {
    // this._branchMaterial.onBeforeCompile = shaderModifier
    // }
    this.init()
  }

  init(): void {
    // const randomPoints = randomPointsInSphere(30, 10)
    // this.generateAttractorSegment(randomPoints, new Vector3(0, 50, 0))
    this.generateAttractors()
    // add branches from root until it reaches the first attractor's min range
    this._areaLookUp.insert(this._root)
    this._rootBranch = [this._root]
    this._branches.push(this._rootBranch)

    let foundNearAttractor = false
    let currentNode = this._root
    while (!foundNearAttractor) {
      for (let i = 0; i < this._attractors.length; i++) {
        const distance = currentNode.pos.distanceTo(
          new Vector3(
            this._attractors[i].x,
            this._attractors[i].y,
            this._attractors[i].z
          )
        )
        if (distance < this._maxDistance) {
          foundNearAttractor = true
          break
        }
      }
      if (!foundNearAttractor) {
        currentNode = currentNode.nextNode()
        this._rootBranch.push(currentNode)
        this._areaLookUp.insert(currentNode)
      }
    }

    // for (let i = 0; i < 100; i++) {
    //   this.grow()
    // }

    // calculate tree
    let isGrowing = true
    while (isGrowing) {
      isGrowing = this.grow()
    }

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
        r / 200,
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
      const query = this.getNeighbourSearchObject(
        attractor.x,
        attractor.y,
        attractor.z,
        this._maxDistance
      )

      const nearBranchNodes = this._areaLookUp.search(
        query
      ) as Array<BranchNode>

      for (let j = 0; j < nearBranchNodes.length; j++) {
        const node = nearBranchNodes[j]
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
      // for (let j = 0; j < this._branches.length; j++) {
      //   const branch = this._branches[j]
      //   for (let k = 0; k < branch.length; k++) {
      //     const node = branch[k]
      //     const distance = attractor.distanceTo(node.pos)
      //     if (distance < this._minDistance) {
      //       attractor.reached = true
      //       closestNode = null
      //       break
      //     } else if (distance < closestDistance) {
      //       closestNode = node
      //       closestDistance = distance
      //     }
      //   }
      // }

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
              this._areaLookUp.insert(newNode)
            } else {
              branch.push(newNode)
              this._areaLookUp.insert(newNode)
            }
          }
          node.reset()
        }
      }
    }
    return true
  }

  generateAttractors(): void {
    // create attractor points
    const attractorGeometry = new BufferGeometry()
    const positions: Array<number> = []
    this._attractors.forEach((attractor) => {
      positions.push(attractor.x)
      positions.push(attractor.y)
      positions.push(attractor.z)
    })
    attractorGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    )

    const attractorSystem = new Points(
      attractorGeometry,
      // eslint-disable-next-line unicorn/number-literal-case
      new PointsMaterial({ color: 0xffffff })
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

    // const material = new MeshPhongMaterial({
    //   vertexColors: true,
    // })
    const mesh = new Mesh(geometry, this._material)
    this._branchMeshes.push(mesh)
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
      colors.push(1, 1, 1)
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
        colors.push(1, 1, 1)
      }

      // fan segment
      vertices.push(midVertex.x, midVertex.y, midVertex.z)
      normals.push(up.x, up.y, up.z)
      colors.push(1, 1, 1)
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

  private getLookUpItem(x: number, y: number, z: number) {
    return {
      minX: x,
      minY: y,
      minZ: z,
      maxX: x,
      maxY: y,
      maxZ: z,
    }
  }

  private getNeighbourSearchObject(
    x: number,
    y: number,
    z: number,
    radius: number
  ): NeighbourSearchObject {
    return {
      minX: x - radius,
      minY: y - radius,
      minZ: z - radius,
      maxX: x + radius,
      maxY: y + radius,
      maxZ: z + radius,
    }
  }

  setDebug(debug: boolean) {
    this._branchMeshes?.forEach((element) => {
      if (debug) {
        element.material = this._debugMaterial
      } else {
        element.material = this._material
      }
      element.material.needsUpdate = true
    })
  }

  get position(): Vector3 {
    return this._position
  }
}
