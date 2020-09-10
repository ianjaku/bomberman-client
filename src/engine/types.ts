import KeyListener from "./KeyListener";

export interface GameData {
  context: CanvasRenderingContext2D
  screenWidth: number
  screenHeight: number
  keyListener: KeyListener
}
