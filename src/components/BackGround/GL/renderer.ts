import { WebGLRenderer } from 'three'
import { config } from './config'
import type { Size } from './types'
export default class Renderer extends WebGLRenderer {
  constructor(canvas: HTMLElement) {
    super({
      canvas,
    })
    this.setPixelRatio(config.pixelRatio)
    this.setClearColor(0x343434)
  }

  onResize({ width, height }: Size) {
    this.setSize(width, height)
  }
}
