import { PrismaClient } from '@prisma/client';
import APIcall from 'utility/APIcall'
import path from 'path';
import { promises as fs } from 'fs';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

export default async function (req, res) {
    // hmm also just realized you could follow that same one prisma call ideaology twice.
    //  I was going to have 2 different res.json here: 1 for the 'all' && 1 for 'specify' singular strain or array of specified 
    
    // in case of [ req.body.data !== 'all' ] My plan to specify data: send over req.body.data --------> body.data === {strain: 'white widow'} || body.data === ['widow', 'wedcake', 'GG4', 'ogkush']

    const Prisma = new PrismaClient()
    let body = req.body
    let reqdata = body.data
    console.log('req.body')
    console.log(req.body)
    console.log(`typeof reqdata: ${typeof reqdata}`)
    let alluserStrains = await Prisma.usersOnStrains.findMany()
    let allStrains = await Prisma.strains.findMany()

    let apidata = await APIcall('all', null, null) // backup.
    const fileContents = await JSON.parse(await fs.readFile('utility/strainJSON.json', 'utf8'))
    let strainsFS = fileContents.strains
    let nonDBstrains = apidata || strainsFS
    // console.log(req.body)

    // let alluserStrains = Prisma.usersOnStrains.findMany()    // 1 data call up here for both conditions below to share as a root database store? 

    if (reqdata === 'all' && typeof reqdata === 'string') {    
        console.log('string condition  met')
        res.json( { body: req.body, userStrains: alluserStrains})
        // res.json( { body: req.body, hey: 'hi'})
    }



    if (typeof reqdata === 'object') {
        console.log(req.body.data === 'object')        

        let length:string = req.body.data.length
        console.log('length serverside length')
        console.log(length)

if (length === 'nothing') {             // * let oneGetStrain = await GETuserstrains(userStrainUrl, {strain: 'mimosa', userId: 48})  // this is the syntax to get return data correctly from this if block
            // let createdStrain = await Prisma.usersOnStrains.findOne()
            let id = 0;
            // let AllStrains = Prisma.usersOnStrains.findMany()
            console.log('allStrains in the nothing condition!')            
            const foundStrain = await allStrains.filter(strain => strain.strain === req.body.data.strain);
            id = id + foundStrain[0].id
            console.log('foundStrain')
            console.log(foundStrain)

            const newUserStrain = await Prisma.usersOnStrains.findFirst({
                where: {                    
                    strainsId: req.body.strainsId,
                    usersId: req.body.usersId
                },
              }).then( (foundUserStrain) => {
                console.log('foundUserStrain')
                console.log(foundUserStrain)
                res.json( { userStrain: foundUserStrain, foundStrain: foundStrain, APIdata: nonDBstrains } )
                // return newuserstrain
            })            
        }
    if (length) {
        let returnstraindata:any = []        
        let axiosdata = req.body.data.data
        let usersId = axiosdata[0]
        let straindata:string[] = axiosdata[1]
        let straindataLength = straindata.length
        
        const loopAndPush = async () => {
        await straindata.forEach(async(strains:any) => {
            console.log('strains')
            console.log(strains)     
                if (strains) {
                    let strainsId = 0
                    const foundStrain = await allStrains.filter(strain => strain.strain === strains);
                    strainsId = strainsId + foundStrain[0].id

                    await Prisma.usersOnStrains.findFirst({
                        where: {
                            usersId: usersId,
                            strainsId: strainsId
                        }
                    }).then( (strain:any) => {
                        console.log('were here in the .then')
                        console.log('strain')
                        console.log(strain)                        
                        returnstraindata.push(strain)

                    })
                }
            })
        }
    
        const returnResponse = async () => {            
            await loopAndPush() 
            await res.json( { userStrain: returnstraindata, testKey: 'testVal',  } )
        }
        await returnResponse()        
    }        
    }    
}
