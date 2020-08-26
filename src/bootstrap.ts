import Game from "./Game"

async function bootstrap() {
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element")
    return
  }

  canvasEl.focus()

  const game = new Game(canvasEl)
  game.run()
}

bootstrap()
