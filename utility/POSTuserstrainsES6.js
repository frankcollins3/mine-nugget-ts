import Axios from 'axios'

export default async function POSTuserstrainsES6(endpoint, map) {
    // * i was going to create a: pages/api (req, res) => func that accepted a a req.body.strainName and returned a strain.strainsId. 
// instead i'm going to allow this function to accept the name instead of the id, and handle the transferral of the strain.name value to strain.id value in userstrainsPost Route Prisma exp.
    
    let usersId = await map.get('usersId')
    let strain = await map.get('strain')

    class POSTuserstrains {
        constructor(endpoint) {
            this.endpoint = endpoint
        }
        get POST() {
            return this.userstrains()
        }
        async userstrains() {
            return  Axios.post(endpoint, {
                usersId: usersId || map.usersId,
                strain: strain || map.strain
              })
              .then(function (response) {
                return response
                // console.log(response);
              })
              .catch(function (error) {
                return 
              });   
   
            // * one liner i tried  */ ->  return Axios.post( endpoint, { usermap: map }).then( (data) => { return data })
        }
    }
    if (endpoint) {
        const newuserstrain = await new POSTuserstrains(endpoint).POST
        console.log('newuserstrain')
        console.log(newuserstrain)
        return newuserstrain
    }
}
// was considering having a third parameter that distinguished the above post route and another get route to get userstrains. separating concerns.

// * schema.prisma Association Data.
// model UsersOnStrains {
//     user       users     @relation(fields: [usersId], references: [id])
//     usersId    Int
//     strains    strains @relation(fields: [strainsId], references: [id])    
//     strainsId  Int
//     @@id([usersId, strainsId])
//   }
