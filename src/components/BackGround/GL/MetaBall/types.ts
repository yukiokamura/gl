import { Color, Matrix4, Vector3, Vector2 } from 'three'

export type Uniforms = {
  u_eps: { value: number }
  u_maxDis: { value: number }
  u_maxSteps: { value: number }

  u_clearColor: { value: Color }

  u_camPos: { value: Vector3 }
  u_camToWorldMat: { value: Matrix4 }
  u_camInvProjMat: { value: Matrix4 }

  u_lightDir: { value: Vector3 }
  u_lightColor: { value: Color }

  u_diffIntensity: { value: number }
  u_specIntensity: { value: number }
  u_ambientIntensity: { value: number }
  u_shininess: { value: number }

  u_time: { value: number }

  u_mouse: { value: Vector2 }
  u_prevMouse: { value: Vector2 }
}
