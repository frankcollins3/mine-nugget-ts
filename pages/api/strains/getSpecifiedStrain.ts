import APIcall from 'utility/APIcall'
import Random from '../../../utility/Randomizer'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

async function getSpecifiedStrain(req:any, res:any|null,) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
        let prisma = new PrismaClient()
        // console.log('req SERVER SIDE')

       const query = req.query
       let strain:string = query.strain
        
       let alldbstrains = await prisma.strains.findMany()
       
       alldbstrains.forEach( (item) => {
//        alldbstrains.forEach( (item:object|string) => {                
                if (item.strain === strain) {
                        let strain:string = item.strain

                        console.log(`i just clicked on the ${strain}`)
                        console.log('strain')
                        console.log(strain)
                }
       })

//        prisma.strains.findUnique({
//         where: {
//                 strain: 'white widow'
//         }
//        })

        res.json( { strain })
        // return  { getdata: 'return statement instead of res.json'}
        //     return statement

}

export default getSpecifiedStrain


//    const strain = await prisma.strains.findUnique({
        //     where: {
        //       strain: req.body,
        //     },
        //   })
