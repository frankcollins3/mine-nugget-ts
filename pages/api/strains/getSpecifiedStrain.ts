import APIcall from 'utility/APIcall'
import Random from '../../../utility/Randomizer'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
let prisma = new PrismaClient()
// let strainbucket = new Array() || []
let strainbucket:(string|number|object)[] = []

async function getSpecifiedStrain(req:any, res:any|null,) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
strainbucket.splice(0, strainbucket.length) 
let prisma = new PrismaClient()
const query = req.query
let prestrain:string = query.strain
let strainq:string = query.strain




let alldbstrains = await prisma.strains.findMany()

// strain:(obect|string)
        // let strains = await APIcall('all', null, null)
        // await strains.forEach(async(strain) => {                  
        //         if (strain.string === strainq) {        
        //                 await strainbucket.push(strain)
        //         }
        // })
        let onestrain = await APIcall('specify', strainq, null)                        
                        await alldbstrains.forEach(async(item) => {
                                if (item.strain === strainq) {
                                        let strain:string = item.strain                        
                                // console.log('strain')
                                // console.log(strain)
                                        strainbucket.push(item)
                        }
                })
        console.log('onestrain')
        console.log(onestrain)
        console.log(onestrain[0].strain)
        let returndata = onestrain[0]


await res.json( returndata )
}
export default getSpecifiedStrain
