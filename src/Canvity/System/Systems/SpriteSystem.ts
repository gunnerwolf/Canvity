import { Aspect } from "../../Aspect";
import { Component } from "../../Component/Component";
import { Sprite } from "../../Component/Components/Sprite";
import { Transform } from "../../Component/Components/Transform";
import { IRenderingContext } from "../../Render/IRenderingContext";
import { Time } from "../../Util/Time";
import { System } from "../System";

export class SpriteSystem extends System {
    public get AspectType(): Array<new (id: number) => Component> { return [Transform, Sprite]; }

    public Draw(time: Time, ctx: IRenderingContext, aspects: Array<Aspect>): void {
        aspects.forEach(aspect => {
            let transform = aspect.Get(Transform);
            let sprite = aspect.Get(Sprite);

            if (transform === null || sprite === null) throw new Error("Invalid aspect passed!");

            if (transform.position === undefined || sprite.sprite === undefined) return;

            ctx.drawSprite(
                sprite.sprite,
                transform.position.X - sprite.sprite.Image.width / 2,
                transform.position.Y - sprite.sprite.Image.height / 2
            );
        });
    }
}
