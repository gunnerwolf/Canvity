namespace Canvity {
    export class ObjectManager {
        public static GenerateID(): string {
            return ObjectManager.generateUUID();
        }

        private static generateUUID() {
            let date = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                date += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (date + Math.random() * 16) % 16 | 0;
                date = Math.floor(date / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }
    }
}