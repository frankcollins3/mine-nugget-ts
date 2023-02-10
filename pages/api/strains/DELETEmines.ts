import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function DELETEmines (req, res) {
    console.log('req.body')
    console.log(req.body)

    let body = req.body;
    let data = req.body.data

    let deleteit:string = data.delete
    console.log('deleteit')
    console.log(deleteit)

    if (deleteit === 'all') {
        console.log('deleteit === all')
        const deleteMines = await prisma.mines.deleteMany({})
    }
    if (deleteit === 'one') {
        let strainId = data.strainId 
        console.log('deleteit is one')
        const deleteMine = await prisma.mines.delete({
            where: {
                strainId: strainId
            }
        }).then(async(deletestrain) => {
            console.log('deletestrain')
            console.log(deletestrain)
            let allmines = await prisma.mines.findMany()
            res.json( { updatedMines: allmines, delete: 'success'})
        })
    }
        


    console.log('body.data from the DELETEmines!')
    console.log(body.data)
    

}