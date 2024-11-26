
type Direction = "U" | "D" | "L" | "R"

interface Movement {
    direction: Direction,
    length: number
}

interface XY {
    x: number;
    y: number
}

//R 6 (#70c710)
export const parseMovement = (line: String): Movement => {
    return {
        direction: line.charAt(0) as Direction,
        length: Number(line.split(" ")[1])
    }
}

const move = (movement: Movement, pos: XY): XY => {
    switch (movement.direction) {
        case "D":
            return {
                x: pos.x,
                y: pos.y - movement.length
            }
        case "U":
            return {
                x: pos.x,
                y: pos.y + movement.length
            }
        case "L":
            return {
                x: pos.x - movement.length,
                y: pos.y
            }
        case "R":
            return {
                x: pos.x + movement.length,
                y: pos.y
            }
    }
}

export const convertCoodsToString = (coods: XY[]): string => {
    return coods.map(item => `(${item.x}, ${item.y})`).join(",")
}

export const getCoodinates = (movements: Movement[]): XY[] => {
    var coodinantes: XY[] = [{ x: 0, y: 0 }];

    for (const movement of movements) {
        coodinantes.push(move(movement, coodinantes.last()!))
    }

    var minX = coodinantes.minOf(item => item.x)
    if (minX < 0) {
        coodinantes = coodinantes.map(item => {
            return {
                x: item.x + Math.abs(minX),
                y: item.y
            }
        })
    }

    var minY = coodinantes.minOf(item => item.y)
    if (minY < 0) {
        coodinantes = coodinantes.map(item => {
            return {
                x: item.x,
                y: item.y + Math.abs(minY)
            }
        })
    }
    return coodinantes;
}

export const adjust = (coods: XY[], adjustX: number, adjustY: number): XY[] => {
    return coods.map(item => {
        return {
            x: item.x + adjustX,
            y: item.y + adjustY
        }
    })

}

// The formula is: A = 0.5 * |(x1*y2 - x2*y1) + (x2*y3 - x3*y2) + ... + (xn*y1 - x1*yn)|
export const calculateArea = (coods: XY[]): number => {

    var total = 0;
    for (var x = 0; x < coods.length - 1; x++) {
        var pos1 = coods[x];
        var pos2 = coods[x + 1];

        var value = (pos1.x * pos2.y) - (pos2.x * pos1.y)
        total += value;
    }
    // total += coods.length * 
    return Math.abs(total / 2);

}
