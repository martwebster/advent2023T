import { readFileSync } from "fs"

declare global {
    interface Array<T> {
        last(): T | undefined;
        first(): T | undefined;
        sum(): number;
    }
}

export const apply = () => {
    Array.prototype.last = function () {
        if (!this.length) {
            return undefined;
        }
        return this[this.length - 1];
    };
    Array.prototype.first = function () {
        if (!this.length) {
            return undefined;
        }
        return this[0];
    };
    Array.prototype.sum = function () {
        return this.reduce((sum, current) => sum + current, 0);
    };
}
apply();

