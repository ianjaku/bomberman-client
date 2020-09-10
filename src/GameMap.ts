import { GameData } from "./engine/types"
import Entity from "./engine/Entity"
import ImageUtils from "./engine/ImageUtils"

class GameMap extends Entity {

  private tileImage: HTMLImageElement
  private width: number
  private height: number

  constructor() {
    super()
  }

  public async setup(gameData: GameData) {
    this.tileImage = await ImageUtils.loadImageFromUrl("http://localhost:4000/static/bg.png")
    this.width = gameData.screenWidth
    this.height = gameData.screenHeight
  }

  public render({ context }: GameData) {
    const tileSize = 64
    
    const tileCountX = Math.ceil(this.width / tileSize)
    const tileCountY = Math.ceil(this.height / tileSize)

    for (let y = 0; y < tileCountY; y++) {
      for (let x = 0; x < tileCountX; x++) {
        context.drawImage(this.tileImage, x * tileSize, y * tileSize, tileSize, tileSize)
      }
    }
  }
  
}

export default GameMap
