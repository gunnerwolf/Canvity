namespace Canvity.Component {
    export abstract class CanvasComponent extends CanvityObject {
        protected canvasObject: CanvasObject;
        public get CanvasObject(): CanvasObject { return this.canvasObject; }
        public set CanvasObject(obj: CanvasObject) { if (!this.canvasObject) this.canvasObject = obj; }
        
        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {}
        public Update(time: Util.Time): void {}
    }
}