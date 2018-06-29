namespace Canvity {
    export abstract class CanvityObject {
        private id: String;
        public get InstanceID(): String { return this.id; }

        protected name: String;
        public get Name(): String { return this.name; }

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