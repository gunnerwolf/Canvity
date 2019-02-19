import { IComponentManager } from './Component/IComponentManager';

export class EntityManager {
    public createEntity(... components: IComponentManager[]): number {
        let entityID = this.generateID();

        components.forEach(component => {
            component.createComponent(entityID);
        });

        return entityID;
    }

    private readonly ID_LENGTH = 16;

    private generateID(): number {
        let out = 0;
        for(let i = 0; i < this.ID_LENGTH - 1; i++) {
            out += Math.floor((Math.random() * 10)) * Math.pow(10, i);
        }
        out += Math.floor((Math.random() * 9) + 1) * Math.pow(10, this.ID_LENGTH - 1);

        return out;
    }
}