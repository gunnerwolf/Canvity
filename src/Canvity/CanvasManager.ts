namespace Canvity {
    export class CanvasManager {
        private static canvas: HTMLCanvasElement;
        public static get Canvas(): HTMLCanvasElement { return CanvasManager.canvas; }
        
        private static ctx: Render.IRenderingContext;
        public static get Context(): Render.IRenderingContext { return CanvasManager.ctx; }

        private static scenes: Util.HashSet<CanvasScene>;
        private static currentScene: CanvasScene;
        public static get CurrentScene(): CanvasScene { return this.currentScene; }

        public static Init(canvas: HTMLCanvasElement, ctx: Render.IRenderingContext): void {
            CanvasManager.canvas = canvas;
            CanvasManager.ctx = ctx;
            CanvasManager.scenes = new Util.HashSet<CanvasScene>();
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

        public static Draw(time: Util.Time) {
            if (CanvasManager.currentScene === null || CanvasManager.currentScene === undefined) return;
            CanvasManager.currentScene.Draw(time, CanvasManager.ctx);
        }
        public static Update(time: Util.Time) {
            if (CanvasManager.currentScene === null || CanvasManager.currentScene === undefined) return;
            CanvasManager.currentScene.Update(time);
        }

        public static Start() {
            if (CanvasManager.currentScene === null || CanvasManager.currentScene === undefined) throw Error("Attempted to start app with no scenes added!");
            CanvasManager.currentScene.Start();
        }
    }
}