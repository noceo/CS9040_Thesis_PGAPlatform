import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  Color,
  ConeGeometry,
  DirectionalLight,
  DoubleSide,
  Fog,
  FogExp2,
  HemisphereLight,
  Light,
  Material,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Scene,
  Shader,
  ShaderChunk,
  SphereGeometry,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
import THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { IIterationManager } from '../iterationManager/iterationManager.types'
import { IterationManager } from '../iterationManager/iterationManager'
import { Attractor } from '../attractor'
import { TreeGenerator } from '../treeGenerator'
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
  // private _cameraLookAt: Vector3
  private _renderer: WebGLRenderer
  private _stats: Stats
  private _attractors: Array<Attractor> = []
  private _treeGenerator: TreeGenerator
  private _lights: Array<Light> = []
  private _rotationMatrix: Matrix3 = new Matrix3()
  private _controls: OrbitControls
  private _shaders: Array<Shader>

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
      20000
    )
    // this._cameraLookAt = new Vector3(0, 100, 0)
    // this._camera.lookAt(this._cameraLookAt)
    // this._camera.updateProjectionMatrix()
    this._camera.position.set(75, 20, 500)
    this._renderer = new WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      // alpha: true,
    })
    console.log(this._renderer)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.shadowMap.enabled = true
    this._renderer.shadowMap.type = PCFSoftShadowMap
    // eslint-disable-next-line unicorn/number-literal-case
    this._scene.background = new Color(0x000000)

    this._treeGenerator = new TreeGenerator(this._scene, 200)
    this._treeGenerator.generateNewTree(0, 0)
    this._treeGenerator.generateNewTree(0.5, 0.5)
    this._treeGenerator.generateNewTree(1, 1)

    this._shaders = []
    const _modifyShader = (s: Shader) => {
      this._shaders.push(s)
      s.uniforms.fogTime = { value: 0.0 }
    }

    const sky = new Mesh(
      new SphereGeometry(10000, 32, 32),
      new MeshBasicMaterial({
        // eslint-disable-next-line unicorn/number-literal-case
        color: 0x000000,
        side: BackSide,
      })
    )
    // this._scene.add(sky)

    const ground = new Mesh(
      new PlaneGeometry(2000, 2000),
      new MeshPhysicalMaterial({
        // eslint-disable-next-line unicorn/number-literal-case
        color: 0xbababa,
      })
    )
    ground.rotation.x = -Math.PI / 2
    this._scene.add(ground)

    const hill = new Mesh(
      new SphereGeometry(40, 20, 20),
      new MeshBasicMaterial({
        // eslint-disable-next-line unicorn/number-literal-case
        color: 0xa9a9a9,
      })
    )
    hill.position.y -= 30
    // this._scene.add(hill)

    // eslint-disable-next-line unicorn/number-literal-case
    // const light1 = new PointLight(0xffffff, 1, 100)
    // light1.position.set(10, 25, 25)
    // this._lights.push(light1)
    // // eslint-disable-next-line unicorn/number-literal-case
    // const light2 = new PointLight(0xffffff, 1, 100)
    // light2.position.set(10, 100, 25)
    // this._lights.push(light2)

    // eslint-disable-next-line unicorn/number-literal-case
    const ambientLight = new AmbientLight(0x101010)
    this._scene.add(ambientLight)

    // eslint-disable-next-line unicorn/number-literal-case
    const dirLight = new DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(20, 100, 10)
    dirLight.target.position.set(0, 0, 0)
    dirLight.castShadow = true
    dirLight.shadow.bias = -0.001
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 500.0
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 500.0
    dirLight.shadow.camera.left = 100
    dirLight.shadow.camera.right = -100
    dirLight.shadow.camera.top = 100
    dirLight.shadow.camera.bottom = -100
    this._scene.add(dirLight)

    // eslint-disable-next-line unicorn/number-literal-case
    const hemiLight = new HemisphereLight(0xe5e5e5, 0xffffff, 0.6)
    this._scene.add(hemiLight)

    // eslint-disable-next-line unicorn/number-literal-case
    // this._scene.fog = new Fog(0xdfe9f3, 100, 500)
    // eslint-disable-next-line unicorn/number-literal-case
    this._scene.fog = new FogExp2(0x000000, 0.001)

    // eslint-disable-next-line unicorn/number-literal-case
    const trunkMat = new MeshStandardMaterial({ color: 0xffffff })
    // eslint-disable-next-line unicorn/number-literal-case
    const leavesMat = new MeshStandardMaterial({ color: 0x80ff80 })
    const trunkGeo = new BoxGeometry(20, 20, 20)
    const leavesGeo = new ConeGeometry(1, 1, 32)
    const trunkGeometries = []
    const leafGeometries = []
    for (let x = 0; x < 1; ++x) {
      for (let y = 0; y < 1; ++y) {
        // const trunk = new Mesh(trunkGeo, trunkMat)
        // const leaves = new Mesh(leavesGeo, leavesMat)
        // trunk.scale.set(20, (Math.random() + 1.0) * 100.0, 20)
        // trunk.position.set(
        //   15000.0 * (Math.random() * 2.0 - 1.0),
        //   trunk.scale.y / 2.0,
        //   15000.0 * (Math.random() * 2.0 - 1.0)
        // )

        // leaves.scale.copy(trunk.scale)
        // leaves.scale.set(100, trunk.scale.y * 5.0, 100)
        // leaves.position.set(
        //   trunk.position.x,
        //   leaves.scale.y / 2 + (Math.random() + 1) * 25,
        //   trunk.position.z
        // )

        trunkGeometries.push(trunkGeo)
        leafGeometries.push(leavesGeo)
      }
    }
    const mergedTrunkGeo = BufferGeometryUtils.mergeBufferGeometries(
      trunkGeometries,
      false
    )
    const mergedLeafGeo = BufferGeometryUtils.mergeBufferGeometries(
      leafGeometries,
      false
    )
    const trunkMesh = new Mesh(mergedTrunkGeo, trunkMat)
    const leafMesh = new Mesh(mergedLeafGeo, leavesMat)
    // this._scene.add(trunkMesh, leafMesh)

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
    this._controls.target.set(0, 20, 0)
    // this._controls.maxDistance = 80
    this._controls.enablePan = true

    this._stats = new Stats()
    this._stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this._stats.dom)

    this.setup()
    this.initFogShader()
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

  initFogShader(): void {
    const _NOISE_GLSL = `
      //
      // Description : Array and textureless GLSL 2D/3D/4D simplex
      //               noise functions.
      //      Author : Ian McEwan, Ashima Arts.
      //  Maintainer : stegu
      //     Lastmod : 20201014 (stegu)
      //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
      //               Distributed under the MIT License. See LICENSE file.
      //               https://github.com/ashima/webgl-noise
      //               https://github.com/stegu/webgl-noise
      //
      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      vec4 permute(vec4 x) {
          return mod289(((x*34.0)+1.0)*x);
      }
      vec4 taylorInvSqrt(vec4 r)
      {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      float snoise(vec3 v)
      {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 =   v - i + dot(i, C.xxx) ;
      // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        //   x0 = x0 - 0.0 + 0.0 * C.xxx;
        //   x1 = x0 - i1  + 1.0 * C.xxx;
        //   x2 = x0 - i2  + 2.0 * C.xxx;
        //   x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
      // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
      //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
      // Mix final noise value
        vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                      dot(p2,x2), dot(p3,x3) ) );
      }
      float FBM(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        for (int i = 0; i < 3; ++i) {
          value += amplitude * snoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
    `

    ShaderChunk.fog_fragment = `
      #ifdef USE_FOG
        vec3 fogOrigin = cameraPosition;
        vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
        float fogDepth = distance(vWorldPosition, fogOrigin);
        // f(p) = fbm( p + fbm( p ) )
        vec3 noiseSampleCoord = vWorldPosition * 0.00025 + vec3(0.0, 0.0, fogTime * 0.025);
        float noiseSample = FBM(noiseSampleCoord + FBM(noiseSampleCoord)) * 0.5 + 0.5;
        fogDepth *= mix(noiseSample, 1.0, saturate((fogDepth - 5000.0) / 5000.0));
        fogDepth *= fogDepth;
        float heightFactor = 0.05;
        float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
            1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
        fogFactor = saturate(fogFactor);
        gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
      #endif
    `

    ShaderChunk.fog_pars_fragment =
      _NOISE_GLSL +
      `
        #ifdef USE_FOG
          uniform float fogTime;
          uniform vec3 fogColor;
          varying vec3 vWorldPosition;
          #ifdef FOG_EXP2
            uniform float fogDensity;
          #else
            uniform float fogNear;
            uniform float fogFar;
          #endif
        #endif
      `

    ShaderChunk.fog_vertex = `
      #ifdef USE_FOG
        vWorldPosition = worldPosition.xyz;
      #endif
    `

    ShaderChunk.fog_pars_vertex = `
      #ifdef USE_FOG
        varying vec3 vWorldPosition;
      #endif
    `
  }

  render = () => {
    this._stats.begin()
    // this._attractors.forEach((element) => {
    //   element.rotation.x += 0.01
    //   element.rotation.y += 0.01
    // })
    this._controls.update()
    // this._tree.grow()
    this._treeGenerator.trees.forEach((tree) => {
      tree.animate()
    })
    // this._camera.position.x =
    //   this._cameraLookAt.x + 50 * Math.cos(1 * (1 * (Math.PI / 90)))
    // this._camera.position.z =
    //   this._cameraLookAt.z + 50 * Math.sin(1 * (1 * (Math.PI / 90)))
    this._renderer.render(this._scene, this._camera)
    this._stats.end()
    requestAnimationFrame(this.render)

    // let clock = new THREE.Clock();
    // let delta = 0;
    // // 30 fps
    // let interval = 1 / 30;

    //   delta += clock.getDelta();

    //    if (delta  > interval) {
    //        // The draw or time dependent code are here
    //        render();

    //        delta = delta % interval;
    //    }
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
