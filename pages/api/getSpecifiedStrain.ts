import APIcall from 'utility/APIcall'
import Random from '../../utility/Randomizer'
import $ from 'jquery'
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

async function getSpecifiedStrain(req:any, res:any|null, state:any) {          // changing or null. if you're invoking the function you don't want a value. its the ajax call that needs the value. this req can be the strain.strain/name
        let prisma = new PrismaClient()
        console.log('req SERVER SIDE')
        console.log('state')
        console.log(state)
        
         console.log("arent we in this funciton right over heres")
         if (typeof req === 'object') {
            console.log("allow the object to be for when the request is the object of the strain being sent import/invocation style")
            console.log('res')
            console.log(res)
         } else if (typeof req === 'string') {
            console.log("this should be the ajax string data of doing things")
            //  res.json( { getdata: {hi: 'heyy'} })        
            }
            
            // let pokemon = await $.ajax({
            //     method: 'get',
            //     url: `https://pokeapi.co/api/v2/pokemon/slowpoke`,
            //     data: 'json'
            // })

            // console.log('pokemon')
            // console.log(pokemon)
            // res.json( {getdata: {hi: pokemon}})
            res.json( {getdata: 'yes' })
           

}

export default getSpecifiedStrain


//    const strain = await prisma.strains.findUnique({
        //     where: {
        //       strain: req.body,
        //     },
        //   })
