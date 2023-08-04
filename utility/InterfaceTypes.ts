// id | userId | strainid | into_it
export interface digsINTERFACE {
    userId: number,
    strainid: number,
    into_it: boolean
}

// id | strainid | review | title
export interface  minesINTERFACE {
    strainid: number,
    review: string,
    title: string
}

// minersId | strainsid
export interface minersOnStrainsINTERFACE {
    minersId: number,
    strainsid: number
}

// id | username | password | age | email
export interface minersINTERFACE {
    username: string,
    password: string,
    age: number,
    email: string,
    strains: minersOnStrainsINTERFACE[] | undefined
}

export interface strainsINTERFACE { 
    strain: string,
    strainid: number,
    dominant: string,
    funfact: string,
    parents: string,
    taste: string,
    smell: string,
    gold: string,
    nugget: string,
    thc: string,
    cbd: string,
    mines: any[] | null | undefined, // mines: minesINTERFACE[] | null | undefined,
    digs: any[] | null | undefined, // digs: digsINTERFACE[] | null | undefined,
    miners: any[] | null | undefined // miners: any[] | null | undefined        
}

export interface Strain<T> extends strainsINTERFACE { 
    mines: T[] | null | undefined,
    digs: T[] | null | undefined,
}

// model strains {
