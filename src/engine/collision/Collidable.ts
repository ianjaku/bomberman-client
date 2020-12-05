import CollisionBox from "./CollisionBox";

interface Collidable {
  getCollisionBox(): CollisionBox;
}

export default Collidable;
