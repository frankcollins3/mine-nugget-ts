import { PrismaClient } from '@prisma/client';

export default async function GetAllUsers (req:any, res:any) {
    let prisma = new PrismaClient()
    let allusers = await prisma.users.findMany()
    console.log('allusers')
    console.log(allusers)
    res.json( {users: allusers})
}