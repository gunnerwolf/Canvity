namespace Canvity.Component {
    export abstract class CanvasComponent extends CanvityObject {
        private requires: Array<{ new (...args: any[]): CanvasComponent; }> = new Array<{ new (...args: any[]): CanvasComponent; }>();
        public get Requires(): Array<{ new (...args: any[]): CanvasComponent; }> { return this.requires; }

        private unique: boolean = false;
        public get Unique(): boolean { return this.unique; }

        protected canvasObject: CanvasObject;
        public get CanvasObject(): CanvasObject { return this.canvasObject; }
        public set CanvasObject(obj: CanvasObject) { if (!this.canvasObject) this.canvasObject = obj; }

        public get Transform(): Transform | null {
            if (this.canvasObject) {
                return this.canvasObject.Transform;
            } else {
                return null;
            }
        }
        
        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {}
        public Update(time: Util.Time): void {}
    }
}