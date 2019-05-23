import { InputManager } from "./InputManager";
import { IRenderingContext } from "./Render/IRenderingContext";
import { RenderingContext2D } from "./Render/RenderingContext2D";
import { RenderingContextWebGL } from "./Render/RenderingContextWebGL";
import { SceneManager } from "./SceneManager";
import { Time } from "./Util/Time";

export abstract class App {
    public static CurrentUpdateTime: Time;
    public static CurrentDrawTime: Time;

    private static instance: App;

    public static get renderContext(): IRenderingContext { return App.instance.ctx; }
    public static get renderContext2d(): RenderingContext2D | null {
        if (App.renderContext instanceof RenderingContext2D) {
            return App.renderContext as RenderingContext2D;
        }
        return null;
    }
    public static get renderContextWebGL(): RenderingContextWebGL | null {
        if (App.renderContext instanceof RenderingContextWebGL) {
            return App.renderContext as RenderingContextWebGL;
        }
        return null;
    }

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
    private ctx: IRenderingContext;

    private inputManager: InputManager;
    private sceneManager: SceneManager;

    private paused: boolean;
    public get Paused(): boolean { return this.paused; }

    public constructor(canvas: HTMLCanvasElement, inputManager: InputManager, sceneManager: SceneManager) {
        this.pausedTimeScale = 0;
        this.timeScale = 1;
        this.paused = false;
        this.startTime = new Date().getTime() / 1000;
        this.lastDraw = this.startTime;
        this.lastUpdate = this.startTime;

        this.canvas = canvas;
        App.instance = this;

        this.inputManager = inputManager;
        this.sceneManager = sceneManager;
    }

    public PreInit(opts: any): void {
        if (!opts.renderTarget) opts.renderTarget = "2d";
        switch (opts.renderTarget.toLowerCase()) {
            case "2d":
                this.ctx = new RenderingContext2D(this.canvas);
                break;
            case "gl":
            case "webgl":
            case "opengl":
                this.ctx = new RenderingContextWebGL(this.canvas);
                break;
        }
    }

    public Init(drawDeltaTime: number, updateDeltaTime: number): void {
        this.inputManager.Init();
        this.sceneManager.Init(this.canvas, this.ctx);
    }

    public PostInit(): void { }

    public Draw(): void {
        let timestamp = new Date().getTime() / 1000;
        let deltaTime = timestamp - this.lastDraw;
        let time = new Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);
        App.CurrentDrawTime = time;

        this.lastDraw = timestamp;
        this.sceneManager.Draw(time);
    }

    public Update(): void {
        let timestamp = new Date().getTime() / 1000;
        let deltaTime = timestamp - this.lastUpdate;
        this.runtime += deltaTime * this.timeScale;
        let time = new Time(this.Runtime, this.ActualRuntime, deltaTime, this.timeScale);
        App.CurrentUpdateTime = time;

        this.lastUpdate = timestamp;
        this.sceneManager.Update(time);
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
