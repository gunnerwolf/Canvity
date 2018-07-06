namespace Canvity.Util {
    /**
     * Represents an unordered collection of unique items of type T
     */
    export class HashSet<T> extends Array<T> {
        public constructor(...items: Array<T>) {
            super(...items);
        }

        /**
         * Attempts to add an item to the collection if it does not already exist
         * @param item The item to add
         * @return boolean False if the item already exists in the collection
         */
        public Add(item: T): boolean {
            if (this.Contains(item)) return false;
            super.push(item);
            return true;
        }
        /**
         * Attempts to remove an item from the collection
         * @param item The item to remove
         * @return boolean False if the item does not exist in the collection
         */
        public Remove(item: T): boolean {
            if (!this.Contains(item)) return false;
            let index: number = super.indexOf(item);
            super.splice(index, 1);
            return true;
        }

        /**
         * Searches for a given item in the collection
         * @param item The item to search for
         * @return boolean Whether the item exists in the collection
         */
        public Contains(item: T): boolean {
            return super.indexOf(item) >= 0;
        }

        /**
         * Returns the elements of a HashSet that meet the condition specified in a callback function
         * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function once for each element in the HashSet
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value
         * @return A HashSet containing the results of the filter function
         */
        public filter(callbackfn: (value: T, index: number, array: T[]) => any, thisArg?: any): HashSet<T> {
            return HashSet.FromArray(super.filter(callbackfn, thisArg));
        }

        /**
         * Returns the contents of the HashSet in an ordered Array
         * @return The contents of the HashSet in an ordered Array
         */
        public ToArray(): Array<T> {
            return <Array<T>>this;
        }

        /**
         * Creates a HashSet from an array of unique items
         * @param array An array to convert to a HashSet
         * @return The contents of the Array in a HashSet
         */
        public static FromArray<T>(array: Array<T>): HashSet<T> {
            let set = new HashSet<T>(...array);
            return set;
        }
    }
}