namespace Canvity.Assets {
    export class AssetManager {
        public static LoadSprite(resPath: string, callback: (asset: Sprite) => void): void {
            let loader = document.createElement('img');
            loader.setAttribute('style', 'display:hidden');
            loader.addEventListener('load', (e) => {
                callback(new Sprite(<HTMLImageElement>(e.target)));
            });
            loader.src = resPath;
            document.body.appendChild(loader);
        }
    }
}