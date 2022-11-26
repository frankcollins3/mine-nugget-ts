import Random from '../../utility/Randomizer'
import { PrismaClient } from '@prisma/client';

async function getSpecifiedStrain(req:any, res:any|null) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
        console.log('in the get specified strain function')
        console.log('req')
        console.log(req)

           

         res.json( { getdata: {hi: 'heyy'} })        
}

export default getSpecifiedStrain


//    const strain = await prisma.strains.findUnique({
        //     where: {
        //       strain: req.body,
        //     },
        //   })
