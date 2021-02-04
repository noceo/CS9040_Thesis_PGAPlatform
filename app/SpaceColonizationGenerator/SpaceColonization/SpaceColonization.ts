import {
  Color,
  DoubleSide,
  Light,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
import { IIterationManager } from '../iterationManager/iterationManager.types'
import { IterationManager } from '../iterationManager/iterationManager'
import { Attractor } from '../attractor'
import { Tree } from '../tree'
import VisualizationTool from '~/model/visualizationTool/visualizationTool'
import { IVizParameter } from '~/model/vizParameter/vizParameter.types'
import { IDataRow } from '~/model'
import paramConfig from '~/model/visualizationTool/parameterConfig/parameter.config'
import { IParameterConfig } from '~/model/visualizationTool/parameterConfig/parameter.types'
import { NumericVizParameter } from '~/model/numericVizParameter/numericVizParameter'
import { generateID } from '~/model/helpers/idGenerator'
import { TextVizParameter } from '~/model/textVizParameter/textVizParameter'

export class SpaceColonizationTool extends VisualizationTool {
  protected _availableParameters: IVizParameter[]
  private _allDataRows: Array<IDataRow>
  private _iterationManager: IIterationManager

  private _scene: Scene
  private _camera: PerspectiveCamera
  private _renderer: WebGLRenderer
  private _stats: Stats
  private _attractors: Array<Attractor> = []
  private _tree: Tree
  private _lights: Array<Light> = []
  private _rotationMatrix: Matrix3 = new Matrix3()
  private _controls: OrbitControls

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this._iterationManager = new IterationManager()
    this._allDataRows = []
    this._availableParameters = this.createParams(paramConfig)

    this._scene = new Scene()
    this._camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    )
    this._camera.position.set(0, 100, 100)
    this._renderer = new WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    })
    console.log(this._renderer)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    // eslint-disable-next-line unicorn/number-literal-case
    this._scene.background = new Color(0xe5e5e5)

    this._tree = new Tree(this._scene)
    const groundGeometry = new PlaneGeometry(1000, 1000)
    // eslint-disable-next-line unicorn/number-literal-case
    const groundMaterial = new MeshBasicMaterial({
      // eslint-disable-next-line unicorn/number-literal-case
      color: 0x00ff00,
      side: DoubleSide,
    })
    const ground = new Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    this._scene.add(ground)

    // eslint-disable-next-line unicorn/number-literal-case
    const light1 = new PointLight(0xffffff, 1, 100)
    light1.position.set(10, 25, 25)
    this._lights.push(light1)
    // eslint-disable-next-line unicorn/number-literal-case
    const light2 = new PointLight(0xffffff, 1, 100)
    light2.position.set(10, 100, 25)
    this._lights.push(light2)

    window.addEventListener('resize', () => {
      this._renderer.setSize(window.innerWidth, window.innerHeight)
      this._camera.aspect = window.innerWidth / window.innerHeight
      this._camera.updateProjectionMatrix()
    })

    this._controls = new OrbitControls(this._camera, this._canvas)
    this._controls.enableDamping = true
    this._controls.dampingFactor = 0.1
    this._controls.zoomSpeed = 1
    this._controls.enablePan = false
    this._controls.minDistance = 1
    this._controls.target.set(0, 50, 0)
    // this._controls.maxDistance = 80
    this._controls.enablePan = true

    this._stats = new Stats()
    this._stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom)

    this.setup()
    this.render()
  }

  getAvailableParameters(): IVizParameter[] {
    return this._availableParameters
  }

  onNewDataRow(data: IDataRow): void {
    console.log(data)
  }

  generateFullyRenderedContent(): void {
    if (this._allDataRows && this._allDataRows.length > 0) {
      // generate content
    }
  }

  setup(): void {
    this._lights.forEach((element) => {
      const helper = new PointLightHelper(element as PointLight)
      this._scene.add(element, helper)
    })
  }

  render = () => {
    this._stats.begin()
    // this._attractors.forEach((element) => {
    //   element.rotation.x += 0.01
    //   element.rotation.y += 0.01
    // })
    this._controls.update()
    // this._tree.grow()
    this._tree.animate()
    this._renderer.render(this._scene, this._camera)
    this._stats.end()
    requestAnimationFrame(this.render)
  }

  private createParams(paramConfig: IParameterConfig): Array<IVizParameter> {
    const params: Array<IVizParameter> = []

    paramConfig.numericParameters.forEach((element) => {
      params.push(
        new NumericVizParameter({
          id: generateID(),
          name: element.name,
          min: element.min,
          max: element.max,
          value: element.value,
        })
      )
    })

    paramConfig.textParameters.forEach((element) => {
      params.push(
        new TextVizParameter({
          id: generateID(),
          name: element.name,
          regex: element.regex,
          value: element.value,
        })
      )
    })

    return params
  }
}
