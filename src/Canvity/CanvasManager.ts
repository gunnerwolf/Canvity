namespace Canvity {
    export class CanvasManager {
        private static canvas: HTMLCanvasElement;
        private static ctx: CanvasRenderingContext2D;
        private static scenes: Util.HashSet<CanvasScene>;
        private static currentScene: CanvasScene;

        public static Init(canvas: HTMLCanvasElement): void {
            this.canvas = canvas;
            let ctx = canvas.getContext('2d');
            if (ctx !== null) this.ctx = ctx;

            this.scenes = new Util.HashSet<CanvasScene>();
        }

        public static AddScene(scene: CanvasScene): void {
            if (!this.scenes.Add(scene)) throw Error('Attempted to add Scene that was already added!');
        }
        public static RemoveScene(scene: CanvasScene): void {
            this.scenes.Remove(scene);
        }
        public static SwitchScene(scene: CanvasScene): void {
            if (!this.scenes.Contains(scene)) throw Error('Attempted to switch to Scene that does not exist!');
            this.currentScene = scene;
        }

        public static GetCanvas(): HTMLCanvasElement {
            return this.canvas;
        }
        public static GetContext(): CanvasRenderingContext2D {
            return this.ctx;
        }
        public static GetCurrentScene(): CanvasScene {
            return this.currentScene;
        }

        public static Draw(time: Util.Time) {
            this.currentScene.Draw(time, this.ctx);
        }
        public static Update(time: Util.Time) {
            this.currentScene.Update(time);
        }
    }
}