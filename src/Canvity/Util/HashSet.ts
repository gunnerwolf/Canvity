/**
 * Represents an unordered collection of unique items of type T
 */
export class HashSet<T> {
    private container: Array<T>;

    public constructor(...items: Array<T>) {
        this.container = items;
    }

    /**
     * Attempts to add an item to the collection if it does not already exist
     * @param item The item to add
     * @return boolean False if the item already exists in the collection
     */
    public Add(item: T): boolean {
        if (this.Contains(item)) return false;
        this.container.push(item);
        return true;
    }
    /**
     * Attempts to remove an item from the collection
     * @param item The item to remove
     * @return boolean False if the item does not exist in the collection
     */
    public Remove(item: T): boolean {
        if (!this.Contains(item)) return false;
        let index: number = this.container.indexOf(item);
        this.container.splice(index, 1);
        return true;
    }

    /**
     * @return number The number of items in the collection
     */
    public get Count(): number {
        return this.container.length;
    }

    /**
     * Searches for a given item in the collection
     * @param item The item to search for
     * @return boolean Whether the item exists in the collection
     */
    public Contains(item: T): boolean {
        return this.container.indexOf(item) >= 0;
    }

    public forEach(f: (value: T, index: number, array: Array<T>) => void, thisArg?: any): void {
        this.container.forEach(f, thisArg);
    }
    public filter(f: (value: T, index: number, array: Array<T>) => any, thisArg?: any): HashSet<T> {
        return HashSet.FromArray(this.container.filter(f, thisArg));
    }
    public map<U>(f: (value: T, index: number, array: Array<T>) => U, thisArg?: any): HashSet<U> {
        return HashSet.FromArray(this.container.map(f, thisArg));
    }

    /**
     * Returns the contents of the HashSet in an ordered Array
     * @return The contents of the HashSet in an ordered Array
     */
    public ToArray(): Array<T> {
        return this.container;
    }

    /**
     * Creates a HashSet from an array of unique items
     * @param array An array to convert to a HashSet
     * @return The contents of the Array in a HashSet
     */
    public static FromArray<T>(array: Array<T>): HashSet<T> {
        let set = new HashSet<T>();
        set.container = array;
        return set;
    }
}
