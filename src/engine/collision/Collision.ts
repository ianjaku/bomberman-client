import Collidable from "./Collidable";

interface Collision {
  with: Collidable;
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export default Collision;
