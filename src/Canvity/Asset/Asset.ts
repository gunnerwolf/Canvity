import { IAssetMap } from "./AssetMap";

export abstract class Asset {
    public static OnFinishLoading: () => void;

    private static loadingAssets: Array<string> = [];

    private static assets: IAssetMap = { };
    public static get Assets(): IAssetMap { return Asset.assets; }

    public static get IsLoading(): boolean { return Asset.loadingAssets.length > 0; }

    protected assetName: string;
    public get AssetName(): string { return this.assetName; }

    protected filePath: string;
    public get FilePath(): string { return this.filePath; }

    public constructor(name: string, path: string = "") {
        this.assetName = name;
        this.filePath = path;
    }

    public abstract parseAsset(httpReq: XMLHttpRequest): void;

    public static getAsset(name: string): Asset {
        return Asset.Assets[name];
    }
    public static getAssetOfType<T extends Asset>(name: string): T {
        return Asset.Assets[name] as T;
    }

    public static getAssets(): Array<Asset> {
        let arr = new Array<Asset>();
        for (let name in Asset.Assets) {
            if (!Asset.Assets.hasOwnProperty(name)) continue;
            arr.push(Asset.Assets[name]);
        }
        return arr;
    }
    public static getAssetsOfType<T extends Asset>(c: new(name: string, path: string) => T): Array<T> {
        let arr = new Array<T>();
        for (let name in Asset.Assets) {
            if (Asset.Assets[name] instanceof c) {
                arr.push(Asset.Assets[name] as T);
            }
        }
        return arr;
    }

    public static loadAssetFromURI<T extends Asset>(
        c: new(name: string, path: string) => T, uri: string, assetName: string
    ): void {
        let httpReq = new XMLHttpRequest();

        httpReq.onreadystatechange = () => {
            if (httpReq.readyState === XMLHttpRequest.DONE && httpReq.status === 200) {
                Asset.parseLoadedAsset(c, httpReq, assetName);
            }
        };

        Asset.loadingAssets.push(uri);

        httpReq.open("GET", uri, true);
        httpReq.send();
    }

    public static addLoadedAsset(asset: Asset): void {
        Asset.assets[asset.AssetName] = asset;
    }

    private static parseLoadedAsset<T extends Asset>(
        c: new(name: string, path: string) => T, httpReq: XMLHttpRequest, assetName: string
    ): void {
        let asset = new c(assetName, httpReq.responseURL);
        asset.parseAsset(httpReq);

        Asset.addLoadedAsset(asset);

        Asset.loadingAssets.splice(Asset.loadingAssets.indexOf(httpReq.responseURL), 1);
        if (!Asset.IsLoading) Asset.OnFinishLoading();
    }
}
