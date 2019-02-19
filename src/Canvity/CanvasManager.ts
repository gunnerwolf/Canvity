import { IRenderingContext } from "./Render/IRenderingContext";
import { HashSet } from "./Util/HashSet";
import { CanvasScene } from "./CanvasScene";
import { Time } from "./Util/Time";

export class CanvasManager {
    private static canvas: HTMLCanvasElement;
    public static get Canvas(): HTMLCanvasElement { return CanvasManager.canvas; }
    
    private static ctx: IRenderingContext;
    public static get Context(): IRenderingContext { return CanvasManager.ctx; }

    private static scenes: HashSet<CanvasScene>;
    private static currentScene: CanvasScene;
    public static get CurrentScene(): CanvasScene { return this.currentScene; }

    public static Init(canvas: HTMLCanvasElement, ctx: IRenderingContext): void {
        CanvasManager.canvas = canvas;
        CanvasManager.ctx = ctx;
        CanvasManager.scenes = new HashSet<CanvasScene>();
        
        let scene = new CanvasScene();
        CanvasManager.AddScene(scene);
        CanvasManager.SwitchScene(scene);
    }

    public static AddScene(scene: CanvasScene): void {
        if (!CanvasManager.scenes.Add(scene)) throw Error('Attempted to add Scene that was already added!');
    }
    public static RemoveScene(scene: CanvasScene): void {
        CanvasManager.scenes.Remove(scene);
    }
    public static SwitchScene(scene: CanvasScene): void {
        if (!CanvasManager.scenes.Contains(scene)) throw Error('Attempted to switch to Scene that does not exist!');
        CanvasManager.currentScene = scene;
    }

    public static Draw(time: Time) {
        if (CanvasManager.currentScene === null || CanvasManager.currentScene === undefined) return;
        CanvasManager.currentScene.Draw(time, CanvasManager.ctx);
        CanvasManager.ctx.draw(time);
    }
    public static Update(time: Time) {
        if (CanvasManager.currentScene === null || CanvasManager.currentScene === undefined) return;
        CanvasManager.currentScene.Update(time);
    }
}