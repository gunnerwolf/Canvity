namespace Canvity.Assets {
    export abstract class Asset {
        private static assets: AssetMap = { };
        public static get Assets(): AssetMap { return Asset.assets; }

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
            return <T>Asset.Assets[name];
        }

        public static getAssets(): Array<Asset> {
            let arr = new Array<Asset>();
            for(var name in Asset.Assets) {
                arr.push(Asset.Assets[name]);
            }
            return arr;
        }
        public static getAssetsOfType<T extends Asset>(c: {new(name: string, path: string): T; }): Array<T> {
            let arr = new Array<T>();
            for(var name in Asset.Assets) {
                if (Asset.Assets[name] instanceof c)
                    arr.push(<T>Asset.Assets[name]);
            }
            return arr;
        }

        public static loadAssetFromURI<T extends Asset>(c: {new(name: string, path: string): T; }, uri: string, assetName: string): void {
            let httpReq = new XMLHttpRequest();

            httpReq.onreadystatechange = () => {
                Asset.parseLoadedAsset(c, httpReq, assetName);
            };

            httpReq.open('GET', uri, true);
            httpReq.send();
        }

        public static addLoadedAsset(asset: Asset): void {
            Asset.assets[asset.AssetName] = asset;
        }

        private static parseLoadedAsset<T extends Asset>(c: {new(name: string, path: string): T; }, httpReq: XMLHttpRequest, assetName: string): void {
            let asset = new c(assetName, httpReq.responseURL);
            asset.parseAsset(httpReq);

            Asset.addLoadedAsset(asset);
        }
    }
}