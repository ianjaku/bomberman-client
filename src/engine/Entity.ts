import { GameData } from "./types";

abstract class Entity {

  public async setup(gameData: GameData): Promise<void> {}
  public update(gameData: GameData, delta: number): void {}
  public abstract render(gameData: GameData): void;

}

export default Entity
