namespace Canvity {
    export class CanvasScene {
        private objects: Array<CanvasObject>;
        private background: Util.Color;

        public get Background(): Util.Color { return this.background; }
        public set Background(val: Util.Color) { this.background = val; }

        public constructor() {
            this.objects = new Array<CanvasObject>();
            this.Background = Util.Color.Transparent;
        }

        public Draw(time: Util.Time, ctx: CanvasRenderingContext2D): void {
            ctx.fillStyle = this.Background.CssString;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            this.objects.sort((a: CanvasObject, b: CanvasObject) => {
                return a.Transform.ZIndex - b.Transform.ZIndex;
            }).forEach((element: CanvasObject) => {
                element.Draw(time, ctx);
            });
        }
        public Update(time: Util.Time): void {
            this.objects.forEach(element => {
                element.Update(time);
            });
        }

        public AddObject(obj: CanvasObject): void {
            this.objects.push(obj);
        }

        public HandleMouseMove() {
            this.objects.filter(obj => obj.HasComponent(Component.Physics.BaseCollider)).forEach(obj => {
                obj.GetComponents(Component.Physics.BaseCollider).forEach(collider => {
                    if (collider.CheckIsCollision(InputManager.MousePos)) {
                        collider.HandleMouseMove();
                    }
                })
            });
        }
        public HandleMouseDown() {
            this.objects.filter(obj => obj.HasComponent(Component.Physics.BaseCollider)).forEach(obj => {
                obj.GetComponents(Component.Physics.BaseCollider).forEach(collider => {
                    if (collider.CheckIsCollision(InputManager.MousePos)) {
                        collider.HandleMouseDown();
                    }
                })
            });

        }
        public HandleMouseUp() {
            this.objects.filter(obj => obj.HasComponent(Component.Physics.BaseCollider)).forEach(obj => {
                obj.GetComponents(Component.Physics.BaseCollider).forEach(collider => {
                    if (collider.CheckIsCollision(InputManager.MousePos)) {
                        collider.HandleMouseUp();
                    }
                })
            });

        }
    }
}