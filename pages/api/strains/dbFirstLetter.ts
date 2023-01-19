import Random from '../../../utility/Randomizer'
import { PrismaClient } from '@prisma/client';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

async function dbFirstLetter(req:any, res:any) {        
        let prisma = new PrismaClient()
        let firstLetter:string = req.body || {fakeKey: 'fakeValue'}
        let strainbucket = new Array()
        console.log('firstLetter in the house')
        console.log(firstLetter)

        const pushloop = async () => {
            let allstrains = await prisma.strains.findMany()        // find all strains from
            let randomStrainToTest = Random(allstrains)                
            allstrains.forEach( (strain:any) => {
                let name:string = strain.strain
                let firstletter:string = name.charAt(1)

                console.log('strain')
                console.log(strain)

                if (firstLetter === firstletter) {
                    console.log(`firstLetter ${firstLetter} firstletter ${firstletter}`)
                    strainbucket.push(strain)
                }
            })
        }
        const returnvalue = async () => {
            await pushloop()
            return strainbucket
        }
        let myvalue = await returnvalue()
        

        res.json( { getdata: myvalue })        
    }

export default dbFirstLetter