import { Object3D } from 'three'
export type Size = {
  width: number
  height: number
}

export abstract class ScriptController extends Object3D {
  abstract onResize(size: Size): void
  abstract update(t: number): void
}
