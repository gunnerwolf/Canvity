namespace Canvity {
    export class CanvasScene {
        private objects: Array<CanvasObject>;

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            this.objects.sort((a: CanvasObject, b: CanvasObject) => {
                return a.Transform.ZIndex - b.Transform.ZIndex;
            }).forEach((element: CanvasObject) => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.objects.forEach(element => {
                element.Update(time);
            });
        }

        public AddObject(obj: CanvasObject): void {
            this.objects.push(obj);
        }
    }
}