namespace Canvity {
    export abstract class App {
        protected drawInterval: number;
        protected updateInterval: number;
        public set DrawInterval(val: number) { this.drawInterval = val; }
        public set UpdateInterval(val: number) { this.updateInterval = val; }

        protected startTime: number;

        public get Runtime(): number { return Math.round((new Date()).getTime() / 1000) - this.startTime; }
        
        private lastDraw: number;
        private lastUpdate: number;

        public constructor(canvas: HTMLCanvasElement) {
            this.startTime = Math.round((new Date()).getTime() / 1000);
            this.lastDraw = this.startTime;
            this.lastUpdate = this.startTime;

            CanvasManager.Init(canvas);
        }

        public abstract PreInit(opts: any): void;
        public abstract Init(drawDeltaTime: number, updateDeltaTime: number): void;
        public abstract PostInit(): void;

        public Draw(): void {
            let timestamp = Math.round((new Date()).getTime() / 1000);
            let deltaTime = timestamp - this.lastDraw;
            let time = new Util.Time(this.Runtime, deltaTime);

            this.lastDraw = timestamp;
            CanvasManager.Draw(time);
        }
        public Update(): void {
            let timestamp = Math.round((new Date()).getTime() / 1000);
            let deltaTime = timestamp - this.lastUpdate;
            let time = new Util.Time(this.Runtime, deltaTime);

            this.lastUpdate = timestamp;
            CanvasManager.Update(time);
        }
    }
}