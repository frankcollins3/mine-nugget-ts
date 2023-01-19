import Random from 'utility/Randomizer'
import { PrismaClient } from '@prisma/client';

async function dbFirstLetter(req:any, res:any) {        
        let prisma = new PrismaClient()        
        let firstLetter:string = req.body.dataname 

        let strainbucket = new Array()
        let allstrains = await prisma.strains.findMany()        // find all strains from        
        const pushloop = async () => {
            let randomStrainToTest = Random(allstrains)                
            allstrains.forEach( (strain:any) => {
                let name:string = strain.strain
                let firstletter:string = name.charAt(0).toLowerCase()                
                if (firstLetter === firstletter) {                                    
                    strainbucket.push(strain)
                }
            })
        }
        const returnvalue = async () => {
            await pushloop()
            return strainbucket
        }        
        const returnfunction = () => {
            return res.json ( strainbucket ) 
        }
        const waitforpushThenRes = async () => {
            await returnvalue()
            await returnfunction()
        }
        waitforpushThenRes()
    }

export default dbFirstLetter
