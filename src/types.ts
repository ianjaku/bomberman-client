import KeyListener from "./KeyListener";

export interface GameData {
  context: CanvasRenderingContext2D
  screenWidth: number
  screenHeight: number
  keyListener: KeyListener
}

export interface Sprite {
  render(
    gameData: GameData,
    delta: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
}