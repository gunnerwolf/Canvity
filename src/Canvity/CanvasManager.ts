namespace Canvity {
    export class CanvasManager {
        private static canvas: HTMLCanvasElement;
        public static get Canvas(): HTMLCanvasElement { return this.canvas; }
        
        private static ctx: CanvasRenderingContext2D;
        public static get Context(): CanvasRenderingContext2D { return this.ctx; }

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

        public static Draw(time: Util.Time) {
            if (this.currentScene === null || this.currentScene === undefined) return;
            this.currentScene.Draw(time, this.ctx);
        }
        public static Update(time: Util.Time) {
            if (this.currentScene === null || this.currentScene === undefined) return;
            this.currentScene.Update(time);
        }
    }
}