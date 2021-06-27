import Entity from "./engine/Entity";
import { ImageCache } from "./engine/ImageCache";
import ImageUtils from "./engine/ImageUtils";
import Sprite from "./engine/Sprite";
import SpriteSheet from "./engine/SpriteSheet";
import SpriteSheetSprite from "./engine/SpriteSheetSprite";
import { GameData } from "./engine/types";

export class Bomb extends Entity {

  private sprite: Sprite

  private xPos: number
  private yPos: number

  private timeBeforeExplosionMS: number

  private blinkTimeMS: number = 300
  private currBlinkTimeMS: number
  private minBlinkOpacity = 0.5

  constructor(xPos: number, yPos: number) {
    super()
    this.xPos = xPos
    this.yPos = yPos
    this.timeBeforeExplosionMS = 3000
    this.currBlinkTimeMS = this.blinkTimeMS
  }

  public setup(imageCache: ImageCache) {
    const sheetImage = imageCache.getPreloaded("bomb")
    const sheet = new SpriteSheet(sheetImage, 48, 48)
    this.sprite = new SpriteSheetSprite(sheet, 0, 0) 
  }

  public update(gameData: GameData, delta: number) {
    this.timeBeforeExplosionMS -= delta * 1000

    if (this.timeBeforeExplosionMS <= 0) {
      gameData.entityManager.removeEntity(this)
    }

    this.currBlinkTimeMS -= delta * 1000
    if (this.currBlinkTimeMS <= -this.blinkTimeMS) {
      this.currBlinkTimeMS = this.blinkTimeMS
    }
  }

  public render(gameData: GameData): void {
    const opacityVariance = 1 - this.minBlinkOpacity
    const opacityValue = (Math.abs(this.currBlinkTimeMS) / this.blinkTimeMS) * opacityVariance
    const opacity = this.minBlinkOpacity + opacityValue
    
    this.sprite.render(gameData, this.xPos, this.yPos, 48, 48, { opacity })
  }

}
