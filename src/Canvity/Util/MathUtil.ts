export class MathUtil {
    public static Clamp(val: number, min: number, max: number): number {
        if (val >= min && val <= max) return val;
        if (val < min) return this.Clamp(max - Math.abs(val), min, max);
        if (val > max) return this.Clamp(min + Math.abs(val), min, max);

        return 0;
    }
}