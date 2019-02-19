import { ISystem } from "../ISystem";
import { Time } from "../../Util/Time";
import { IRenderingContext } from "../../Render/IRenderingContext";
import { CanvasScene } from "../../CanvasScene";
import { Transform } from "../../Component/Components/Transform";
import { Sprite } from "../../Component/Components/Sprite";

export class SpriteSystem implements ISystem {
    public Draw(time: Time, ctx: IRenderingContext, scene: CanvasScene): void {
        let aspects = scene.GetAspects(Transform, Sprite);
        aspects.forEach(aspect => {
            let transform = aspect.Get(Transform);
            let sprite = aspect.Get(Sprite);

            ctx.drawSprite(sprite.sprite, transform.position.X, transform.position.Y);
        });
    }
    
    public Update(time: Time, scene: CanvasScene): void { }
}