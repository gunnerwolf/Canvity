import { Asset } from "./Asset";

export class SpriteAsset extends Asset {
    private image: HTMLImageElement;
    public get Image(): HTMLImageElement { return this.image; }

    public parseAsset(httpReq: XMLHttpRequest): void {
        if (httpReq.getResponseHeader("Content-Type") !== "image/png") {
            console.error("Could not load Sprite Asset from " + httpReq.responseURL
                + ".\nType was " + httpReq.getResponseHeader("Content-Type") + " but expected 'image/png'"
                + ".\nPreview of response: "
                + "\n" + httpReq.response);
            return;
        }
        let uri = URL.createObjectURL(new Blob([httpReq.response], {type: "image/png"}));
        let img = new Image();
        img.src = uri;
        this.image = img;
    }
}
