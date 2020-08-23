import Game from "./Game"

async function bootstrap() {
  const canvasEl = document.getElementById("game-canvas") as HTMLCanvasElement | undefined
  if (canvasEl == null) {
    console.log("Couldn't find the canvas element")
    return
  }

  const context = canvasEl.getContext("2d")

  const game = new Game(context, canvasEl.width, canvasEl.height)
  game.run()
}

bootstrap()
