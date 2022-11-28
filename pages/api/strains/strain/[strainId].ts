
import APIcall from 'utility/APIcall'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
let prisma = new PrismaClient()


export default async function (req:any, res:any) {              // res:string doesn't work
    let strainbucket:(string|number|object)[] = new Array() || []

    console.log('req')
    console.log(req)
    // let reqStr = req.query
    let twostringkeys = req.query.strainId
    console.log('twostringkeys')
    console.log(twostringkeys)

    let reqstr = await Regex(twostringkeys, 'numreturn')
    console.log('reqstr')
    console.log(reqstr)
    // console.log(typeof reqStr)

    // let reqStr = parseInt(req.query.strainId)        
    let dbstrain = await prisma.strains.findMany()

    

    dbstrain.forEach( (strain) => {
        console.log('typeof strain.strainId')
        console.log(typeof strain.strainId)
        let strainstring:any = strain.strainId

        // if (strainstring.toString() === reqStr) {
        //     console.log("strain is equal to param")            
        //     console.log('strain here')
        //     console.log(`strain ${strain}`)
        //     strainbucket.push({ strain })
        // }
    })
    
    // strains.forEach( (strain:object|string) => {
    //     console.log('strain in the /strain/[strainId] dynamic route')
    //     console.log(strain)
    // })
    // console.log(strains)
    res.json(  strainbucket  )
}
