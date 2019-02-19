import { IComponentManager } from './Component/IComponentManager';
import { ComponentManager } from './Component/ComponentManager';
import { Component } from './Component/Component';
import { ISystem } from './System/ISystem';
import { Color } from './Util/Color';
import { Time } from './Util/Time';
import { HashSet } from './Util/HashSet';

export class CanvasScene {
    private started: boolean;

    private systems: HashSet<ISystem>;
    private componentManagers: HashSet<IComponentManager>;
    private background: Color;

    public get Background(): Color { return this.background; }
    public set Background(val: Color) { this.background = val; }

    public constructor() {
        this.componentManagers = new HashSet<IComponentManager>();
        this.Background = Color.Transparent;
        this.started = false;
    }

    public GetComponentManager<T extends Component>(c: {new(id: number): T}): ComponentManager<T> | null {
        let TManagers = this.componentManagers.filter(x => x.Type == c).ToArray();
        if (TManagers.length == 0) return null;
        return <ComponentManager<T>>TManagers[0];
    }

    public Update(time: Time): void {
        if (!this.started) return;
        this.systems.forEach(element => {
            element.Update(time, this);
        });
    }
}