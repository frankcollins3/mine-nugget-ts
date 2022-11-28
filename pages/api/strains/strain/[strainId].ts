
import APIcall from 'utility/APIcall'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
let prisma = new PrismaClient()


export default async function (req:any, res:any) {              // res:string doesn't work
    let strainbucket:(string|number|object)[] = new Array() || []

    
    // let reqStr = req.query
    let twostringkeys = req.query.strainId

    if (twostringkeys.includes('no')) {
        console.log("it includes no!!!!")        
        let reqstr = await Regex(twostringkeys, 'numreturn')
        console.log('reqstr')
        console.log(reqstr)
        // console.log(typeof reqStr)
    
        // let reqStr = parseInt(req.query.strainId)        
        let dbstrain = await prisma.strains.findMany()
        
        dbstrain.forEach( (strain) => {            
            let strainstring:any = strain.strainId
            if (strainstring.toString() === reqstr) {                
                strainbucket.push({ strain })
            }
        })
        const returnRes = () => {
            return res.json(  strainbucket  )
        }
        return returnRes()
        
    } else if (!twostringkeys.includes('no')) {
        console.log("the data doesn't have that so this same function should return undefined.")
        // return { christmas: 'coal'}
        // return (             cant render react elements in .ts file
        //     <div>

        //     </div>
        // )
        
    }
}
