namespace Canvity.Assets {
    export class Sprite extends Asset {
        private image: HTMLImageElement;
        public get Image(): HTMLImageElement { return this.image; }

        public constructor(path: string, image: HTMLImageElement) {
            super(path);
            this.image = image;
        }
    }
}