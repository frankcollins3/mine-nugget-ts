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

console.log('req')
console.log(req)

let prisma = new PrismaClient()
// console.log('req SERVER SIDE')
const query = req.query
console.log('query')
console.log(query)

let prestrain:string = query.strain


let strainq:string = query.strain
// let strainq:string = await Regex(prestrain, 'numreturn')
console.log('strainq')
console.log(strainq)


let alldbstrains = await prisma.strains.findMany()

// strain:(obect|string)
        // let strains = await APIcall('all', null, null)
        // await strains.forEach(async(strain) => {          
        //         console.log('strain in the forEach loop')
        //         console.log(strain)
        //         if (strain.string === strainq) {
        //                 console.log('strainq they equal each other!s')
        //                 console.log(strainq)
        //                 console.log(strain)
        //                 await strainbucket.push(strain)
        //         }
        // })

// let onestrain = await APIcall('specify', strain, null)                        

                        await alldbstrains.forEach(async(item) => {
                                if (item.strain === strainq) {
                                        let strain:string = item.strain                        
                                console.log('strain')
                                console.log(strain)
                                        strainbucket.push(item)
                        }
                })

await res.json( strainbucket )
}
export default getSpecifiedStrain
