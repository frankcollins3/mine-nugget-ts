import Random from 'utility/Randomizer'
import { PrismaClient } from '@prisma/client';

async function getAllStrain(req:any, res:any) {        
        let prisma = new PrismaClient()
        let { body } = req.body || {fakeKey: 'fakeValue'}
        let allstrains = await prisma.strains.findMany()       
        let randomStrainToTest = Random(allstrains)                
         res.json( { getdata: allstrains })        
}

export default getAllStrain
