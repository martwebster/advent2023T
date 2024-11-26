import { getgroups } from "process";

export interface Pos {
    row: number
    col: number
}

export class Item {

    startCol = 0;
    row = 0;
    value = 0;
    endCol = 0;

    constructor(row: number, startCol: number, value: number) {
        this.startCol = startCol;
        this.row = row;
        this.value = value
        this.endCol = this.startCol + ("" + this.value).length - 1;
    }

    getOuterCells(): Pos[] {
        var values: Pos[] = [];
        for (let col = this.startCol - 1; col <= this.startCol + ("" + this.value).length; col++) {
            values.push({ row: this.row - 1, col })
            values.push({ row: this.row + 1, col })
        }
        values.push({ row: this.row, col: this.startCol - 1 })
        values.push({ row: this.row, col: this.endCol + 1 })
        return values;

    }

    outerCellsIncludes(pos: Pos): boolean {
        const outerCells = this.getOuterCells();
        return outerCells.includesObject(pos);
    }

    static parse(lines: String[]): Item[] {

        var items: Item[] = [];

        lines.forEach((line, row) => {
            var currentNumber = "";
            var startCol = 0;
            [...line].forEach((character, col) => {
                if (character.isDigit()) {
                    if (currentNumber == "") {
                        startCol = col;
                    }
                    currentNumber += character;
                } else {
                    if (currentNumber.length > 0) {
                        items.push(new Item(row, startCol, Number(currentNumber)))
                        currentNumber = "";
                    }
                }
            })
            if (currentNumber.length > 0) {
                items.push(new Item(row, startCol, Number(currentNumber)))
            }
        });
        return items;
    }
}

export class Grid {
    lines: String[];
    items: Item[];

    constructor(lines: String[]) {
        this.lines = lines;
        this.items = Item.parse(lines)
    }

    getItemOuterBoundry(item: Item): Pos[] {
        const maxCols = this.lines[0].length - 1;
        const maxRows = this.lines.length - 1;
        return item.getOuterCells()
            .filter(item => item.col > -1 && item.col <= maxCols)
            .filter(item => item.row > -1 && item.row <= maxRows)
    }

    getValueAtPos(pos: Pos): string {
        return this.lines[pos.row][pos.col];
    }

    getPartNumber(): number {
        const parts = this.items
            .filter(item =>
                this.getItemOuterBoundry(item)
                    .some(pos => this.isSymbol(pos)))
        return parts.sumOf(item => item.value);
    }

    // Part 2
    isSymbol(pos: Pos): boolean {
        const val = this.getValueAtPos(pos)
        if (val.isDigit() || val === ".") {
            return false;
        }
        return true;
    }
    getSymbolPositions(symbol: String): Pos[] {
        var result: Pos[] = [];
        this.lines.forEach((line, row) => {
            [...line].forEach((character, col) => {
                if (character === symbol) {
                    result.push({ row, col })
                }
            })
        });
        return result;
    }

    getItemsWithOuterPos(pos: Pos): Item[] {
        return this.items.filter(
            item => item.outerCellsIncludes(pos)
        );
    }

    getGearRatios(): number[] {
        const gearSymbols = this.getSymbolPositions("*");
        const ratios = gearSymbols
            .map(gearPos => this.getItemsWithOuterPos(gearPos))
            .filter(items => items.length === 2)
            .map(items => items[0].value * items[1].value)
        return ratios;
    }

    sumGearRatios() {
        return this.getGearRatios().sum();
    }

}
