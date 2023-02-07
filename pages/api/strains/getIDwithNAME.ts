import { PrismaClient } from '@prisma/client';

export default async function getIDwithNAME(req, res) {
    let Prisma = new PrismaClient()
    let body:(object|any) = req.body 
    let name = body.name 
    let strains:any = await Prisma.strains.findMany()
    let idfilterstrain = await strains.filter(strain => strain.strain === name  )        
    let strain = idfilterstrain[0]
    let strainId = strain.id
        
    res.json( { strain: req.body, id: strainId})
}
