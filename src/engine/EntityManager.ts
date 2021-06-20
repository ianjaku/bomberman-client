import Entity from "./Entity";
import { ImageCache } from "./ImageCache";

export class EntityManager {

  private entities: Entity[] = []
  private imageCache: ImageCache

  constructor(imageCache: ImageCache) {
    this.imageCache = imageCache
  }

  public addEntity(entity: Entity) {
    if (!entity.hasBeenSetup) {
      entity.runSetup(this.imageCache)
    }
    this.entities.push(entity)
  }

  public getEntities() {
    return this.entities
  }

}
