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

export interface GameAbilityRelation {
    id?: number;
    bothNames: string;
    gameNo: number;
    abilityNo: number;
}

export class DB extends Dexie {
    abilities!: Table<KirbyAbility>;
    games!: Table<KirbyGame>;
    gameAbilities!: Table<GameAbilityRelation>;
    constructor() {
        super('myDatabase');
        this.version(1).stores({
            abilities: '++id, name, imgPath',
            games: '++id, name, year, imgPath, description',
            gameAbilities: '++id, gameNo, abilityNo'
        });
        this.version(2).stores({
            abilities: '++id, name, imgPath, description',
            games: '++id, name, year, imgPath, description',
            gameAbilities: '++id, gameNo, abilityNo'
        });
        this.version(3).stores({
            gameAbilities: '++id, bothNames, gameNo, abilityNo'
        });
    }
}

export const db = new DB();