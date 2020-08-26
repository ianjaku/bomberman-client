import { GameData, Sprite } from "./types"
import ImageUtils from "./ImageUtils"
import ImageSprite from "./ImageSprite"
import SpriteSheet from "./SpriteSheet"
import SpriteSheetSprite from "./SpriteSheetSprite"
import Animation from "./Animation"
import Range from "./Range"

class Player {

  private sprites: {[direction: string]: Sprite} = {}

  private xPos = 0
  private yPos = 0
  private width: number
  private height: number

  private speed = 150
  private velX = 0
  private velY = 0

  public async setup() {

    const spriteSheetImage = await ImageUtils.loadImageFromUrl("http://localhost:4000/static/player_spritesheet.png")
    const spriteSheet = new SpriteSheet(spriteSheetImage, 64, 128)

    this.sprites = {
      idle: new SpriteSheetSprite(spriteSheet, 0, 0),
      forward: new Animation(spriteSheet, Range.rowRange(0, 8), 100),
      backward: new Animation(spriteSheet, Range.rowRange(1, 8), 100),
      right: new Animation(spriteSheet, Range.rowRange(2, 8), 100),
      left: new Animation(spriteSheet, Range.rowRange(2, 8), 100, { flippedX: true })
    }
    
    this.width = 64
    this.height = 128
  }

  public render(gameData: GameData, delta: number) {
    const { keyListener } = gameData

    this.velX = 0
    this.velY = 0

    if (keyListener.isAnyKeyDown(["d", "ArrowRight"])) {
      this.velX = this.speed * delta
    } else if (keyListener.isAnyKeyDown(["q", "a", "ArrowLeft"])) {
      this.velX = -(this.speed * delta)
    }
    
    if (keyListener.isAnyKeyDown(["s", "ArrowDown"])) {
      this.velY = this.speed * delta
    } else if (keyListener.isAnyKeyDown(["z", "w", "ArrowUp"])) {
      this.velY = -(this.speed * delta)
    }

    this.xPos += this.velX
    this.yPos += this.velY

    this.getMovingSprite().render(gameData, delta, this.xPos, this.yPos, this.width, this.height)
  }

  private getMovingSprite() {
    if (this.velX === 0 && this.velY === 0) return this.sprites["idle"]
    if (this.velX > 0) return this.sprites["right"]
    if (this.velX < 0) return this.sprites["left"]
    if (this.velY < 0) return this.sprites["backward"]
    return this.sprites["forward"]
  }
  
}

export default Player
