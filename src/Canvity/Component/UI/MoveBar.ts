namespace Canvity.Component.UI {
    @Canvity.Component.Requires(UI.Window)
    export class MoveBar extends RectRenderer {
        private height: number;
        public get Height(): number { return this.height; }
        public set Height(val: number) { this.height = val; }

        private baseColor: Util.Color;

        public constructor(height: number) {
            super(new Util.Color(255, 255, 255, 150));

            this.height = height;
        }

        public Draw(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.fillStyle = this.baseColor.CssString;
            ctx.fillRect(this.Rect.X, this.Rect.Y, this.Rect.W, this.height);

            super.Draw(deltaTime, ctx);

            ctx.strokeStyle = this.baseColor.CssString;
            ctx.lineWidth = 2;
            ctx.strokeRect(this.Rect.X, this.Rect.Y, this.Rect.W, this.height);
        }

        protected onParentSet(): void {
            let window: UI.Window | null = this.CanvasObject.GetComponent(UI.Window);
            if (window !== null) {
                let windowRect: Util.Rect = window.Rect;
                this.Rect = new Util.Rect(0, 0, windowRect.W, this.height);
                console.log(this.Rect);
                this.baseColor = window.Color;
            }
        }

        protected handleObjectMessage(message: Messaging.Message): void {
            let messageParts: Array<string> = message.Message.split('.');
            if (messageParts[0] === 'transform') {
                console.log(messageParts);
                if (messageParts[1] === 'resize') {
                    let transform: Transform | null = this.Transform;
                    if (transform !== null) {
                        console.log("new width", (<RectTransform>transform).Rect.W);
                        this.Rect = new Util.Rect(0, 0, (<RectTransform>transform).Rect.W, this.Height);
                        console.log(this.Rect);
                    }
                }
            } else if (messageParts[0] !== 'collider') console.log(message);
        }
    }
}