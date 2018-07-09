namespace Canvity.Messages {
    export class Message {
        public Time: Util.Time;
        public Message: string;
        public Target: string;
        public Data: Array<any>;

        public constructor(time: Util.Time, message: string, target: string, ...data: Array<any>) {
            this.Time = time;
            this.Message = message;
            this.Target = target;
            this.Data = data;
        }
    }
}