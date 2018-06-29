namespace Canvity {
    export class CanvasScene {
        private objects: Array<CanvasObject>;

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            this.objects.forEach(element => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.objects.forEach(element => {
                element.Update(time);
            });
        }
    }
}