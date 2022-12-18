
import APIcall from 'utility/APIcall'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
let prisma = new PrismaClient()
let i = 0;


export default async function (req:any, res:any) {              // res:string doesn't work
    let strainbucket:(string|number|object)[] = new Array() || []

    
    // let reqStr = req.query
    let twostringkeys = req.query.strainId
    let dbstrain = await prisma.strains.findMany()

    if (twostringkeys.includes('no')) {
        console.log("it includes no!!!!")        
        let reqstr = await Regex(twostringkeys, 'numreturn')            
        
        
        const returnRes = () => {
            dbstrain.forEach( (strain) => {            
                let strainstring:any = strain.strainId
                if (strainstring.toString() === reqstr) {                

                    // strainbucket.push({ strain })
                    // return res({hey: 'hi'})
                    return res.json( strain )
                }
            })
        }
        return returnRes()
        
    } else if (!twostringkeys.includes('no')) {
        console.log("the data doesn't have that so this same function should return undefined.")
        let elseid:number = twostringkeys
        console.log('there should be no data in this part')
        do {    
            console.log("hey we are in a do while loop")
            // * slice next baby!
            if (dbstrain[i]) {
                
                let index = dbstrain[i]
                let strainid = index.strainId
                console.log('strainid')
                console.log(`${strainid}${typeof strainid}`)
                console.log(`twostrainkeys ${twostringkeys} ${typeof twostringkeys} `)
                if (index.strainId === parseInt(twostringkeys)) {
                // if (strainid === parseInt(twostringkeys)) {
                    console.log('twostringkeys if condition!')
                    console.log(index)
                    console.log(twostringkeys)
                }
            }
            i++
        }
        while(i < dbstrain.length)
        return res.json( {hey: 'hi'})
        // return { christmas: 'coal'}
        // return (             cant render react elements in .ts file
        //     <div>

        //     </div>
        // )
        
    }
}
