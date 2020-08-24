import ImageUtils from "./ImageUtils"
import GameMap from "./GameMap"
import GameLoop from "./GameLoop"
import { GameData } from "./types"
import Player from "./Player"
import KeyListener from "./KeyListener"

class Game {

  private canvasEl: HTMLCanvasElement
  private gameData: GameData
  private map: GameMap
  private player: Player

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl
    this.gameData = {
      context: canvasEl.getContext("2d"),
      screenWidth: canvasEl.width,
      screenHeight: canvasEl.height,
      keyListener: new KeyListener()
    }
  }

  public async run() {
    await this.setup()
    
    const gameLoop = new GameLoop(this.loop.bind(this))
    gameLoop.run()
  }

  private async setup() {
    this.gameData.keyListener.setup()
    
    const img = await ImageUtils.loadImageFromUrl("http://localhost:4000/static/bg.png")
    this.map = new GameMap(img, this.gameData.screenWidth, this.gameData.screenHeight)

    this.player = new Player()
    await this.player.setup()
  }

  private loop(delta: number) {
    this.map.render(this.gameData)
    this.player.render(this.gameData, delta)
  }

}

export default Game
