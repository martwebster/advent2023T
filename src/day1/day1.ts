
export const getLineNumber = (line: string): number => {

    const numbers = [...line].filter((dig) => Number(dig))
    const val = numbers.first() + numbers.last()!.toString()
    return Number(val);
}

export function sumLineNumbers(lines: string[]): number {
    return lines
        .map(getLineNumber)
        .sum();
} 
