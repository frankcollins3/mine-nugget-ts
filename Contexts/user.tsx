import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserTypes {
    username: string,
    // i thought of an idea midway through the app:
    // if you get a 3 win streak on the guessing game (Family Tree) -> {where data.parents is provided and you can guess data.name} data.parents is shown nowhere else in the app
    
    // also woke up to the idea of doing the initial database load by having a pickaxe.img footer on Home.tsx ... 
    // click the pickaxe and populate the db with the data from the api. if [api.data.length === db.data.length] the pickaxe will disappear.

    // i say that (about the pickaxe) to say: the footer might be populated by an alternative image but if you get a 3 win streak in the guessing game...
    // a trophy.png footer will appear that, when clicked upon, redirects to the [/trophyroom.tsx] it will feature photos of the original app and 'highlights' of this app.

    // to check for access to this HiddenHighlightReel, the db will update the username and will prepend `trophyroom${username}` 
    // of course the navbar that says the username will also be checking for this characters and will remove theme so the navbar doesn't say trophyroom 
    
    // WHY? the database will be able to track which users are admitted into the [hall of game] without a new data.column entered into the postgres database user table. 

    password: string,   // im guessing this is where passport would/will be used.
    email: string,
    age: number, 
    strains: string|number[]    // strains UsersOnStrains[]
}

interface UserContext {
    users: UserTypes[],    
    setUsers: React.Dispatch<React.SetStateAction<UserTypes[]>>
}

const UserDefaults: UserTypes = {
    username: '',
    password: '',
    email: '',
    age: 0,
    strains: [],
}

export const UserContext = React.createContext<UserTypes>(UserDefaults)


// model users {
//     id        Int      @id @default(autoincrement())
//     username  String?  @db.VarChar(255)
//     password  String?  @db.VarChar(255)
//     age       Int?
//     email     String?  @db.VarChar(255)
//     strains   UsersOnStrains[]  
//   }

// model strains {
//     id        Int      @id @default(autoincrement())
//     strainId  Int?
//     strain    String?  @db.VarChar(255)
//     dominant  String?  @db.VarChar(255)
//     funfact   String?  @db.VarChar(255)
//     parents   String?  @db.VarChar(255)
//     effects   effects[]
//     mines     mines[]
//     digs      digs []
//     users     UsersOnStrains[]  
//   }