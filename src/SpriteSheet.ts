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
    { flippedX = false }: { flippedX?: boolean } = {}
  ) {
    let renderedX = x
    
    if (flippedX) {
      context.save()
      context.scale(-1, 1)
      renderedX = -(x + width)
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

    if (flippedX) {
      context.restore()
    }
  }
  
}

export default SpriteSheet
