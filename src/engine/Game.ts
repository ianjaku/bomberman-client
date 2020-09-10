import ImageUtils from "./ImageUtils"
import GameLoop from "./GameLoop"
import { GameData } from "./types"
import KeyListener from "./KeyListener"
import Entity from "./Entity"

abstract class Game {

  private canvasEl: HTMLCanvasElement
  private gameData: GameData
  private entities: Entity[] = []

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
    this.gameData.keyListener.setup(this.canvasEl)

    await this.setup(this.gameData)

    await this.setupEntities()
    
    const gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    )
    gameLoop.run()
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity)
  }

  protected abstract async setup(gameData: GameData): Promise<void>;

  private async setupEntities() {
    let promises = this.entities.map(e => e.setup(this.gameData))
    return Promise.all(promises)
  }

  private update(delta: number) {
    this.entities.forEach(e => e.update(this.gameData, delta))
  }

  private render() {
    this.entities.forEach(e => e.render(this.gameData))
  }

}

export default Game
