export class Game {
    maxRed = 0;
    maxGreen = 0;
    maxBlue = 0;
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    isValid(red: number, green: number, blue: number): any {
        return red >= this.maxRed && green >= this.maxGreen && blue >= this.maxBlue;
    }

    power(): number {
        return this.maxRed * this.maxGreen * this.maxBlue;
    }

    static parse(line: String): Game {
        const id = line.substringBetween("Game ", ":");
        const game = new Game(Number(id));

        const rounds = line.substringAfter(": ").trim();
        const counts = rounds.split("; ").flatMap(item => item.split(", "))

        for (const count of counts) {

            const total = Number(count.split(" ")[0]);
            const colour = count.split(" ")[1];
            if (colour === 'red') {
                game.maxRed = Math.max(game.maxRed, total);
            }
            if (colour === 'green') {
                game.maxGreen = Math.max(game.maxGreen, total);
            }
            if (colour === 'blue') {
                game.maxBlue = Math.max(game.maxBlue, total);
            }
        }

        return game;
    }
}

export const countIds = (lines: String[]): number => {
    return lines
        .map(Game.parse)
        .filter(game => game.isValid(12, 13, 14))
        .sumOf(game => game.id);
}


export const powerGame = (lines: String[]): number => {
    return lines
        .map(Game.parse)
        .sumOf(line => line.power());
}
