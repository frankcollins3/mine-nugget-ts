import APIcall from 'utility/APIcall'

import path from 'path';
import { promises as fs } from 'fs';
import { PrismaClient } from '@prisma/client';
let strainJSON = 'utility/strainJSON.json'

// * might grab the user from the URL too to also confirm!

export default async function userstrainpost (req, res) {

    let prisma = new PrismaClient()
    let body = req.body
    let usersId = body.usersId
    let strainName = body.strain
    let strainsId = body.strainsId
    
    let apidata = await APIcall('all', null, null) // backup.
    const fileContents = await JSON.parse(await fs.readFile('utility/strainJSON.json', 'utf8'))
    let strainsFS = fileContents.strains

    let nonDBstrains = apidata || strainsFS

    let strainsDB = await prisma.strains.findMany()
    strainsDB.forEach(async (dbstrain) => {    
        if (dbstrain.strain === strainName) {
            const strainId:number = dbstrain.id

            const newUserStrains = await prisma.usersOnStrains.create({
                data: {
                  usersId: usersId,
                  strainsId: strainId,
                },
              }).then( (newUserStrain) => {
                res.json( { response: req.body, strainsId: strainId, name: strainName  } )
            })
        }})}
