import CollisionHandler from "./collision/CollisionHandler";
import { EntityManager } from "./EntityManager";
import { ImageCache } from "./ImageCache";
import KeyListener from "./KeyListener";

export interface GameData {
  context: CanvasRenderingContext2D;
  screenWidth: number;
  screenHeight: number;
  keyListener: KeyListener;
  collisionHandler: CollisionHandler;
  entityManager: EntityManager;
  imageCache: ImageCache;
}
