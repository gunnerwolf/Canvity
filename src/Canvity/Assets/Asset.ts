namespace Canvity.Assets {
    export abstract class Asset {
        protected filePath: string;
        public get FilePath(): string { return this.filePath; }

        public constructor(path: string) {
            this.filePath = path;
        }
    }
}