namespace Canvity {
    export abstract class App {
        public static CurrentUpdateTime: Util.Time;
        public static CurrentDrawTime: Util.Time;

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

        private canvas: HTMLCanvasElement;
        private ctx: Render.IRenderingContext;

        private paused: boolean;
        public get Paused(): boolean { return this.paused; }

        private static instance: App;
        public static get renderContext(): Render.IRenderingContext { return App.instance.ctx; }
        public static get renderContext2d(): Render.RenderingContext2D | null {
            if (App.renderContext instanceof Render.RenderingContext2D)
                return <Render.RenderingContext2D> App.renderContext;
            return null;
        }
        public static get renderContextWebGL(): Render.RenderingContextWebGL | null {
            if (App.renderContext instanceof Render.RenderingContextWebGL)
                return <Render.RenderingContextWebGL> App.renderContext;
            return null;
        }

        public constructor(canvas: HTMLCanvasElement) {
            this.pausedTimeScale = 0;
            this.timeScale = 1;
            this.paused = false;
            this.startTime = new Date().getTime() / 1000;
            this.lastDraw = this.startTime;
            this.lastUpdate = this.startTime;

            this.canvas = canvas;
            App.instance = this;
        }

        public PreInit(opts: any): void {
            if (!opts.renderTarget) opts.renderTarget = '2d';
            switch(opts.renderTarget.toLowerCase()) {
                case '2d':
                    this.ctx = new Render.RenderingContext2D(this.canvas);
                    break;
                case 'gl':
                case 'webgl':
                case 'opengl':
                    this.ctx = new Render.RenderingContextWebGL(this.canvas);
                    break;
            }
        }
        public Init(drawDeltaTime: number, updateDeltaTime: number): void
        {
            Messaging.MessageBus.Init();
            InputManager.Init();
            CanvasManager.Init(this.canvas, this.ctx);
        }
        public PostInit(): void { }

        public Draw(): void {
            let timestamp = new Date().getTime() / 1000;
            let deltaTime = timestamp - this.lastDraw;
            let time = new Util.Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);
            App.CurrentDrawTime = time;

            this.lastDraw = timestamp;
            CanvasManager.Draw(time);
        }
        public Update(): void {
            let timestamp = new Date().getTime() / 1000;
            let deltaTime = timestamp - this.lastUpdate;
            this.runtime += deltaTime * this.timeScale;
            let time = new Util.Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);
            App.CurrentUpdateTime = time;

            this.lastUpdate = timestamp;
            CanvasManager.Update(time);

            Messaging.MessageBus.ClearMessages();
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