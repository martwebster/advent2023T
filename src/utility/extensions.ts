import { readFileSync } from "fs"

declare global {
    interface Array<T> {
        last(): T | undefined;
        first(): T | undefined;
        sum(): number;
        sumOf(attribute: (item: T) => number): number;
        min(): number;
        minOf(attribute: (item: T) => number): number;
        max(): number;
        maxOf(attribute: (item: T) => number): number;
        includesObject(obj: any): boolean;
    }

    interface String {
        substringAfter(val: string): string
        substringBefore(val: string): string;
        substringBetween(val1: string, val2: string): string;
        substringAfterLast(val: string): string;
        substringBeforeLast(val: string): string;
        substringBetweenLast(val1: string, val2: string): string;
        isDigit(): boolean;
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
    Array.prototype.sumOf = function (attribute: (item: any) => number) {
        return this.map(attribute).sum();
    };

    Array.prototype.min = function () {
        return Math.min(...this);
    };
    Array.prototype.minOf = function (attribute: (item: any) => number) {
        return this.map(attribute).min();
    };
    Array.prototype.max = function () {
        return Math.max(...this);
    };
    Array.prototype.maxOf = function (attribute: (item: any) => number) {
        return this.map(attribute).max();
    };

    Array.prototype.maxOf = function (attribute: (item: any) => number) {
        return this.map(attribute).max();
    };
    Array.prototype.includesObject = function (obj: any) {
        return this.map(item => JSON.stringify(item)).includes(JSON.stringify(obj))
    };


    String.prototype.substringAfter = function (val: string) {
        return this.substring(this.indexOf(val) + val.length)
    };
    String.prototype.substringBefore = function (val: string) {
        return this.substring(0, this.indexOf(val))
    };
    String.prototype.substringBetween = function (val1: string, val2: string) {
        return this.substringBefore(val2).substringAfter(val1)
    };
    String.prototype.substringAfterLast = function (val: string) {
        return this.substring(this.lastIndexOf(val) + val.length)
    };
    String.prototype.substringBeforeLast = function (val: string) {
        return this.substring(0, this.lastIndexOf(val))
    };
    String.prototype.substringBetweenLast = function (val1: string, val2: string) {
        return this.substringBeforeLast(val2).substringAfterLast(val1)
    };
    String.prototype.isDigit = function () {
        return "0123456789".includes(this.charAt(0))
    }
}