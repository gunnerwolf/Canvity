namespace Canvity {
    export abstract class App {
        protected timeScale: number;

        protected drawInterval: number;
        protected updateInterval: number;
        public set DrawInterval(val: number) { this.drawInterval = val; }
        public set UpdateInterval(val: number) { this.updateInterval = val; }

        protected startTime: number;
        public get ActualRuntime(): number { return (new Date().getTime() / 1000) - this.startTime; }

        private runtime: number;
        public get Runtime(): number { return (new Date().getTime() / 1000) - this.startTime; }
        
        private lastDraw: number;
        private lastUpdate: number;

        private pausedTimeScale: number;

        private paused: boolean;
        public get Paused(): boolean { return this.paused; }

        public constructor(canvas: HTMLCanvasElement) {
            this.pausedTimeScale = 0;
            this.timeScale = 1;
            this.paused = false;
            this.startTime = new Date().getTime() / 1000;
            this.lastDraw = this.startTime;
            this.lastUpdate = this.startTime;

            Messages.MessageBus.Init();
            InputManager.Init();
            CanvasManager.Init(canvas);
        }

        public abstract PreInit(opts: any): void;
        public abstract Init(drawDeltaTime: number, updateDeltaTime: number): void;
        public abstract PostInit(): void;

        public Draw(): void {
            let timestamp = new Date().getTime() / 1000;
            let deltaTime = timestamp - this.lastDraw;
            let time = new Util.Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);

            this.lastDraw = timestamp;
            CanvasManager.Draw(time);
        }
        public Update(): void {
            let timestamp = new Date().getTime() / 1000;
            let deltaTime = timestamp - this.lastUpdate;
            this.runtime += deltaTime * this.timeScale;
            let time = new Util.Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);

            this.lastUpdate = timestamp;
            CanvasManager.Update(time);
        }

        public Pause(): void {
            if (this.paused) return;
            this.pausedTimeScale = this.timeScale;
            this.timeScale = 0;
            this.paused = true;
        }
        public Unpause(): void {
            if (!this.paused) return;
            this.timeScale = this.pausedTimeScale;
            this.pausedTimeScale = 0;
            this.paused = false;
        }
    }
}