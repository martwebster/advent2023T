import { readFileSync } from "fs"

export const readTestData = (fileName: string): string[] => {
    const file = readFileSync(fileName).toString();
    return file.split("\r\n")
}        
