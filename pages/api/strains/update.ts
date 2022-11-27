import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export default async function update (req:any, res:any) {              // res:string doesn't work
    console.log('we are hitting the update route')
    console.log('req')
    console.log(req)

    
    // console.log(strains)
    res.json(  {ayoo: 'hi'}  )
}