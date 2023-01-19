import Random from 'utility/Randomizer'
import { PrismaClient } from '@prisma/client';

async function dbFirstLetter(req:any, res:any) {        


        let prisma = new PrismaClient()
        // let firstLetter:string = req.body || {fakeKey: 'fakeValue'}
        let firstLetter:string = req.body.dataname 
        // let firstLetter:string = req.body.code || {fakeKey: 'fakeValue'}
        
        
        console.log('req')
        console.log(req)

        console.log('firstLetter')
        console.log(firstLetter)

        let strainbucket = new Array()
        // console.log('firstLetter in the house')
        // console.log(firstLetter)

        const pushloop = async () => {
            let allstrains = await prisma.strains.findMany()        // find all strains from
            let randomStrainToTest = Random(allstrains)                
            allstrains.forEach( (strain:any) => {
                let name:string = strain.strain
                let firstletter:string = name.charAt(0)
                console.log('firstletter name.charAt(1)')
                console.log(firstletter)
                if (firstLetter === firstletter) {
                    
                    console.log(` *  * * * * * * * firstLetter ${firstLetter} firstletter ${firstletter} * * * * * * `)
                    strainbucket.push(strain)
                }
            })
        }
        const returnvalue = async () => {
            await pushloop()
            return strainbucket
        }
        // let myvalue = await returnvalue()
        
        const returnfunction = async () => {
            let value = await returnvalue()
             res.json( value)        
        }
        returnfunction()
    }

export default dbFirstLetter
