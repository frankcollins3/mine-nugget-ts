import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function userStrainsForUsersId (req, res:any) {
        let data = req.body.data
        let usersIdFromReq = data.usersId      
        let allUsersStrains = await prisma.usersOnStrains.findMany()        
        let filteredUserStrains = await allUsersStrains.filter( strain => strain.usersId === usersIdFromReq )
        res.json( {body: req.body, hi: 'hey', myStrains: filteredUserStrains })
}
