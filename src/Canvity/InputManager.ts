import { Vector2 } from "./Util/Vector2";

export class InputManager {
    private static mousePos: Vector2;
    public static get MousePos(): Vector2 { return InputManager.mousePos; }

    private static mouseDelta: Vector2;
    public static get MouseDelta(): Vector2 { return InputManager.mouseDelta; }

    private static downButtons: number;
    public static get IsLeftButtonDown(): boolean { return (InputManager.downButtons & 1) !== 0; }
    public static get IsRightButtonDown(): boolean { return (InputManager.downButtons & 2) !== 0; }
    public static get IsMiddleButtonDown(): boolean { return (InputManager.downButtons & 4) !== 0; }

    public static Init(): void {
        InputManager.downButtons = 0;

        this.mousePos = new Vector2();
        this.mouseDelta = new Vector2();

        this.downButtons = 0;

        document.addEventListener('mousemove', InputManager.HandleMouseMove);
        document.addEventListener('mousedown', InputManager.HandleMouseDown);
        document.addEventListener('mouseup', InputManager.HandleMouseUp);
    }

    public static HandleMouseMove(mouse: MouseEvent): void {
        mouse.preventDefault();

        InputManager.mousePos = new Vector2(mouse.pageX, mouse.pageY);
        InputManager.mouseDelta = new Vector2(mouse.movementX, mouse.movementY);
    }

    public static HandleMouseDown(mouse: MouseEvent): void {
        mouse.preventDefault();

        let pressed: number = mouse.buttons & ~InputManager.downButtons;

        InputManager.downButtons = mouse.buttons;
    }

    public static HandleMouseUp(mouse: MouseEvent): void {
        mouse.preventDefault();
        
        let released: number = InputManager.downButtons & ~mouse.buttons;

        InputManager.downButtons = mouse.buttons;
    }
}