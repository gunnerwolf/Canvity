namespace Canvity.Component {
    export abstract class CanvasComponent extends CanvityObject {
        protected canvasObject: CanvasObject;
        public get CanvasObject(): CanvasObject { return this.canvasObject; }
        public set CanvasObject(obj: CanvasObject) { if (!this.canvasObject) this.canvasObject = obj; }

        public get Transform(): Transform { return this.canvasObject.Transform; }
        
        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {}
        public Update(time: Util.Time): void {}
    }
}