namespace Canvity.Assets {
    export class Sprite extends Asset {
        private image: HTMLImageElement;
        public get Image(): HTMLImageElement { return this.image; }

        public constructor(image: HTMLImageElement) {
            super();
            this.image = image;
        }
    }
}