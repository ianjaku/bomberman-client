import SpriteSheet from "./SpriteSheet"
import { Sprite, GameData } from "./types"

class SpriteSheetSprite implements Sprite {

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
    this.spriteSheet = spriteSheet
    this.xCount = xCount
    this.yCount = yCount
    this.flippedX = flippedX
  }

  render(gameData: GameData, delta: number, x: number, y: number, width: number, height: number): void {
    this.spriteSheet.render(
      gameData,
      this.xCount,
      this.yCount,
      x,
      y,
      width,
      height,
      { flippedX: this.flippedX }
    )
  }
  
}

export default SpriteSheetSprite
