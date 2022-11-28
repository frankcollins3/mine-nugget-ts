import APIcall from 'utility/APIcall'
import Random from '../../../utility/Randomizer'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()
// let strainbucket = new Array() || []
let strainbucket:(string|number|object)[] = []

async function getSpecifiedStrain(req:any, res:any|null,) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
strainbucket.splice(0, strainbucket.length) 


let prisma = new PrismaClient()
// console.log('req SERVER SIDE')
const query = req.query
let strain:string = query.strain
let alldbstrains = await prisma.strains.findMany()


await alldbstrains.forEach(async(item) => {
        if (item.strain === strain) {
                let strain:string = item.strain                        
                // let onestrain = await APIcall('specify', strain, null)                        
                        strainbucket.push(item)
        }
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
