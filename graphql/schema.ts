import {gql} from 'apollo-server-micro';

// the link object will have the following fields in:                    type Link { ... fields }

// id | strain | strainId | dominant | funfact | parents | taste | smell | gold | nugget | thc | cbd

//  id |   username   | password | age |         email      

export const typeDefs = gql`

    type Miners {
        username: String!
        password: String!
        age: Int!
        email: String!
    }

    type MinersLogin {
        id: Int!
        username: String!
        password: String!
        age: Int!
        email: String!
        token: String!
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

    type Query {
        allStrainsGET: [Strains]!
        allMinersGET: [Miners]!

        userLogin(
        email: String!
        password: String!
        ): MinersLogin

        getUserWithId(id: Int!): Miners
    }

    type Mutation {

        addMinersOnStrains(
            username: String! 
            strain: String!
        ): MinersOnStrains

        userSignup(
            username: String!
            password: String!
            age: Int!
            email: String!
        ): Miners
    }
    `

    // addMinersOnStrains(
    //     minersId: Int! 
    //     strainsid: Int!
    // ): MinersOnStrains
    
// query 
        // allMinersOnStrainsGET
        // myMinersOnStrainsGET

// query 
