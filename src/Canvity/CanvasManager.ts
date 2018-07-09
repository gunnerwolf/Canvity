namespace Canvity {
    export class CanvasManager {
        private static canvas: HTMLCanvasElement;
        public static get Canvas(): HTMLCanvasElement { return CanvasManager.canvas; }
        
        private static ctx: CanvasRenderingContext2D;
        public static get Context(): CanvasRenderingContext2D { return CanvasManager.ctx; }

        private static scenes: Util.HashSet<CanvasScene>;
        private static currentScene: CanvasScene;

        public static Init(canvas: HTMLCanvasElement): void {
            CanvasManager.canvas = canvas;
            let ctx = canvas.getContext('2d');
            if (ctx !== null) CanvasManager.ctx = ctx;
            else throw Error("Could not get canvas context!");

// TODO: Strip out events and replace with messages
            InputManager.OnMouseMove.AddEventListener(this.handleMouseMove);
// TODO: Strip out events and replace with messages
            InputManager.OnMouseDown.AddEventListener(this.handleMouseDown);
// TODO: Strip out events and replace with messages
            InputManager.OnMouseUp.AddEventListener(this.handleMouseUp);

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

        private static handleMouseMove() {
            CanvasManager.currentScene.HandleMouseMove();
        }
        private static handleMouseDown() {
            CanvasManager.currentScene.HandleMouseDown();
        }
        private static handleMouseUp() {
            CanvasManager.currentScene.HandleMouseUp();
        }
    }
}