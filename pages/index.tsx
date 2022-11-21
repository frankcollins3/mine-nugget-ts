import { PrismaClient } from '@prisma/client';
import APIcall from '../../utility/APIcall'

const prisma = new PrismaClient();

export default async function (req:any, res:any) {

    const { body } = req;      
    console.log(body)
    let allstrainspost:any = await APIcall(body.key, null, null)
    let dbstrainlist = await prisma.strains.findMany()
    let strains = prisma.strains
   
    dbstrainlist.forEach( (strainitem) => {
        console.log('strainitem')  
        console.log(strainitem)  

    })

  if (req.method === 'POST') {      
      let status:string = req.status
      console.log('status')
      console.log(status)
            
      let dblength = dbstrainlist.length
      if (dbstrainlist.length) {

      }
      
    
    // const movie = await prisma.strains.create({ data: JSON.parse(body) });
    // res.json(movie);
  }
  try {
      res.json( { successObject: allstrainspost, length: dbstrainlist.length})
  }
  catch (err) {
    console.log(err)
  }

//   if (res.status(403)) {
//     console.log('we have failure')
//     // can also redirect to an error page.
//   } else {
//     res.status(200).json( { successobject: allstrainspost})
//   }
}
