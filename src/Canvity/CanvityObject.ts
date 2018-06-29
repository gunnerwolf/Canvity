namespace Canvity {
    export abstract class CanvityObject {
        private id: string;
        public get InstanceID(): string { return this.id; }

        protected name: string;
        public get Name(): string { return this.name; }

        protected constructor() {
            this.id = ObjectManager.GenerateID();
        }

        public ToString() {
            return this.Name;
        }

        public Equals(obj: CanvityObject) {
            return this.id === obj.id;
        }
    }
}