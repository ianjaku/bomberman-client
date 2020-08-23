import ImageUtils from "./ImageUtils"
import GameMap from "./GameMap"
import GameLoop from "./GameLoop"

class Game {

  private context: CanvasRenderingContext2D
  private width: number
  private height: number

  private map: GameMap
  private charImage: HTMLImageElement
  private charX = 0
  private charY = 0

  constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context
    this.width = width
    this.height = height
  }

  public async run() {
    const img = await ImageUtils.loadImageFromUrl("http://localhost:4000/static/bg.png")
    this.map = new GameMap(img, this.width, this.height)

    this.charImage = await ImageUtils.loadImageFromUrl("http://localhost:4000/static/player_f00.png")

    const gameLoop = new GameLoop(this.loop.bind(this))
    gameLoop.run()
  }

  private loop(delta: number) {
    this.map.render(this.context)

    this.charX += 30 * delta
    this.charY += 30 * delta
    this.context.drawImage(this.charImage, this.charX, this.charY)
  }

}

export default Game
