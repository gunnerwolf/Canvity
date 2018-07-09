namespace Canvity.Messages {
    export class Message {
        public Time: Util.Time;
        public Message: string;
        public Target: string;

        public constructor(time: Util.Time, message: string, target: string) {
            this.Time = time;
            this.Message = message;
            this.Target = target;
        }
    }
}