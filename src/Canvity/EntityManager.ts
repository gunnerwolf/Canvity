import { IComponentManager } from './Component/IComponentManager';

export class EntityManager {
    public static createEntity(... components: IComponentManager[]): number {
        let entityID = EntityManager.generateID();

        components.forEach(component => {
            component.createComponent(entityID);
        });

        return entityID;
    }

    private static readonly ID_LENGTH = 16;

    private static generateID(): number {
        let out = 0;
        for(let i = 0; i < EntityManager.ID_LENGTH - 1; i++) {
            out += Math.floor((Math.random() * 10)) * Math.pow(10, i);
        }
        out += Math.floor((Math.random() * 9) + 1) * Math.pow(10, EntityManager.ID_LENGTH - 1);

        return out;
    }
}