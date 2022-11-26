import Random from '../../utility/Randomizer'
import { PrismaClient } from '@prisma/client';

async function getSpecifiedStrain(req:any, res:any|null) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
         if (typeof req === 'object') {
            console.log("allow the object to be for when the request is the object of the strain being sent import/invocation style")

         } else if (typeof req === 'string') {
            console.log("this should be the ajax string data of doing things")
             res.json( { getdata: {hi: 'heyy'} })        
         }

           

}

export default getSpecifiedStrain


//    const strain = await prisma.strains.findUnique({
        //     where: {
        //       strain: req.body,
        //     },
        //   })
