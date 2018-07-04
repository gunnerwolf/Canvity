namespace Canvity {
    export class InputManager {
        private static mousePos: Util.Vector2;
        public static get MousePos(): Util.Vector2 { return this.mousePos; }

        private static mouseDelta: Util.Vector2;
        public static get MouseDelta(): Util.Vector2 { return this.mouseDelta; }

        private static onMouseMove: Events.CanvityEvent;
        public static get OnMouseMove(): Events.CanvityEvent { return this.onMouseMove; }
        private static onMouseDown: Events.CanvityEvent;
        public static get OnMouseDown(): Events.CanvityEvent { return this.onMouseDown; }
        private static onMouseUp: Events.CanvityEvent;
        public static get OnMouseUp(): Events.CanvityEvent { return this.onMouseUp; }

        private static downButtons: number;
        public static get IsLeftButtonDown(): boolean { return (this.downButtons & 1) !== 0; }
        public static get IsRightButtonDown(): boolean { return (this.downButtons & 2) !== 0; }
        public static get IsMiddleButtonDown(): boolean { return (this.downButtons & 4) !== 0; }

        public static Init(): void {
            this.downButtons = 0;

            document.addEventListener('mousemove', this.HandleMouseMove);
            document.addEventListener('mousedown', this.HandleMouseDown);
            document.addEventListener('mouseup', this.HandleMouseUp);
        }

        public static HandleMouseMove(mouse: MouseEvent): void {
            mouse.preventDefault();

            this.mousePos = new Util.Vector2(mouse.pageX, mouse.pageY);
            this.mouseDelta = new Util.Vector2(mouse.movementX, mouse.movementY);

            this.OnMouseMove.Invoke();
        }

        public static HandleMouseDown(mouse: MouseEvent): void {
            mouse.preventDefault();

            let pressed: number = mouse.buttons & ~this.downButtons;

            this.downButtons = mouse.buttons;

            this.OnMouseDown.Invoke(pressed);
        }

        public static HandleMouseUp(mouse: MouseEvent): void {
            mouse.preventDefault();
            
            let released: number = this.downButtons & ~mouse.buttons

            this.downButtons = mouse.buttons;

            this.OnMouseUp.Invoke(released);
        }
    }
}