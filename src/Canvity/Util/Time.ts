namespace Canvity.Util {
    export class Time {
        private deltaTime: number;
        private time: number;

        public constructor() {

        }

        public GetDeltaTime(): number {
            return this.deltaTime;
        }
        public GetTime(): number {
            return this.time;
        }
    }
}