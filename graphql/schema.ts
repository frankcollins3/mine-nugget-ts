import {gql} from 'apollo-server-micro';

// the link object will have the following fields in:                    type Link { ... fields }

// id | strain | strainId | dominant | funfact | parents | taste | smell | gold | nugget | thc | cbd

// id | userId | strainid | review | title  

export const typeDefs = gql`

    type Miners {
        username: String!
        password: String!
        age: Int!
        email: String!
        icon: String
        wins: Int
    }

    type MinersLogin {
        id: Int!
        username: String!
        password: String!
        age: Int!
        email: String!
        token: String!
        icon: String
        wins: Int
    }

    type Strains {
        strain: String!
        strainid: Int!
        dominant: String!
        funfact: String!
        parents: String!
        taste: String!
        smell: String!
        gold: String!
        nugget: String!
        thc: String!
        cbd: String!
    }

    type MinersOnStrains {
        minersId: Int!
        strainsid: Int!
    }

    type MineReviews {
        userId: Int!
        strainid: Int!
        review: String!
        title: String!
    }

    type Digs {
        userId: Int!
        strainid: Int!
        into_it: Boolean!
    }

    type Query {
        allStrainsGET: [Strains]!
        allMinersGET: [Miners]!

        userLogin(
        email: String!
        password: String!
        ): MinersLogin

        getUserWithId(id: Int!): Miners

        getMyMinersOnStrains(username: String!): [MinersOnStrains]!
        allMinersOnStrains: [MinersOnStrains]!

        getAllLikes: [Digs]!
        getAllReviews: [MineReviews]!
        
        getMyLikes(username: String!): [Digs]!
        getMyMines(username: String!): [MineReviews]!
    }

    type Mutation {

        addMinersOnStrains(
            username: String! 
            strain: String!
        ): MinersOnStrains

        removeMinersOnStrains(
            username: String!
            strainid: Int!
        ): MinersOnStrains

        userSignup(
            username: String!
            password: String!
            age: Int!
            email: String!
        ): Miners

        incrementUserWins(
            username: String!
            ): Miners

        addStrainDig(
            username: String!
            strainid: Int!
            into_it: Boolean!
        ): Digs

        removeStrainDig(
            username: String!
            strainid: Int!
            into_it: Boolean!
        ): Digs

        addMineReview(
            username: String!
            strainid: Int!
            review: String!
            title: String!
        ): MineReviews
            
        removeMineReview(
            username: String!
            strainid: Int!            
        ): MineReviews

    }
    `
    
    // getAllLikes(): [Digs]!
    // getAllReviews(): [MineReviews]!

    // addMinersOnStrains(
    //     minersId: Int! 
    //     strainsid: Int!
    // ): MinersOnStrains
    
// query 
        // allMinersOnStrainsGET
        // myMinersOnStrainsGET

// query 
