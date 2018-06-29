namespace Canvity.Util {
    export class Time {
        private deltaTime: number;
        public get DeltaTime(): number { return this.deltaTime; }

        private time: number;
        public get Time(): number { return this.time; }

        public constructor() {

        }
    }
}