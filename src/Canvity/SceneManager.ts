import { IRenderingContext } from "./Render/IRenderingContext";
import { Scene } from "./Scene";
import { HashSet } from "./Util/HashSet";
import { Time } from "./Util/Time";

export class SceneManager {
    private static instance: SceneManager;
    public static get Instance(): SceneManager {
        return (this.instance == null)
            ? (this.instance = new SceneManager())
            : this.instance;
    }

    private canvas: HTMLCanvasElement;
    public get Canvas(): HTMLCanvasElement { return this.canvas; }

    private ctx: IRenderingContext;
    public get Context(): IRenderingContext { return this.ctx; }

    private scenes: HashSet<Scene>;
    private currentScene: Scene;
    public get CurrentScene(): Scene { return this.currentScene; }

    public Init(canvas: HTMLCanvasElement, ctx: IRenderingContext): void {
        this.canvas = canvas;
        this.ctx = ctx;
        this.scenes = new HashSet<Scene>();

        let scene = new Scene();
        this.AddScene(scene);
        this.SwitchScene(scene);
    }

    public AddScene(scene: Scene): void {
        if (!this.scenes.Add(scene)) throw Error("Attempted to add Scene that was already added!");
    }
    public RemoveScene(scene: Scene): void {
        this.scenes.Remove(scene);
    }
    public SwitchScene(scene: Scene): void {
        if (!this.scenes.Contains(scene)) throw Error("Attempted to switch to Scene that does not exist!");
        this.currentScene = scene;
    }

    public Draw(time: Time) {
        if (this.currentScene === null || this.currentScene === undefined) return;
        this.currentScene.Draw(time, this.ctx);
        this.ctx.draw(time);
    }
    public Update(time: Time) {
        if (this.currentScene === null || this.currentScene === undefined) return;
        this.currentScene.Update(time);
    }
}
