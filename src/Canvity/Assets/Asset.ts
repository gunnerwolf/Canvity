namespace Canvity.Assets {
    export abstract class Asset {
        protected assetName: string;
        public get AssetName(): string { return this.assetName; }

        protected filePath: string;
        public get FilePath(): string { return this.filePath; }

        public constructor(name: string, path: string = "") {
            this.assetName = name;
            this.filePath = path;
        }
    }
}