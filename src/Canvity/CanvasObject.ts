namespace Canvity {
    export class CanvasObject extends CanvityObject {
        private parentObj: CanvasObject;
        private components: Util.HashSet<Component.CanvasComponent>;
        private scene: CanvasScene;

        public constructor(name: String, ...components: Array<Component.CanvasComponent>) {
            super();
            this.name = name;

            this.components = new Util.HashSet<Component.CanvasComponent>();

            this.AddComponentOfType(Component.Transform);
            components.forEach(element => {
                this.AddComponent(element);
            });
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            this.components.forEach(element => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.components.forEach(element => {
                element.Update(time);
            });
        }

        public GetParentObj(): CanvasObject {
            return this.parentObj;
        }
        public GetScene(): CanvasScene {
            if (this.parentObj !== null) {
                return this.parentObj.GetScene();
            } else {
                return this.scene;
            }
        }

        public AddComponent(component: Component.CanvasComponent): Component.CanvasComponent {
            this.components.Add(component);
            component.SetParent(this);
            return component;
        }
        public AddComponentOfType<T extends Component.CanvasComponent>(type: { new(): T ;} ): Component.CanvasComponent {
            let component = new type();
            component.SetParent(this);
            return this.AddComponent(component);
        }

        public GetComponent<T extends Component.CanvasComponent>(type: { new(): T ;} ) {
            return this.components.filter(element => { return element instanceof type; });
        }
    }
}