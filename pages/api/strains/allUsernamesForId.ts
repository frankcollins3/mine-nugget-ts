import { PrismaClient } from '@prisma/client';

export default async function AllUsernamesForStrain (req, res) {
    let Prisma = new PrismaClient()
    let body = req.body
    console.log('body from allusernamesForId')    
    let id = body.data.data.data.id

    let AllUsers = await Prisma.users.findMany()
    let AllStrains = await Prisma.strains.findMany()
    let AllUsersStrains = await Prisma.usersOnStrains.findMany()
    let usernamebucket = new Array()

    AllUsersStrains.forEach( (userstrain) => {
        if (userstrain.strainsId === id) {            
            let usersId = userstrain.usersId
            AllUsers.forEach( (user) => {
                if (usersId === user.id) {                    
                    let name = user.username
                    // let name:string|object = user.username
                    usernamebucket.push(user.username)                    
                }
            })
        }
    })

    let names = []
    let UserStrainsFromId = await AllUsersStrains.filter( userstrain => userstrain.strainsId = id)
   await res.json( {usernames: usernamebucket.length ? usernamebucket : ['','',''],  userStrains: AllUsersStrains})
}