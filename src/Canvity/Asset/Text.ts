import { Asset } from "./Asset";

export class Text extends Asset {
    private content: string;
    public get Content(): string { return this.content; }

    public parseAsset(httpReq: XMLHttpRequest): void {
        this.content = httpReq.response;
    }
}