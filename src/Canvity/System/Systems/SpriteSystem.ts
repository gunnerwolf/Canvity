import { System } from "../System";
import { Time } from "../../Util/Time";
import { IRenderingContext } from "../../Render/IRenderingContext";
import { Transform } from "../../Component/Components/Transform";
import { Sprite } from "../../Component/Components/Sprite";
import { Component } from "../../Component/Component";
import { Aspect } from "../../Aspect";

export class SpriteSystem extends System {
    private aspectType: Array<{new (id: number): Component}> = [
        Transform, Sprite
    ];

    public get AspectType(): Array<{new (id: number): Component}> {
        return this.aspectType;
    }

    public Draw(time: Time, ctx: IRenderingContext, aspects: Array<Aspect>): void {
        aspects.forEach(aspect => {
            let transform = aspect.Get(Transform);
            let sprite = aspect.Get(Sprite);

            ctx.drawSprite(sprite.sprite, transform.position.X, transform.position.Y);
        });
    }
}