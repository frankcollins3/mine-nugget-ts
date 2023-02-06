import APIcall from 'utility/APIcall'

import path from 'path';
import { promises as fs } from 'fs';
let strainJSON = 'utility/strainJSON.json'

export default async function (req, res) {

    let body = req.body
    let usersId = body.usersId
    let strainName = body.strain
    let strainsId = body.strainsId
    console.log('req.body')
    console.log(req.body)
    console.log('usersId')
    console.log(usersId)
    
    let apidata = await APIcall('all', null, null) 
    const fileContents = await JSON.parse(await fs.readFile('utility/strainJSON.json', 'utf8'))
    // const fileContents = await fs.readFile(jsonDirectory + 'utility/strainJSON.json', 'utf8');

    let strainsFS = fileContents.strains

    
    await strainsFS.forEach( (strain:any) => {
        if (strain.strain === strainName) {           
            strainsId = strain.strainId

        }
        // if (strain.strain === strainName)  strainsId = strain.id        
    })


    res.json( { response: req.body} )

}