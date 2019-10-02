import { Vector2 } from "./Util/Vector2";

export class InputManager {
    private static instance: InputManager;
    public static get Instance(): InputManager {
        return (this.instance == null)
            ? (this.instance = new InputManager())
            : this.instance;
    }

    private mousePos: Vector2;
    public get MousePos(): Vector2 { return this.mousePos; }

    private mouseDelta: Vector2;
    public get MouseDelta(): Vector2 { return this.mouseDelta; }

    private downButtons: number;
    public get IsLeftButtonDown(): boolean { return (this.downButtons & 1) !== 0; }
    public get IsRightButtonDown(): boolean { return (this.downButtons & 2) !== 0; }
    public get IsMiddleButtonDown(): boolean { return (this.downButtons & 4) !== 0; }

    private initialized: boolean = false;

    public Init(): void {
        if (this.initialized) return;
        if (InputManager.instance === null) {
            InputManager.instance = this;
        } else if (InputManager.instance !== this) {
            throw new Error("Multiple InputManagers initialized");
        }
        this.downButtons = 0;

        this.mousePos = new Vector2();
        this.mouseDelta = new Vector2();

        this.downButtons = 0;

        document.addEventListener("mousemove", this.HandleMouseMove);
        document.addEventListener("mousedown", this.HandleMouseDown);
        document.addEventListener("mouseup", this.HandleMouseUp);
        this.initialized = true;
    }

    public HandleMouseMove(mouse: MouseEvent): void {
        mouse.preventDefault();

        InputManager.Instance.mousePos = new Vector2(mouse.pageX, mouse.pageY);
        InputManager.Instance.mouseDelta = new Vector2(mouse.movementX, mouse.movementY);
    }

    public HandleMouseDown(mouse: MouseEvent): void {
        mouse.preventDefault();

        let pressed: number = mouse.buttons & ~InputManager.Instance.downButtons;

        InputManager.Instance.downButtons = mouse.buttons;
    }

    public HandleMouseUp(mouse: MouseEvent): void {
        mouse.preventDefault();

        let released: number = InputManager.Instance.downButtons & ~mouse.buttons;

        InputManager.Instance.downButtons = mouse.buttons;
    }
}
