
export const getLineNumber = (line: string): number => {

    const numbers = [...line].filter(Number)
    const val = numbers.first() + numbers.last()!.toString()
    return Number(val);
}

export const getFirstNumber = (line: string): number => {
    for (var pos = 0; pos < line.length - 1; pos++) {
        var lineToCheck = line.substring(pos);
        const number = getNumber(lineToCheck);
        if (number !== undefined) {
            return number;
        }
    }
    return 0;
}

export const getLastNumber = (line: string): number => {
    for (var pos = line.length - 1; pos > -1; pos--) {
        var lineToCheck = line.substring(pos);
        const number = getNumber(lineToCheck);
        if (number !== undefined) {
            return number;
        }
    }
    return 0;
}

export const getFirstAndLastNumbers = (line: string): number => {
    return Number(getFirstNumber(line) + getLastNumber(line).toString());
}

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

export const getNumber = (line: string): number | undefined => {
    if (Number(line[0])) {
        return Number(line[0])
    }
    for (const num of numbers) {
        if (line.startsWith(num)) {
            return numbers.indexOf(num);
        }
    }
    return undefined;
}



export function sumLineNumbers(lines: string[]): number {
    return lines
        .map(getLineNumber)
        .sum();
}

export function sumLineNumbersWithWord(lines: string[]): number {
    return lines
        .map(getFirstAndLastNumbers)
        .sum();
}
