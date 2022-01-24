import { IGame } from "../interfaces/i-game";

export class Game implements IGame {
    categories: string[];
    name: string;
    image: string;
    id: string;
    jackspot?: number;

    constructor(
        categories: string[],
        name: string,
        image: string,
        id: string,
        jackspot?: number
    ) {
        this.categories = categories;
        this.name = name;
        this.image = image;
        this.id = id;
        this.jackspot = jackspot;
    }

    hasCategory(category: string): boolean {
        return this.categories.includes(category);
    }
}
