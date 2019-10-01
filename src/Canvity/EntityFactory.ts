import { IComponentManager } from "./Component/IComponentManager";

export class EntityFactory {

    private static readonly ID_LENGTH = 16;
    public static CreateEntity(... components: Array<IComponentManager>): number {
        let entityID = EntityFactory.generateID();

        components.forEach(component => {
            component.CreateComponent(entityID);
        });

        return entityID;
    }

    private static generateID(): number {
        let out = 0;
        for (let i = 0; i < EntityFactory.ID_LENGTH - 1; i++) {
            out += Math.floor((Math.random() * 10)) * Math.pow(10, i);
        }
        out += Math.floor((Math.random() * 9) + 1) * Math.pow(10, EntityFactory.ID_LENGTH - 1);

        return out;
    }
}
