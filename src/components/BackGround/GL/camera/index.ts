import { PerspectiveCamera } from 'three'

import type { Size } from '../types'

export class Camera extends PerspectiveCamera {
  private size: Size
  private isScreenPixelPosition: boolean = false
  constructor({ width, height }: Size) {
    super(75, width / height, 0.1, 1000)
    this.size = {
      width,
      height,
    }
    this.position.set(0, 0, 10)
  }

  onResize({ width, height }: Size) {
    this.aspect = width / height
    this.size = {
      width,
      height,
    }

    if (this.isScreenPixelPosition) {
      const fovInRadians = (this.fov * Math.PI) / 180
      const positionz = height / (2 * Math.tan(fovInRadians / 2))
      this.position.set(0, 0, positionz)
    }
    this.updateProjectionMatrix()
  }

  setScreenPixelPosition() {
    this.isScreenPixelPosition = true
    this.onResize(this.size)
  }
}
