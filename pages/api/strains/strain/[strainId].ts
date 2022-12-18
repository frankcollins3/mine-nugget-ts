
import APIcall from 'utility/APIcall'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
import StringInt from 'utility/StringInt'
let prisma = new PrismaClient()
let i = 0;


export default async function (req:any, res:any) {              // res:string doesn't work
    let strainbucket:(string|number|object)[] = new Array() || []

    
    // let reqStr = req.query
    let twostringkeys = req.query.strainId
    let dbstrain = await prisma.strains.findMany()

    if (twostringkeys.includes('no')) {        
        let reqstr = await Regex(twostringkeys, 'numreturn')            
                
        const returnRes = () => {
            dbstrain.forEach( (strain) => {            
                let strainstring:any = strain.strainId
                if (strainstring.toString() === reqstr) {                                    
                    return res.json( strain )
                }
            })
        }
        return returnRes()
        
    } else if (!twostringkeys.includes('no')) {        
        let elseid:number = twostringkeys
        
        const returnResponse = async  () => {
            do {                    
                if (dbstrain[i]) {                    
                    let index = dbstrain[i]
                    let strainid = index.strainId    
                    let parsedint = await StringInt(twostringkeys, null)                
                    // let parsedint = await StringInt(twostringkeys, 'parseInt')                

                    console.log('parsedint')
                    console.log(parsedint)

                    if (index.strainId === parsedint) {                    
                        return res.json (index)
                    }
                }
                i++
            }
            while(i < dbstrain.length)
        }
        return returnResponse()        
    }
}
