namespace Canvity {
    export class InputManager {
        private static mousePos: Util.Vector2;
        public static get MousePos(): Util.Vector2 { return InputManager.mousePos; }

        private static mouseDelta: Util.Vector2;
        public static get MouseDelta(): Util.Vector2 { return InputManager.mouseDelta; }

        private static downButtons: number;
        public static get IsLeftButtonDown(): boolean { return (InputManager.downButtons & 1) !== 0; }
        public static get IsRightButtonDown(): boolean { return (InputManager.downButtons & 2) !== 0; }
        public static get IsMiddleButtonDown(): boolean { return (InputManager.downButtons & 4) !== 0; }

        public static Init(): void {
            InputManager.downButtons = 0;

            this.mousePos = new Util.Vector2();
            this.mouseDelta = new Util.Vector2();

            this.downButtons = 0;

            document.addEventListener('mousemove', InputManager.HandleMouseMove);
            document.addEventListener('mousedown', InputManager.HandleMouseDown);
            document.addEventListener('mouseup', InputManager.HandleMouseUp);
        }

        public static HandleMouseMove(mouse: MouseEvent): void {
            mouse.preventDefault();

            InputManager.mousePos = new Util.Vector2(mouse.pageX, mouse.pageY);
            InputManager.mouseDelta = new Util.Vector2(mouse.movementX, mouse.movementY);

            Messages.MessageBus.PushGlobalMessage(new Messages.Message(App.CurrentUpdateTime, "mousemove", "input"));
        }

        public static HandleMouseDown(mouse: MouseEvent): void {
            mouse.preventDefault();

            let pressed: number = mouse.buttons & ~InputManager.downButtons;

            InputManager.downButtons = mouse.buttons;

            Messages.MessageBus.PushGlobalMessage(new Messages.Message(App.CurrentUpdateTime, "mousedown", "input", pressed));
        }

        public static HandleMouseUp(mouse: MouseEvent): void {
            mouse.preventDefault();
            
            let released: number = InputManager.downButtons & ~mouse.buttons

            InputManager.downButtons = mouse.buttons;

            Messages.MessageBus.PushGlobalMessage(new Messages.Message(App.CurrentUpdateTime, "mouseup", "input", released));
        }
    }
}