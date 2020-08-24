import { GameData } from "./types"

class GameMap {

  private tileImage: HTMLImageElement
  private width: number
  private height: number

  constructor(tileImage: HTMLImageElement, width: number, height: number) {
    this.tileImage = tileImage
    this.width = width
    this.height = height
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
