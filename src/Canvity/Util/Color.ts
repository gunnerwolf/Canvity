namespace Canvity.Util {
    export class Color {
        private r: number;
        private g: number;
        private b: number;
        private a: number;

        public get R(): number { return this.r; }
        public get Red(): number { return this.r; }
        public set R(val: number) { this.r = val % 256; }
        public set Red(val: number) { this.r = val % 256; }

        public get G(): number { return this.g; }
        public get Green(): number { return this.g; }
        public set G(val: number) { this.g = val % 256; }
        public set Green(val: number) { this.g = val % 256; }

        public get B(): number { return this.b; }
        public get Blue(): number { return this.b; }
        public set B(val: number) { this.b = val % 256; }
        public set Blue(val: number) { this.b = val % 256; }

        public get A(): number { return this.a; }
        public get Alpha(): number { return this.a; }
        public set A(val: number) { this.a = val % 256; }
        public set Alpha(val: number) { this.a = val % 256; }

        public get HexString(): string {
            let ret = '#';
            ret += this.r.toString(16);
            ret += this.g.toString(16);
            ret += this.b.toString(16);
            ret += this.a.toString(16);
            return ret;
        }
        public get CssString(): string {
            let ret = 'rgba(';
            ret += this.r + ', ';
            ret += this.g + ', ';
            ret += this.b + ', ';
            ret += this.a + ')';
            return ret;            
        }

        public constructor(r: number, g: number, b: number, a: number = 255) {
            this.R = r;
            this.G = g;
            this.B = b;
            this.A = a;
        }

        public static Red: Color = new Color(255, 0, 0);
        public static Green: Color = new Color(0, 255, 0);
        public static Blue: Color = new Color(0, 0, 255);
        public static Yellow: Color = new Color(255, 255, 0);
        public static Magenta: Color = new Color(255, 0, 255);
        public static Cyan: Color = new Color(0, 255, 255);
        public static White: Color = new Color(255, 255, 255);
        public static Black: Color = new Color(0, 0, 0);
        public static Transparent: Color = new Color(0, 0, 0, 0);

        public static FromHex(hex: string): Color {
            if (hex.substr(0, 1) == '#') hex = hex.substr(1);
            let r: number = 0, g: number = 0, b: number = 0, a: number = 0;
            switch(hex.length) {
                case 1:
                    r = parseInt(hex + hex);
                    g = parseInt(hex + hex);
                    b = parseInt(hex + hex);
                    a = 255;
                    break;
                case 2:
                    r = parseInt(hex);
                    g = parseInt(hex);
                    b = parseInt(hex);
                    a = 255;
                    break;
                case 3:
                    r = parseInt(hex[0]);
                    g = parseInt(hex[1]);
                    b = parseInt(hex[2]);
                    a = 255;
                    break;
                case 4:
                    r = parseInt(hex[0]);
                    g = parseInt(hex[1]);
                    b = parseInt(hex[2]);
                    a = parseInt(hex[3]);
                    break;
                case 6:
                    r = parseInt(hex[0] + hex[1]);
                    g = parseInt(hex[2] + hex[3]);
                    b = parseInt(hex[4] + hex[5]);
                    a = 255;
                    break;
                case 8:
                    r = parseInt(hex[0] + hex[1]);
                    g = parseInt(hex[2] + hex[3]);
                    b = parseInt(hex[4] + hex[5]);
                    a = parseInt(hex[6] + hex[7]);
                    break;
                default:
                    return new Color(0, 0, 0, 0);
            }

            return new Color(r, g, b, a);
        }
    }
}