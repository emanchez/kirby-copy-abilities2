// types.ts
export interface Game {
    id?: number;
    name: string;
    year: number;
    imgPath: string;
    description: string;
  }
  
  export interface Ability {
    id?: number;
    name: string;
    imgPath: string;
    description: string;
  }
  
  export interface GameAbility {
    id?: number;
    gameNo: number;
    abilityNo: number;
    bothNames?: string;
  }
  
  export type EntityType = 'game' | 'ability' | 'relationship';