import Entity from "./engine/Entity";
import { ImageCache } from "./engine/ImageCache";
import ImageUtils from "./engine/ImageUtils";
import Sprite from "./engine/Sprite";
import SpriteSheet from "./engine/SpriteSheet";
import SpriteSheetSprite from "./engine/SpriteSheetSprite";
import { GameData } from "./engine/types";

export class Bomb extends Entity {

  private sprite: Sprite;

  public setup(imageCache: ImageCache) {
    const sheetImage = imageCache.getPreloaded("bomb")
    const sheet = new SpriteSheet(sheetImage, 48, 48)
    this.sprite = new SpriteSheetSprite(sheet, 0, 0) 
  }

  public render(gameData: GameData): void {
    this.sprite.render(gameData, 100, 100, 48, 48)
  }

}
