import ImageUtils from "./ImageUtils";

export class ImageCache {

  private preloads: Record<string, HTMLImageElement> = {}

  public async preloadImage(name: string, url: string) {
    const img = await ImageUtils.loadImageFromUrl(url)
    this.preloads[name] = img
  }

  public async preloadImages(urls: Record<string, string>) {
    const promises = Object.entries(urls).map(([name, url]) => {
      return this.preloadImage(name, url)
    })
    await Promise.all(promises)
  }

  public getPreloaded(name: string): HTMLImageElement {
    return this.preloads[name]
  }

}
