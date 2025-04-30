import {
  Color,
  DirectionalLight,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  MathUtils,
  Vector3,
  Vector2,
} from 'three'
import type { Camera } from '../camera'
import type { Size } from '../types'
import vertex from './shader/metaball.vert?raw'
import fragment from './shader/metaball.frag?raw'
import Events from '../Events'
import type { Uniforms } from './types'
import { ScriptController } from '../types'

let cameraForwardPos = new Vector3(0, 0, -1)
const VECTOR3ZERO = new Vector3(0, 0, 0)
let time = Date.now()

export default class MetaBall extends ScriptController {
  private mesh: Mesh
  private uniforms: Uniforms

  constructor(
    private camera: Camera,
    private size: Size,
    private events: Events
  ) {
    super()
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(1, 1, 1)
    this.uniforms = {
      u_eps: { value: 0.001 },
      u_maxDis: { value: 1000 },
      u_maxSteps: { value: 100 },

      u_clearColor: { value: new Color(0x343434) },

      u_camPos: { value: camera.position },
      u_camToWorldMat: { value: camera.matrixWorld },
      u_camInvProjMat: { value: camera.projectionMatrixInverse },

      u_lightDir: { value: light.position },
      u_lightColor: { value: light.color },

      u_diffIntensity: { value: 0.5 },
      u_specIntensity: { value: 3 },
      u_ambientIntensity: { value: 0.15 },
      u_shininess: { value: 16 },

      u_time: { value: 0 },

      u_mouse: { value: new Vector2(0, 0) },
      u_prevMouse: { value: new Vector2(0, 0) },
    }

    this.mesh = new Mesh(
      new PlaneGeometry(),
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: this.uniforms,
      })
    )
    this.add(this.mesh)
    this.camera.position.set(0, 0, 5)

    this.add(light)
    const nearPlaneWidth =
      camera.near *
      Math.tan(MathUtils.degToRad(camera.fov / 2)) *
      camera.aspect *
      2
    const nearPlaneHeight = nearPlaneWidth / camera.aspect

    this.mesh.scale.set(nearPlaneWidth, nearPlaneHeight, 1)
  }

  onResize(size: Size) {
    const nearPlaneWidth =
      this.camera.near *
      Math.tan(MathUtils.degToRad(this.camera.fov / 2)) *
      this.camera.aspect *
      2
    const nearPlaneHeight = nearPlaneWidth / this.camera.aspect

    this.mesh.scale.set(nearPlaneWidth, nearPlaneHeight, 1)
  }

  update(t: number) {
    this.uniforms.u_prevMouse.value.copy(this.uniforms.u_mouse.value)
    this.uniforms.u_mouse.value = this.events.getMousePosition()

    cameraForwardPos = this.camera.position
      .clone()
      .add(
        this.camera
          .getWorldDirection(VECTOR3ZERO)
          .multiplyScalar(this.camera.near)
      )
    this.mesh.position.copy(cameraForwardPos)
    this.mesh.rotation.copy(this.camera.rotation)

    this.uniforms.u_time.value = t / 1000
  }
}
