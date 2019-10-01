import { Component } from "./Component/Component";
import { ComponentManager } from "./Component/ComponentManager";
import { IComponentManager } from "./Component/IComponentManager";
import { EntityFactory } from "./EntityFactory";
import { InputManager } from "./InputManager";
import { IRenderingContext } from "./Render/IRenderingContext";
import { RenderingContext2D } from "./Render/RenderingContext2D";
import { RenderingContextWebGL } from "./Render/RenderingContextWebGL";
import { SceneManager } from "./SceneManager";
import { System } from "./System/System";
import { Time } from "./Util/Time";

export abstract class App {

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
    public set DrawInterval(val: number) { this.drawInterval = val; }
    public set UpdateInterval(val: number) { this.updateInterval = val; }
    public get ActualRuntime(): number { return (new Date().getTime() / 1000) - this.startTime; }
    public get Runtime(): number { return (new Date().getTime() / 1000) - this.startTime; }
    public get Paused(): boolean { return this.paused; }
    public static CurrentUpdateTime: Time;
    public static CurrentDrawTime: Time;

    private static instance: App;

    private runtime: number;

    private lastDraw: number;
    private lastUpdate: number;

    private pausedTimeScale: number;

    private canvas: HTMLCanvasElement;
    private ctx: IRenderingContext;

    private inputManager: InputManager;
    private sceneManager: SceneManager;

    private paused: boolean;

    protected timeScale: number;

    protected drawInterval: number;
    protected updateInterval: number;

    protected startTime: number;

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

    public RegisterSystem(system: new() => System): void {
        this.sceneManager.RegisterSystem(new system());
    }

    public CreateEntity(...components: Array<new(id: number) => Component>): number {
        let compManagers: Array<IComponentManager> = components.map(c => this.getOrCreateComponentManager(c));
        let entityId: number = EntityFactory.CreateEntity(...compManagers);
        return entityId;
    }

    public GetComponent<T extends Component>(TCtor: new (...args: Array<any>) => T, entityId: number): T | null {
        let compManager: ComponentManager<T> | null = this.sceneManager.CurrentScene.GetComponentManager(TCtor);
        if (compManager === null) return null;
        return compManager.GetComponent(entityId);
    }

    private getOrCreateComponentManager(component: new(id: number) => Component): IComponentManager {
        let compManager: IComponentManager | null = this.sceneManager.CurrentScene.GetComponentManager(component);
        if (compManager === null) {
            compManager = new ComponentManager(component);
            this.sceneManager.CurrentScene.AddComponentManager(compManager);
        }
        return compManager;
    }
}
