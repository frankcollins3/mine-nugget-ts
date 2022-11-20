import { PrismaClient } from '@prisma/client';
import APIcall from '../../utility/APIcall'

const prisma = new PrismaClient();

export default async function (req:any, res:any) {
    let allstrainspost:any = await APIcall('all', null, null)
  if (req.method === 'POST') {      
      let status:string = req.status
      console.log('status')
      console.log(status)

      const { body } = req;
      console.log('body')
      console.log(body)
          console.log("we are in the post method and req.body.key === all")
        console.log('allstrainspost')
        console.log(allstrainspost)
        
    // const strains = await prisma.strains.create({ data: JSON.parse(body) });
    // res.json(strains);
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
