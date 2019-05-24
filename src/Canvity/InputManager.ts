import { Vector2 } from "./Util/Vector2";

export class InputManager {
    private static _instance: InputManager;
    public static get Instance(): InputManager {
        return (this._instance == null)
            ? (this._instance = new InputManager())
            : this._instance;
    }

    private mousePos: Vector2;
    public get MousePos(): Vector2 { return this.mousePos; }

    private mouseDelta: Vector2;
    public get MouseDelta(): Vector2 { return this.mouseDelta; }

    private downButtons: number;
    public get IsLeftButtonDown(): boolean { return (this.downButtons & 1) !== 0; }
    public get IsRightButtonDown(): boolean { return (this.downButtons & 2) !== 0; }
    public get IsMiddleButtonDown(): boolean { return (this.downButtons & 4) !== 0; }

    public Init(): void {
        this.downButtons = 0;

        this.mousePos = new Vector2();
        this.mouseDelta = new Vector2();

        this.downButtons = 0;

        document.addEventListener("mousemove", this.HandleMouseMove);
        document.addEventListener("mousedown", this.HandleMouseDown);
        document.addEventListener("mouseup", this.HandleMouseUp);
    }

    public HandleMouseMove(mouse: MouseEvent): void {
        mouse.preventDefault();

        this.mousePos = new Vector2(mouse.pageX, mouse.pageY);
        this.mouseDelta = new Vector2(mouse.movementX, mouse.movementY);
    }

    public HandleMouseDown(mouse: MouseEvent): void {
        mouse.preventDefault();

        let pressed: number = mouse.buttons & ~this.downButtons;

        this.downButtons = mouse.buttons;
    }

    public HandleMouseUp(mouse: MouseEvent): void {
        mouse.preventDefault();

        let released: number = this.downButtons & ~mouse.buttons;

        this.downButtons = mouse.buttons;
    }
}
