import BomermanGame from "./BombermanGame"

async function bootstrap() {
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element")
    return
  }

  canvasEl.focus()

  const game = new BomermanGame(canvasEl)
  game.run()
}

bootstrap()
