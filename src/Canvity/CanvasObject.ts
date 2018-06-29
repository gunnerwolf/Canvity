import CanvasComponent = Canvity.Component.CanvasComponent;

namespace Canvity {
    export class CanvasObject extends CanvityObject {
        private parentObj: CanvasObject;
        public get ParentObj(): CanvasObject { return this.parentObj; }
        private scene: CanvasScene;
        public get Scene(): CanvasScene { return (this.parentObj === null) ? this.scene : this.parentObj.scene; }

        public get Transform(): Component.Transform { return this.GetComponent(Component.Transform); }

        private components: Util.HashSet<CanvasComponent>;

        public constructor(name: string, ...components: Array<CanvasComponent>) {
            super();
            this.name = name;

            this.components = new Util.HashSet<CanvasComponent>();

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

        public AddComponent(component: CanvasComponent): CanvasComponent {
            this.components.Add(component);
            component.CanvasObject = this;
            return component;
        }
        public AddComponentOfType<T extends CanvasComponent>(type: { new(): T ;} ): T {
            let component = new type();
            component.CanvasObject = this;
            return <T>this.AddComponent(component);
        }

        public GetComponent<T extends CanvasComponent>(type: { new(): T ;}): T {
            return <T>this.components.filter(element => { return element instanceof type; }).ToArray()[0];
        }
    }
}