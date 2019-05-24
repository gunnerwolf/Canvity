export abstract class Component {
    protected entityID: number;
    public get EntityID(): number { return this.entityID; }

    public constructor(id: number) {
        this.entityID = id;
    }

    public static createComponent<T extends Component>(c: new(id: number) => T, entityID: number): T {
        return new c(entityID);
    }
}
