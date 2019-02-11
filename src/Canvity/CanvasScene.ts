namespace Canvity {
    export class CanvasScene {
        private started: boolean;

        private objects: Array<CanvasObject>;
        private background: Util.Color;

        public get Background(): Util.Color { return this.background; }
        public set Background(val: Util.Color) { this.background = val; }

        public constructor() {
            this.objects = new Array<CanvasObject>();
            this.Background = Util.Color.Transparent;
            this.started = false;
        }

        public Draw(time: Util.Time, ctx: Render.IRenderingContext): void {
            if (!this.started) return;
            ctx.drawRectFromCoords(0, 0, ctx.contextWidth, ctx.contextHeight, this.Background);

            this.objects.sort((a: CanvasObject, b: CanvasObject) => {
                return a.Transform.ZIndex - b.Transform.ZIndex;
            }).forEach((element: CanvasObject) => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            if (!this.started) return;
            this.objects.forEach(element => {
                element.Update(time);
            });
        }

        public AddObject(obj: CanvasObject): void {
            this.objects.push(obj);
        }

        public Start() {
            this.started = true;
            this.objects.sort((a: CanvasObject, b: CanvasObject) => {
                return a.Transform.ZIndex - b.Transform.ZIndex;
            }).forEach((element: CanvasObject) => {
                element.Start(this);
            })
        }
    }
}