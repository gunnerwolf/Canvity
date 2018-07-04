namespace Canvity.Component.UI {
    @Canvity.Component.Requires(RectTransform, Physics.RectCollider)
    export class Window extends RectRenderer {
        private isDragging: boolean;

        private resizable: boolean;
        public get Resizable(): boolean { return this.resizable; }
        public set Resizable(val: boolean) { this.resizable = val; }

        private moveable: boolean;
        public get Moveable(): boolean { return this.moveable; }
        public set Moveable(val: boolean) { this.moveable = val; }

        private topBarHeight: number;
        public get TopBarHeight(): number { return this.topBarHeight; }
        public set TopBarHeight(val: number) { this.topBarHeight = Math.min(val, this.Rect.H); }

        public constructor(resizable: boolean, moveable: boolean, color: Util.Color) {
            super(color);

            this.resizable = resizable;
            this.moveable = moveable;

            this.isDragging = false;
        }

        public Draw(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.strokeStyle = this.Color.CssString;
            // TODO: Add configurable border width
            ctx.lineWidth = 2;

            ctx.strokeRect(this.Rect.X, this.Rect.Y, this.Rect.W, this.Rect.H);

            if (this.resizable) {
                this.drawResizeTab(deltaTime, ctx);
            }
            if (this.moveable) {
                this.drawTopBar(deltaTime, ctx);
            }
        }

        protected onParentSet(): void {
            let collider: Physics.RectCollider = this.CanvasObject.GetComponent(Physics.RectCollider);

            collider.OnMouseDown.AddEventListener(this.onMouseDown);
            collider.OnMouseUp.AddEventListener(this.onMouseUp);
            collider.OnMouseMove.AddEventListener(this.onMouseMove);
        }

        private drawResizeTab(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            // TODO: Draw resize tab in bottom right corner
        }

        private drawTopBar(deltaTime: Util.Time, ctx: CanvasRenderingContext2D): void {
            // TODO: Draw top drag bar
        }

        private onMouseDown(args: Array<any>): void {
            if (new Util.Rect(this.Rect.X, this.Rect.Y, this.Rect.W, this.TopBarHeight).ContainsPoint(InputManager.MousePos)) {
                this.isDragging = true;
            }
        }
        private onMouseUp(args: Array<any>): void {
            this.isDragging = false;
        }
        private onMouseMove(args: Array<any>): void {
            if (this.isDragging && this.Transform !== null) {
                this.Transform.Translate(InputManager.MouseDelta);
            }
        }
    }
}