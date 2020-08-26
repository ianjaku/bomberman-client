import { GameData, Sprite } from "./types"

class ImageSprite implements Sprite {

  private image: HTMLImageElement
  private flippedX: boolean

  constructor(image: HTMLImageElement, { flippedX = false }: { flippedX?: boolean } = {}) {
    this.image = image
    this.flippedX = flippedX
  }

  public render({ context }: GameData, delta: number, x: number, y: number, width: number, height: number) {
    let renderedX = x
    
    if (this.flippedX) {
      context.save()
      context.scale(-1, 1)
      renderedX = -(x + width)
    }
    
    context.drawImage(this.image, renderedX, y, width, height)

    if (this.flippedX) {
      context.restore()
    }
  }
  
}

export default ImageSprite
