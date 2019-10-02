interface IPrimitiveMap {
    string: string;
    number: number;
    boolean: boolean;
}

type PrimitiveOrConstructor = (new (...args: Array<any>) => any) | keyof IPrimitiveMap;
type GuardedType<T extends PrimitiveOrConstructor> = T extends new (...args: Array<any>) => infer U
    ? U
    : T extends keyof IPrimitiveMap
        ? IPrimitiveMap[T]
        : never;

export function TypeGuard<T extends PrimitiveOrConstructor>(o: any, className: T): o is GuardedType<T> {
    let localPrimitiveOrConstructor: PrimitiveOrConstructor = className;
    if (typeof localPrimitiveOrConstructor === "string") {
        return typeof o === localPrimitiveOrConstructor;
    }
    return o instanceof localPrimitiveOrConstructor;
}
