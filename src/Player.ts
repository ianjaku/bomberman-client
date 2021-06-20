import { GameData } from "./engine/types"
import Sprite from "./engine/Sprite"
import ImageUtils from "./engine/ImageUtils"
import ImageSprite from "./engine/ImageSprite"
import SpriteSheet from "./engine/SpriteSheet"
import SpriteSheetSprite from "./engine/SpriteSheetSprite"
import Animation from "./engine/Animation"
import Range from "./engine/Range"
import Entity from "./engine/Entity"
import CollisionBox from "./engine/collision/CollisionBox"
import { Bomb } from "./Bomb"
import { ImageCache } from "./engine/ImageCache"

class Player extends Entity {

  private sprites: {[direction: string]: Sprite} = {}

  private xPos = 0
  private yPos = 0
  private width: number
  private height: number

  private speed = 150
  private velX = 0
  private velY = 0

  public setup(imageCache: ImageCache) {
    const spriteSheetImage = imageCache.getPreloaded("player")
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

  public update(gameData: GameData, delta: number) {
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

    if (keyListener.isKeyDown(" ")) {
      const bomb = new Bomb();
      gameData.entityManager.addEntity(bomb);
    }

    this.calculateCollision(gameData);

    this.xPos += this.velX
    this.yPos += this.velY

    this.getMovingSprite().update(gameData, delta)
  }

  public render(gameData: GameData) {
    this.getMovingSprite().render(gameData, this.xPos, this.yPos, this.width, this.height)
  }

  private calculateCollision({ collisionHandler }: GameData) {
    const collisionBox: CollisionBox = {
      xPos: this.xPos + 10,
      yPos: this.yPos + 110,
      width: this.width - 20,
      height: this.height - 115
    };

    const collisionsX = collisionHandler.testMovement(collisionBox, this.velX, 0);
    if (collisionsX.length > 0) {
      // TODO: move the distance you're still allowed
      this.velX = 0;
    }

    const collisionsY = collisionHandler.testMovement(collisionBox, 0, this.velY);
    if (collisionsY.length > 0) {
      // TODO: move the distance you're still allowed
      this.velY = 0;
    }
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
