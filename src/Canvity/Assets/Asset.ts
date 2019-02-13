namespace Canvity.Assets {
    export abstract class Asset {
        private static assets: Array<Asset>;
        public static get Assets(): Array<Asset> { return Asset.assets; }

        protected assetName: string;
        public get AssetName(): string { return this.assetName; }

        protected filePath: string;
        public get FilePath(): string { return this.filePath; }

        public constructor(name: string, path: string = "") {
            this.assetName = name;
            this.filePath = path;
        }

        public abstract parseAsset(httpReq: XMLHttpRequest): void;

        public static loadAssetFromURI<T extends Asset>(c: {new(name: string, path: string): T; }, uri: string, assetName: string): void {
            let httpReq = new XMLHttpRequest();

            httpReq.onreadystatechange = () => {
                Asset.parseLoadedAsset(c, httpReq, assetName);
            };

            httpReq.open('GET', uri, true);
            httpReq.send();
        }

        public static addLoadedAsset(asset: Asset): void {
            Asset.assets.push(asset);
        }

        private static parseLoadedAsset<T extends Asset>(c: {new(name: string, path: string): T; }, httpReq: XMLHttpRequest, assetName: string): void {
            let asset = new c(assetName, httpReq.responseURL);
            asset.parseAsset(httpReq);

            Asset.addLoadedAsset(asset);
        }
    }
}