import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export default async function update (req:any, res:any) {              // res:string doesn't work
    // console.log('we are hitting the update route')
    // console.log('req')
    // console.log(req)

    let dbstrains = await prisma.strains.findMany()
    const orderstrains  = await prisma.strains.findMany({
        orderBy: [
          {
            strainId: 'asc',
          },
        //   {
        //     name: 'desc',
        //   },
        ],

      })
      
    console.log('orderstrains')
    console.log(orderstrains)

    dbstrains.forEach( (data:string|object) => {
        console.log('data in the dbstrains foreach')
        console.log(data)
    })

    // console.log(strains)
    res.json(  {watsup: 'hi'}  )
}
