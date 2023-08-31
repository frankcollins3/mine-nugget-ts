// * * * * * PSQL DATA TYPE INTERFACES BELOW! !!
// somehow deployment isn't recognizing this as updated commit 

// id | userId | strainid | into_it
export interface digsINTERFACE {
    userId: number,
    strainid: number,
    into_it: boolean
}

// id | strainid | review | title
export interface  minesINTERFACE {
    userId: number | undefined,
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
    id: number | undefined,
    username: string,
    password: string,
    age: number,
    email: string,
    strains: minersOnStrainsINTERFACE[] | undefined,

    // might delete.
    wins: number | undefined,
    icon: string | undefined
}

// id |  username  | password | age | email | wins | icon 

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

type OmitStrainsInterface = Omit<strainsINTERFACE, keyof strainsINTERFACE>;
export interface Strain<T> extends OmitStrainsInterface { 
    [key: string | number]: T;
}

// * * * * * DATA TYPE INTERFACES ABOVE FOR PSQL !!


// COMPONENT INTERFACES BELOW !
export interface SeeAndSaveStrainProps { 
    strain: string
    key: string 
}

export interface LoginInterface { inputType: string }
export interface SignupInterface { inputType: string }


// findmine
export interface noFeedSelectedStrainINTERFACE { id: number, strain: string };
export interface feedSelectedStrainINTERFACE { id: number, strain: string, like:boolean };        // sorry for no DRY code lol

export interface noFeedNoStrainMsgsINTERFACE { err: boolean, msg: string };

export interface showFeedINTERFACE { 
    allUsers: minersINTERFACE[], allStrainsForAllUsers:  minersOnStrainsINTERFACE[]
    allReviewsFromAllUsers: minesINTERFACE[], allLikesFromAllUsers: digsINTERFACE[],
    // allMinersOnStrains: minersOnStrainsINTERFACE[], 
}

// graphQL resolver interfaces
export interface usernameStrainidINTERFACE { username: string, strainid: number }

export interface userLoginINTERFACE { email: string, password: string }

export interface updateUserIconINTERFACE { username: string, icon: string }
// const { email, password } = args
