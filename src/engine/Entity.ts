import { ImageCache } from "./ImageCache";
import { GameData } from "./types";

abstract class Entity {

  public hasBeenSetup: boolean = false;

  public async runSetup(imageCache: ImageCache): Promise<void> {
    this.hasBeenSetup = true;
    await this.setup(imageCache)
  }

  public setup(imageCache: ImageCache): void {}
  public update(gameData: GameData, delta: number): void {}
  public abstract render(gameData: GameData): void;

}

export default Entity
