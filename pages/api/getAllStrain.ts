import { PrismaClient } from '@prisma/client';

async function getAllStrain(req:any, res:any) {
        let prisma = new PrismaClient()

        let { body } = req.body
        console.log(body)


        let allstrains = await prisma.strains.findMany()
        console.log("server side allstrains")
        console.log(allstrains)
        // this is server side notice this code isn't in the google dev tools console its in the server/terminal.. allstrains..

        // if (allstrains) {

        // }
        res.json( { getdata: allstrains })
        // res.json( { successObject: dbstrainlist, length: dbstrainlist.length})

}

export default getAllStrain