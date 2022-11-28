import APIcall from 'utility/APIcall'
import Random from '../../../utility/Randomizer'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()
let strainbucket = new Array() || []

async function getSpecifiedStrain(req:any, res:any|null,) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
        strainbucket.splice(0, strainbucket.length) 


        let prisma = new PrismaClient()
        // console.log('req SERVER SIDE')
       const query = req.query
       let strain:string = query.strain
       let alldbstrains = await prisma.strains.findMany()
        
        await alldbstrains.forEach(async(item) => {
//        let specifiedstrain = await alldbstrains.forEach( (item) => {
//        alldbstrains.forEach( (item:object|string) => {                
                if (item.strain === strain) {
                        let strain:string = item.strain

                        console.log(`i just clicked on the ${strain}`)
                        console.log('item in the if block')
                        console.log(item)
                        // return item

                        let onestrain = await APIcall('specify', strain, null)
                        console.log('onestrain')
                        console.log(onestrain)

                        await strainbucket.push(item)
                }
                
                //        prisma.strains.findUnique({
                        //         where: {
})
        await res.json( strainbucket )
//                 strain: 'white widow'
//         }
//        })

        // return  { getdata: 'return statement instead of res.json'}
        //     return statement

}

export default getSpecifiedStrain


//    const strain = await prisma.strains.findUnique({
        //     where: {
        //       strain: req.body,
        //     },
        //   })
