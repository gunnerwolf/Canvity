import { Asset } from "./Asset";

export class SpriteAsset extends Asset {
    private image: HTMLImageElement;
    public get Image(): HTMLImageElement { return this.image; }

    public parseAsset(httpReq: XMLHttpRequest): void {
        let uri = URL.createObjectURL(httpReq.response);
        let img = new Image();
        img.src = uri;
        this.image = img;
    }
}