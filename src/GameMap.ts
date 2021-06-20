import { GameData } from "./engine/types"
import Entity from "./engine/Entity"
import ImageUtils from "./engine/ImageUtils"
import { ImageCache } from "./engine/ImageCache"

class GameMap extends Entity {

  private tileImage: HTMLImageElement

  constructor() {
    super()
  }

  public setup(imageCache: ImageCache) {
    this.tileImage = imageCache.getPreloaded("bg")
  }

  public render({ context, screenHeight, screenWidth }: GameData) {
    const tileSize = 64
    
    const tileCountX = Math.ceil(screenWidth / tileSize)
    const tileCountY = Math.ceil(screenHeight / tileSize)

    for (let y = 0; y < tileCountY; y++) {
      for (let x = 0; x < tileCountX; x++) {
        context.drawImage(this.tileImage, x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }
  
}

export default GameMap
