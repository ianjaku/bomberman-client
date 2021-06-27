import { IRenderImageOptions } from "./IRenderImageOptions"
import { GameData } from "./types"

class SpriteSheet {

  private image: HTMLImageElement
  private spriteWidth: number
  private spriteHeight: number

  constructor(image: HTMLImageElement, spriteWidth: number, spriteHeight: number) {
    this.image = image
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
  }

  public render(
    { context }: GameData,
    xCount: number,
    yCount: number,
    x: number,
    y: number,
    width: number,
    height: number,
    { flippedX = false, opacity }: IRenderImageOptions = {}
  ) {
    let renderedX = x
    
    if (flippedX) {
      context.save()
      context.scale(-1, 1)
      renderedX = -(x + width)
    }

    if (opacity != null) {
      context.globalAlpha = opacity
    }

    context.drawImage(
      this.image,
      xCount * this.spriteWidth,
      yCount * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      renderedX,
      y,
      width,
      height
    )

    if (opacity != null) {
      context.globalAlpha = 1
    }

    if (flippedX) {
      context.restore()
    }
  }
  
}

export default SpriteSheet
