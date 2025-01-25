import Dexie, { Table } from 'dexie';

export interface KirbyGame {
    id?: number;
    name: string;
    year: number;
    imgPath: string;
    description: string;
}

export interface KirbyAbility {
    id?: number;
    name: string;
    imgPath: string; //directory link
    description: string;
}

export class DB extends Dexie {
    abilities!: Table<KirbyAbility>;
    games!: Table<KirbyGame>;
    constructor() {
        super('myDatabase');
        this.version(1).stores({
            abilities: '++id, name, imgPath',
            games: '++id, name, year, imgPath, description'
        });
        this.version(2).stores({
            abilities: '++id, name, imgPath, description'
        });
    }
}

export const db = new DB();