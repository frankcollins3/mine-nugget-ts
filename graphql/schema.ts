import {gql} from 'apollo-server-micro';

// the link object will have the following fields in:                    type Link { ... fields }

// id | strain | strainId | dominant | funfact | parents | taste | smell | gold | nugget | thc | cbd

export const typeDefs = gql`

    type Strains {
        id Int
        strain String!
        strainId
        dominant String!
        funfact String!
        parents String!
        taste String!
        smell String!
        gold String!
        nugget String!
        thc String!
        cbd String!
    }

    type Query {
        allStrainsGET: [Strains]!
    }

    `
    // 
    
    /*      MinersOnStrains includes strains.id and users.id
    type Mutation {
        addMinersOnStrains(
        
        ): MinersOnStrains
    }
    */

// getDailyData(users_id: Int!): Data               // (users_id: Int!) these are the args don't forget. Don't load them with all endpoints if they only need ID
        
    // * * * * *  allDBsettings: [Settings] * * * * *  new GraphQLList(Settings)
    //     type Query { }     // reads This is saying return the resolver "links" with array of [Link]
