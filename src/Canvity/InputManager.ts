namespace Canvity {
    export class InputManager {
        private static mousePos: Util.Vector2;
        public static get MousePos(): Util.Vector2 { return InputManager.mousePos; }

        private static mouseDelta: Util.Vector2;
        public static get MouseDelta(): Util.Vector2 { return InputManager.mouseDelta; }

        private static onMouseMove: Events.CanvityEvent;
        public static get OnMouseMove(): Events.CanvityEvent { return InputManager.onMouseMove; }
        private static onMouseDown: Events.CanvityEvent;
        public static get OnMouseDown(): Events.CanvityEvent { return InputManager.onMouseDown; }
        private static onMouseUp: Events.CanvityEvent;
        public static get OnMouseUp(): Events.CanvityEvent { return InputManager.onMouseUp; }

        private static downButtons: number;
        public static get IsLeftButtonDown(): boolean { return (InputManager.downButtons & 1) !== 0; }
        public static get IsRightButtonDown(): boolean { return (InputManager.downButtons & 2) !== 0; }
        public static get IsMiddleButtonDown(): boolean { return (InputManager.downButtons & 4) !== 0; }

        public static Init(): void {
            InputManager.downButtons = 0;

            InputManager.onMouseMove = new Events.CanvityEvent();
            InputManager.onMouseDown = new Events.CanvityEvent();
            InputManager.onMouseUp = new Events.CanvityEvent();

            document.addEventListener('mousemove', InputManager.HandleMouseMove);
            document.addEventListener('mousedown', InputManager.HandleMouseDown);
            document.addEventListener('mouseup', InputManager.HandleMouseUp);
        }

        public static HandleMouseMove(mouse: MouseEvent): void {
            mouse.preventDefault();

            InputManager.mousePos = new Util.Vector2(mouse.pageX, mouse.pageY);
            InputManager.mouseDelta = new Util.Vector2(mouse.movementX, mouse.movementY);

            InputManager.OnMouseMove.Invoke();
        }

        public static HandleMouseDown(mouse: MouseEvent): void {
            mouse.preventDefault();

            let pressed: number = mouse.buttons & ~InputManager.downButtons;

            InputManager.downButtons = mouse.buttons;

            InputManager.OnMouseDown.Invoke(pressed);
        }

        public static HandleMouseUp(mouse: MouseEvent): void {
            mouse.preventDefault();
            
            let released: number = InputManager.downButtons & ~mouse.buttons

            InputManager.downButtons = mouse.buttons;

            InputManager.OnMouseUp.Invoke(released);
        }
    }
}