import SpriteSheet from "./SpriteSheet"
import { GameData, Sprite } from "./types"

type Frame = [number, number]

class Animation implements Sprite {

  private spriteSheet: SpriteSheet
  private frames: Frame[]
  private msPerFrame: number
  private flippedX: boolean

  private currentFrameIndex: number = 0
  private msInCurrentFrame: number = 0

  constructor(
    spriteSheet: SpriteSheet,
    frames: [number, number][],
    msPerFrame: number,
    { flippedX = false }: { flippedX?: boolean } = {}
  ) {
    this.spriteSheet = spriteSheet
    this.frames = frames
    this.msPerFrame = msPerFrame
    this.flippedX = flippedX
  }

  public render(
    gameData: GameData,
    delta: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    // Update the frame
    this.msInCurrentFrame += delta * 1000
    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame
      this.currentFrameIndex ++
      if (this.currentFrameIndex >= this.frames.length) {
        this.currentFrameIndex = 0
      }
    }

    // Render the frame
    const currentFrame = this.frames[this.currentFrameIndex]
    this.spriteSheet.render(
      gameData,
      currentFrame[0],
      currentFrame[1],
      x,
      y,
      width,
      height,
      { flippedX: this.flippedX }
    )
  }
  
}

export default Animation
