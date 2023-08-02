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
    strains: minersOnStrainsINTERFACE[]
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
    mines: minesINTERFACE[],
    digs: digsINTERFACE[]
    miners: any[]
}

// model strains {
//     id        Int      @id @default(autoincrement())
//     strain    String   @db.VarChar(255)
//     strainid  Int      @unique
//     dominant  String   @db.VarChar(255)
//     funfact   String   @db.VarChar(255)
//     parents   String   @db.VarChar(255)
//     taste     String   @db.VarChar(255)
//     smell     String   @db.VarChar(255)
//     gold      String   @db.VarChar(255)
//     nugget    String   @db.VarChar(255)
//     thc       String   @db.VarChar(255)
//     cbd       String   @db.VarChar(255)
//     mines     mines[]
//     digs      digs []
//     miners    MinersOnStrains[]
//   }
