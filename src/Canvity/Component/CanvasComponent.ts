namespace Canvity.Component {
    export abstract class CanvasComponent {
        protected parentObj: CanvasObject;

        public SetParent(obj: CanvasObject): void {
            if (!this.parentObj) this.parentObj = obj;
        }
        
        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {}
        public Update(time: Util.Time): void {}
    }
}