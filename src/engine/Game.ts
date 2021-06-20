import GameLoop from "./GameLoop"
import { GameData } from "./types"
import KeyListener from "./KeyListener"
import Entity from "./Entity"
import CollisionHandler from "./collision/CollisionHandler"
import Collidable from "./collision/Collidable"
import { EntityManager } from "./EntityManager"
import { ImageCache } from "./ImageCache"

abstract class Game {

  private canvasEl: HTMLCanvasElement
  private gameData: GameData

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl
    const imageCache = new ImageCache()
    this.gameData = {
      context: canvasEl.getContext("2d"),
      screenWidth: canvasEl.width,
      screenHeight: canvasEl.height,
      keyListener: new KeyListener(),
      collisionHandler: new CollisionHandler(),
      entityManager: new EntityManager(imageCache),
      imageCache: imageCache
    }
  }

  public async run() {
    this.gameData.keyListener.setup(this.canvasEl)

    await this.preload(this.gameData.imageCache)
    this.setup(this.gameData)

    
    const gameLoop = new GameLoop(
      this.update.bind(this),
      this.render.bind(this)
    )
    gameLoop.run()
  }

  public addEntity(entity: Entity) {
    this.gameData.entityManager.addEntity(entity)

    // TODO: add this again
    // if (this.isCollidable(entity)) {
    //   this.gameData.collisionHandler.addCollidable(entity);
    // }
  }

  protected abstract preload(imageCache: ImageCache): Promise<void>
  protected abstract setup(gameData: GameData): void

  // private async setupEntities() {
  //   let promises = this.gameData.entityManager.getEntities().map(e => e.setup(this.gameData))
  //   return Promise.all(promises)
  // }

  private update(delta: number) {
    this.gameData.entityManager.getEntities().forEach(e => e.update(this.gameData, delta))
  }

  private render() {
    this.gameData.entityManager.getEntities().forEach(e => e.render(this.gameData))
  }

  private isCollidable(entity: Entity | Collidable): entity is Collidable {
    return (entity as Collidable).getCollisionBox !== undefined;
  }

}

export default Game
