
import APIcall from 'utility/APIcall'
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()
export default async function (req:any, res:any) {              // res:string doesn't work
    let strainbucket:(string|number|object)[] = new Array() || []
    let reqStr = req.query.strainId
    console.log('reqStr')
    console.log(reqStr)
    console.log(typeof reqStr)
    // let reqStr = parseInt(req.query.strainId)        
    let dbstrain = await prisma.strains.findMany()

    

    dbstrain.forEach( (strain) => {
        console.log('typeof strain.strainId')
        console.log(typeof strain.strainId)
        let strainstring:any = strain.strainId
        if (strainstring.toString() === reqStr) {
            console.log("strain is equal to param")
            console.log('strain')
            console.log(strain)
            strainbucket.push({ yeah: 'sure'!})
        }
    })
    
    // strains.forEach( (strain:object|string) => {
    //     console.log('strain in the /strain/[strainId] dynamic route')
    //     console.log(strain)
    // })
    // console.log(strains)
    res.json(  strainbucket  )
}
