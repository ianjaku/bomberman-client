import Collidable from "./engine/collision/Collidable";
import CollisionBox from "./engine/collision/CollisionBox";
import Entity from "./engine/Entity";
import { ImageCache } from "./engine/ImageCache";
import ImageUtils from "./engine/ImageUtils";
import SpriteSheet from "./engine/SpriteSheet";
import { GameData } from "./engine/types";

class TestBrick extends Entity implements Collidable {
  private sheet: SpriteSheet;

  public setup(imageCache: ImageCache) {
    const img = imageCache.getPreloaded("blocks")
    this.sheet = new SpriteSheet(img, 64, 64)
  }

  public render(gameData: GameData): void {
    this.sheet.render(gameData, 1, 0, 128, 128, 64, 64);
  }

  public getCollisionBox(): CollisionBox {
    return {
      xPos: 128,
      yPos: 128,
      width: 64,
      height: 64
    }
  }

}

export default TestBrick;