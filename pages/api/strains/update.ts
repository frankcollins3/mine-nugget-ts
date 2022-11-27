import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export default async function update (req:any, res:any) {              // res:string doesn't work
    // console.log('we are hitting the update route')
    // console.log('req')
    // console.log(req)

    let dbstrains = await prisma.strains.findMany()
    
      await prisma.strains.update({
        where: {
          strain: '...',
        },
        data: {
          strain: '',
        },
        orderBy: [
            {
                strainId: 'asc'
            }
        ]
      })

    dbstrains.forEach( (data:string|object) => {
        console.log('data in the dbstrains foreach')
        console.log(data)
    })



    // console.log(strains)
    res.json(  {watsup: 'hi'}  )
}
