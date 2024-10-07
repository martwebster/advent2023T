

export class Game {


    public maxRed = 0;
    public maxGreen = 0;
    public maxBlue = 0;
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    public isValid(red: number, green: number, blue: number): any {
        return red >= this.maxRed && green >= this.maxGreen && blue >= this.maxBlue;
    }

    public power(): number {
        return this.maxRed * this.maxGreen * this.maxBlue;
    }

    public static parse(line: String): Game {
        const id = line.substring(5, line.indexOf(":"))
        const game = new Game(Number(id));

        const rounds = line.substring(line.indexOf(": ") + 1).trim();
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
        .map(line => Game.parse(line))
        .filter(game => game.isValid(12, 13, 14))
        .map(game => game.id)
        .sum();
}


export const powerGame = (lines: String[]): number => {
    return lines
        .map(line => Game.parse(line).power())
        .sum();
}
