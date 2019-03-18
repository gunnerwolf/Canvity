import { Component } from '../Component/Component';
import { Time } from '../Util/Time';
import { IRenderingContext } from '../Render/IRenderingContext';
import { Aspect } from '../Aspect';

export abstract class System {
    public abstract get AspectType(): Array<{new(id: number): Component}>;

    public Draw(time: Time, ctx: IRenderingContext, aspects: Array<Aspect>): void { }
    public Update(time: Time, aspects: Array<Aspect>): void { }
}