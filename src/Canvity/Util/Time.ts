namespace Canvity.Util {
    export class Time {
        private deltaTime: number;
        public get DeltaTime(): number { return this.deltaTime * this.TimeScale; }
        public get ActualDeltaTime(): number { return this.deltaTime; }

        private time: number;
        public get Time(): number { return this.time; }
        private actualTime: number;
        public get ActualTime(): number { return this.actualTime; }

        private timeScale: number;
        public get TimeScale(): number{ return this.timeScale; }

        public constructor(time: number, realTime: number, deltaTime: number, timeScale: number) {
            this.time = time;
            this.actualTime = realTime;
            this.deltaTime = deltaTime;
            this.timeScale = timeScale;
        }
    }
}