import Game from "./engine/Game";
import ImageUtils from "./engine/ImageUtils";
import GameMap from "./GameMap"
import Player from "./Player"
import { GameData } from "./engine/types";
import TestBrick from "./TestBrick";
import { ImageCache } from "./engine/ImageCache";

class BombermanGame extends Game {

  protected async preload(imageCache: ImageCache): Promise<void> {
    await imageCache.preloadImages({
      blocks: "http://localhost:4000/static/blocks.png",
      player: "http://localhost:4000/static/player_spritesheet.png",
      bg: "http://localhost:4000/static/bg.png",
      bomb: "http://localhost:4000/static/bomb.png"
    })
  }

  protected async setup(gameData: GameData) {
    this.addEntity(new GameMap())
    this.addEntity(new TestBrick())
    this.addEntity(new Player())
    // this.addEntity(new Bomb())
  }
  
}

export default BombermanGame
