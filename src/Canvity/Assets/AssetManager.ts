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

        public static LoadTextFile(resPath: string, callback: (asset: Text) => void): void {
            let ajax = new XMLHttpRequest();
            ajax.addEventListener('readystatechange', (e) => {
                if (ajax.readyState === ajax.DONE && ajax.status === 200) {
                    callback(new Text(ajax.responseText));
                }
            });

            ajax.open('GET', resPath);
            ajax.send();
        }
    }
}