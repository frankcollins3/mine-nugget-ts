import { PrismaClient } from '@prisma/client';
import APIcall from '../../utility/APIcall'

const prisma = new PrismaClient();

export default async function (req:any, res:any) {
  if (req.method === 'POST') {
      const { body } = req;
      console.log('body')
      console.log(body)
      if (req.body.key === 'all') {
          console.log("we are in the post method and req.body.key === all")
        let allstrainspost:any = await APIcall('all', null, null)
        console.log('allstrainspost')
        console.log(allstrainspost)
    }
        
    // const movie = await prisma.strains.create({ data: JSON.parse(body) });
    // res.json(movie);
  }
  
}