
class KeyListener {

  private keyStates: {[key: string]: boolean} = {}

  public setup(canvasEl: HTMLCanvasElement) {
    canvasEl.addEventListener("keydown", e => {
      e.preventDefault()
      this.keyStates[e.key] = true
    })
    canvasEl.addEventListener("keyup", e => {
      e.preventDefault()
      this.keyStates[e.key] = false
    })
  }

  public isKeyDown(key: string) {
    return this.keyStates[key] === true
  }

  public isAnyKeyDown(keys: string[]) {
    return keys.some(key => this.isKeyDown(key))
  }
  
}

export default KeyListener
