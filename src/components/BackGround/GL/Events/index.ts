import { Vector2 } from 'three'
export default class Events {
  private inputs: {
    mouse: Vector2
  }
  constructor() {
    this.inputs = {
      mouse: new Vector2(0, 0),
    }

    // マウス移動イベントのリスナーを追加
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  private onMouseMove(event: MouseEvent) {
    // マウス座標を正規化（-1から1の範囲に変換）
    this.inputs.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.inputs.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  // マウス座標を取得するメソッド
  public getMousePosition() {
    return this.inputs.mouse
  }

  // クリーンアップ用のメソッド
  public dispose() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this))
  }
}
