namespace Canvity {
    export abstract class CanvityObject {
        private id: String;
        protected name: String;

        protected constructor() {
            this.id = ObjectManager.GenerateID();
        }

        public GetName() {
            return this.name;
        }
        public ToString() {
            return this.GetName();
        }
        public GetInstanceID() {
            return this.id;
        }

        public Equals(obj: CanvityObject) {
            return this.id === obj.id;
        }
    }
}