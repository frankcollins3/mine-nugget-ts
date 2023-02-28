import { PrismaClient } from '@prisma/client';
import Scrambler from 'utility/ArrayScrambler'
import Random from 'utility/Randomizer'

 async function dbNumber (req:any, res:any) {
    let prisma = new PrismaClient()
    let strains = await prisma.strains.findMany()
    // let scrambledstrains = await Scrambler(strains)

    const shuffledArray = strains.sort((a, b) => 0.5 - Math.random());
    let bodyint:string = req.body.dataname
    let paramlength:number = bodyint.length

    strains.forEach( (strain) => {        
        console.log(`strains ${strain.strain}`)
    })
    res.json( {numbered: paramlength})
}

export default dbNumber
