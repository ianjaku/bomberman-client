import SpriteSheet from "./SpriteSheet"
import { GameData } from "./types"
import Sprite from "./Sprite"
import { IRenderImageOptions } from "./IRenderImageOptions"

class SpriteSheetSprite extends Sprite {

  private spriteSheet: SpriteSheet
  private xCount: number
  private yCount: number
  private flippedX: boolean

  constructor(
    spriteSheet: SpriteSheet,
    xCount: number,
    yCount: number,
    { flippedX = false}: { flippedX?: boolean } = {}
  ) {
    super()
    this.spriteSheet = spriteSheet
    this.xCount = xCount
    this.yCount = yCount
    this.flippedX = flippedX
  }

  render(
    gameData: GameData,
    x: number,
    y: number,
    width: number,
    height: number,
    renderOptions?: IRenderImageOptions
  ): void {
    this.spriteSheet.render(
      gameData,
      this.xCount,
      this.yCount,
      x,
      y,
      width,
      height,
      Object.assign({ flippedX: this.flippedX }, renderOptions || {})
    )
  }
  
}

export default SpriteSheetSprite
