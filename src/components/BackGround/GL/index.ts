import Renderer from './renderer'
import { Color, Scene } from 'three'
import { Loader } from './loader'
import { Camera } from './camera'
import type { ScriptController } from './types'
import Events from './Events'
export default class GL {
  private renderer: Renderer
  private scene: Scene
  private loader: Loader
  private currentController: ScriptController | null = null
  private camera: Camera
  private events: Events
  constructor(private wrap: HTMLElement) {
    const canvas = this.wrap.querySelector('canvas') as HTMLCanvasElement
    this.renderer = new Renderer(canvas)
    this.scene = new Scene()
    this.events = new Events()
    this.camera = new Camera({
      width: this.wrap.clientWidth,
      height: this.wrap.clientHeight,
    })
    this.loader = new Loader()
  }

  onResize() {
    if (this.currentController) {
      this.currentController.onResize({
        width: this.wrap.clientWidth,
        height: this.wrap.clientHeight,
      })
    }
    this.renderer.onResize({
      width: this.wrap.clientWidth,
      height: this.wrap.clientHeight,
    })
    this.camera.onResize({
      width: this.wrap.clientWidth,
      height: this.wrap.clientHeight,
    })
  }

  update(t: number) {
    if (this.currentController) {
      this.currentController.update(t)
    }
    this.renderer.render(this.scene, this.camera)
  }

  async load(name: string) {
    const controller = await this.loader.load(name)
    this.currentController = new controller(
      this.camera,
      {
        width: this.wrap.clientWidth,
        height: this.wrap.clientHeight,
      },
      this.events
    )
    if (this.currentController) {
      this.scene.add(this.currentController)
    }
  }
}
