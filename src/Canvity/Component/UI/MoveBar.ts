namespace Canvity.Component.UI {
    @Canvity.Component.Requires(UI.Window, Physics.RectCollider)
    export class MoveBar extends RectRenderer {
        private height: number;
        public get Height(): number { return this.height; }
        public set Height(val: number) { this.height = val; }

        private baseColor: Util.Color;

        private isDragging: boolean;

        private dragStart: Util.Vector2;

        private collider: Physics.RectCollider

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

        public Update(deltaTime: Util.Time): void {
            super.Update(deltaTime);

            Messaging.MessageBus.GetGlobalMessages('input').forEach(message => { this.handleInputMessage(message); }, this);
        }

        public GetRequiredComponents(obj: CanvasObject): Array<CanvasComponent> {
            let rect = new Physics.RectCollider(new Util.Rect());
            this.collider = rect;
            let compArr = new Array<CanvasComponent>(rect);
            if (!obj.HasComponent(UI.Window)) {
                let window = <Window>obj.AddComponent(new Window(Util.Color.Black), true);
                compArr.unshift(window);
            }
            return compArr;
        }

        protected onParentSet(): void {
            let window: UI.Window | null = this.CanvasObject.GetComponent(UI.Window);
            if (window !== null) {
                let windowRect: Util.Rect = window.Rect;
                this.Rect = new Util.Rect(0, 0, windowRect.W, this.height);
                this.collider.Rect = this.Rect;
                this.baseColor = window.Color;
            }
        }

        protected onMouseDown() {
            if (InputManager.IsLeftButtonDown) {
                this.isDragging = true;
                this.dragStart = InputManager.MousePos;
            }
        }
        protected onMouseUp() {
            if (!InputManager.IsLeftButtonDown) {
                this.isDragging = false;
            }
        }
        protected onMouseMove() {
            if (this.isDragging) {
                let transform: Transform | null = this.Transform;
                if (transform === null) return;
                
                transform.LocalPosition = transform.LocalPosition.Add(InputManager.MousePos.Sub(this.dragStart));
                this.dragStart = InputManager.MousePos;
            }
        }

        protected handleObjectMessage(message: Messaging.Message): void {
            let messageParts: Array<string> = message.Message.split('.');
            if (messageParts[0] === 'transform') {
                if (messageParts[1] === 'resize') {
                    let transform: Transform | null = this.Transform;
                    if (transform !== null) {
                        this.Rect = new Util.Rect(0, 0, (<RectTransform>transform).Rect.W, this.Height);
                        this.collider.Rect = this.Rect;
                    }
                }
            } else if (messageParts[0] === 'collider') {
                if (message.Data[0] !== this.collider) return;
                if (messageParts[1] !== 'mouse') return;
                if (messageParts[2] === 'down') this.onMouseDown();
            }
        }

        protected handleInputMessage(message: Messaging.Message): void {
            let messageParts: Array<string> = message.Message.split('.');
            if (messageParts[0] === 'mouse') {
                if (messageParts[1] === 'move') this.onMouseMove();
                else if (messageParts[1] === 'up') this.onMouseUp();
            }
        }
    }
}