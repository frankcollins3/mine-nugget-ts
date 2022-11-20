import { PrismaClient } from '@prisma/client';
import APIcall from '../../utility/APIcall'

const prisma = new PrismaClient();

export default async function (req:any, res:any) {
    const { body } = req;      
    let allstrainspost:any = await APIcall(body.key, null, null)
  if (req.method === 'POST') {      
      let status:string = req.status
      console.log('status')
      console.log(status)

          console.log("we are in the post method and req.body.key === all")
        console.log('allstrainspost')
        console.log(allstrainspost)
        
    // const movie = await prisma.strains.create({ data: JSON.parse(body) });
    // res.json(movie);
  }
  try {
      res.json( { successObject: allstrainspost})
  }
  catch (err) {
    console.log(err)
  }
//   console.log('res.status')
//   console.log(res.status)
//   console.log(res.status)
//   if (res.status(403)) {
//     console.log('we have failure')
//     // can also redirect to an error page.
//   } else {
//     res.status(200).json( { successobject: allstrainspost})
//   }
}
