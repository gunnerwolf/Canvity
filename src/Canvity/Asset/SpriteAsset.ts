import { Asset } from "./Asset";

export class SpriteAsset extends Asset {
    private image: HTMLImageElement;
    public get Image(): HTMLImageElement { return this.image; }

    public parseAsset(httpReq: XMLHttpRequest): void {
        let responseType: string | null = httpReq.getResponseHeader("Content-Type");
        if (responseType === null || !/^image\//.test(responseType)) {
            console.error("Could not load Sprite Asset from " + httpReq.responseURL
                + ".\nType was " + httpReq.getResponseHeader("Content-Type") + " but expected 'image/png'"
                + ".\nPreview of response: "
                + "\n" + httpReq.response);
            return;
        }
        let blob = new Blob([httpReq.response], {type: responseType});
        let uri = URL.createObjectURL(blob);
        let img = new Image();
        img.src = httpReq.responseURL;
        this.image = img;
    }
}
