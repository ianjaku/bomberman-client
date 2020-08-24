import { GameData } from "./types"
import ImageUtils from "./ImageUtils"
import Sprite from "./Sprite"

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

    const imagePromises = [
      await ImageUtils.loadImageFromUrl("http://localhost:4000/static/player_f00.png"),
      await ImageUtils.loadImageFromUrl("http://localhost:4000/static/player_b00.png"),
      await ImageUtils.loadImageFromUrl("http://localhost:4000/static/player_r00.png")
    ]

    const [imageF, imageB, imageR] = await Promise.all(imagePromises)

    this.sprites = {
      forward: new Sprite(imageF),
      backward: new Sprite(imageB),
      right: new Sprite(imageR),
      left: new Sprite(imageR, { flippedX: true }),
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

    this.getMovingSprite().render(gameData, this.xPos, this.yPos, this.width, this.height)
  }

  private getMovingSprite() {
    if (this.velX > 0) return this.sprites["right"]
    if (this.velX < 0) return this.sprites["left"]
    if (this.velY < 0) return this.sprites["backward"]
    return this.sprites["forward"]
  }
  
}

export default Player
