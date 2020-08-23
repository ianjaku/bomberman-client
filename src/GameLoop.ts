import DeltaTracker from "./DeltaTracker";

type GameLoopFunction = (delta: number) => void;

class GameLoop {

  private loopFunction: GameLoopFunction
  private deltaTracker: DeltaTracker

  constructor(loopFunction: GameLoopFunction) {
    this.loopFunction = loopFunction
    this.deltaTracker = new DeltaTracker()
  }

  public run() {
    window.requestAnimationFrame(this.loop.bind(this))
  }

  private loop() {
    const delta = this.deltaTracker.getAndUpdateDelta()
    
    this.loopFunction(delta)
    
    window.requestAnimationFrame(this.loop.bind(this))
  }
  
}

export default GameLoop
