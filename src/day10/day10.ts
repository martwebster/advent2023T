export interface Pos {
    x: number;
    y: number;
    movement: String
}

export interface Crucible {
    xPos: number;
    yPos: number;
    heat: number;
    streak: number;
    pos: Pos[];
    lastMovement: String;
}

const defaultNumber = Number.MAX_VALUE

export interface HeatCell {
    heatLoss: number,
    minLeft?: number[],
    minRight?: number[],
    minUp?: number[],
    minDown?: number[],
}

export const createCell = (heatLoss: number): HeatCell => {
    return {
        heatLoss,
    }
}
export const createGrid = (rawNums: number[][]): HeatCell[][] => {
    return rawNums.map(line => line.map(it => createCell(it)))
}

export const isActive = (grid: HeatCell[][], crucible: Crucible): boolean => {

    if (crucible.xPos == grid[0].length - 1 && crucible.yPos == grid.length - 1) {
        return false;
    }
    return true;

}

const moveInDirection = (crucible: Crucible, grid: HeatCell[][], newPos: Pos): Crucible | undefined => {
    if (!(crucible.streak === 3 && crucible.lastMovement === newPos.movement)) {
        return {
            xPos: newPos.x,
            yPos: newPos.y,
            heat: crucible.heat + grid[newPos.y][newPos.x].heatLoss,
            streak: crucible.lastMovement === newPos.movement ? crucible.streak + 1 : 1,
            pos: [...crucible.pos, newPos],
            lastMovement: newPos.movement,
        }
    }
    return undefined;
}

export const move = (grid: HeatCell[][], crucible: Crucible): Crucible[] => {
    const movements: Crucible[] = [];

    //right
    if (crucible.xPos < grid[0].length - 1) {
        if (crucible.lastMovement != "L") {
            const newPos: Pos = {
                x: crucible.xPos + 1,
                y: crucible.yPos,
                movement: "R"
            }
            const movement = moveInDirection(crucible, grid, newPos);
            if (movement) {
                movements.push(movement)
            }
        }
    }

    //down
    if (crucible.yPos < grid.length - 1) {
        if (crucible.lastMovement != "U") {
            const newPos: Pos = {
                x: crucible.xPos,
                y: crucible.yPos + 1,
                movement: "D"
            }
            const movement = moveInDirection(crucible, grid, newPos);
            if (movement) {
                movements.push(movement)
            }
        }
    }

    // move left
    if (crucible.xPos > 0) {
        if (crucible.lastMovement != "R") {
            const newPos: Pos = {
                x: crucible.xPos - 1,
                y: crucible.yPos,
                movement: "L"
            }

            const movement = moveInDirection(crucible, grid, newPos);
            if (movement) {
                movements.push(movement)
            }
        }
    }
    if (crucible.yPos > 0) {
        // move up
        if (crucible.lastMovement != "D") {
            const newPos: Pos = {
                x: crucible.xPos,
                y: crucible.yPos - 1,
                movement: "U"
            }

            const movement = moveInDirection(crucible, grid, newPos);
            if (movement) {
                movements.push(movement)
            }
        }
    }
    return movements;
}

export const getMin = (grid: HeatCell[][]): number => {
    const finalCell = grid[grid.length - 1][grid[0].length - 1]
    var finalValue = Number.MAX_VALUE;
    if (finalCell.minDown) {
        finalValue = [...finalCell.minDown, finalValue].min();
    }
    if (finalCell.minUp) {
        finalValue = [...finalCell.minUp, finalValue].min();
    }
    if (finalCell.minLeft) {
        finalValue = [...finalCell.minLeft, finalValue].min();
    }
    if (finalCell.minRight) {
        finalValue = [...finalCell.minRight, finalValue].min();
    }
    return finalValue;
}

export const getMinStreak = (streak: number, mins: number[]): number => {
    if (streak === 3) {
        return [...mins].min();
    }
    if (streak === 2) {
        return [mins[0], mins[1]].min();
    }
    return mins[0]
}

export const goFotIt = (grid: HeatCell[][]): number => {

    var crucibles: Crucible[] = [{
        xPos: 0,
        yPos: 0,
        heat: 0,
        streak: 0,
        pos: [],
        lastMovement: "",
    }];

    while (crucibles.length > 0) {
        const movedCrucibles: Crucible[] = []
        for (const current of crucibles) {
            move(grid, current).forEach(cruc => {
                const cell = grid[cruc.yPos][cruc.xPos];

                if (cruc.lastMovement == "L") {
                    if (cell.minLeft == undefined) {
                        cell.minLeft = [defaultNumber, defaultNumber, defaultNumber]
                    }

                    if (getMinStreak(cruc.streak, cell.minLeft!) > cruc.heat) {
                        cell.minLeft[cruc.streak - 1] = cruc.heat;
                        movedCrucibles.push(cruc)
                    }
                } else if (cruc.lastMovement == "R") {
                    if (cell.minRight == undefined) {
                        cell.minRight = [defaultNumber, defaultNumber, defaultNumber]
                    }
                    if (getMinStreak(cruc.streak, cell.minRight!) > cruc.heat) {
                        cell.minRight[cruc.streak - 1] = cruc.heat;
                        movedCrucibles.push(cruc)
                    }
                } else if (cruc.lastMovement == "U") {
                    if (cell.minUp == undefined) {
                        cell.minUp = [defaultNumber, defaultNumber, defaultNumber]
                    }
                    if (getMinStreak(cruc.streak, cell.minUp!) > cruc.heat) {
                        cell.minUp[cruc.streak - 1] = cruc.heat;
                        movedCrucibles.push(cruc)
                    }
                } else if (cruc.lastMovement == "D") {
                    if (cell.minDown == undefined) {
                        cell.minDown = [defaultNumber, defaultNumber, defaultNumber]

                    }
                    if (getMinStreak(cruc.streak, cell.minDown!) > cruc.heat) {
                        cell.minDown[cruc.streak - 1] = cruc.heat;
                        movedCrucibles.push(cruc)
                    }
                } else {
                    movedCrucibles.push(cruc)
                }
            })
        }
        crucibles = movedCrucibles;

        crucibles = crucibles.filter(it => isActive(grid, it))

        // drop the last 1/2
        if (crucibles.length > 5_000) {
            const endX = grid[0].length;
            const endy = grid.length;

            const leader = crucibles.minOf(it => it.heat + (endX - it.xPos) + (endy + it.yPos))
            const loser = crucibles.maxOf(it => it.heat + (endX - it.xPos) + (endy + it.yPos));

            const tailGate = leader + (((loser - leader) / 2) * 1)
            crucibles = crucibles.filter(it => (it.heat + (endX - it.xPos) + (endy + it.yPos)) < tailGate);
        }

        const minHeat = getMin(grid);
        crucibles = crucibles.filter(it => it.heat <= minHeat)

        console.log(crucibles.length)
    }

    const finalCell = grid[grid.length - 1][grid[0].length - 1]
    var finalValue = Number.MAX_VALUE;
    if (finalCell.minDown) {
        finalValue = [...finalCell.minDown, finalValue].min();
    }
    if (finalCell.minUp) {
        finalValue = [...finalCell.minUp, finalValue].min();
    }
    if (finalCell.minLeft) {
        finalValue = [...finalCell.minLeft, finalValue].min();
    }
    if (finalCell.minRight) {
        finalValue = [...finalCell.minRight, finalValue].min();
    }
    return finalValue;
}