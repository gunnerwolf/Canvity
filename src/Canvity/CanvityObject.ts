namespace Canvity {
    export abstract class CanvityObject {
        protected started: boolean;

        private id: string;
        public get InstanceID(): string { return this.id; }

        protected name: string;
        public get Name(): string { return this.name; }

        protected constructor() {
            this.id = ObjectManager.GenerateID();
            if (!ObjectManager.RegisterObject(this)) throw Error("Could not register object with id " + this.InstanceID + ". An object with that ID has already been registered!");
        }

        public ToString() {
            return this.Name;
        }

        public Equals(obj: CanvityObject) {
            return this.id === obj.id;
        }
    }
}