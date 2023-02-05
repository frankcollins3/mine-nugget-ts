import Axios from 'axios'

export default async function POSTuserstrainsES6(endpoint, data) {
    console.log('endpoint')
    console.log(endpoint)
    class POSTuserstrains {
        constructor(endpoint) {
            this.endpoint = endpoint
        }
        get POST() {
            return this.userstrains()
        }
        async userstrains() {
            Axios.post(endpoint, {
                usersId: data.usersId,
                strainsId: data.strainsId,

            })                
        }
    }
    if (endpoint) {
        const newuserstrain = new POSTuserstrains(endpoint).POST
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