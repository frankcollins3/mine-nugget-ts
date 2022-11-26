import { PrismaClient } from '@prisma/client';
import APIcall from '../../../utility/APIcall'
import Random from '../../../utility/Randomizer'



const prisma = new PrismaClient();

export default async function (req:any, res:any) {
  
    const { body } = req;      
    // console.log(body)
    let allstrainspost:any = await APIcall(body.key, null, null)
    let dbstrainlist = await prisma.strains.findMany()
    let strains = prisma.strains

    
    const createStrains = async () => {
      console.log("we are here");
          if (dbstrainlist.length < 3) {
            console.log("we are ALSO HERE!!");                
            
          allstrainspost.map( (mapitem:any, index:number) => {
            let strainId:number = index + 1
            let strain:string = mapitem.strain
            let dominant:string = mapitem.dominant
            let parents:string = mapitem.parents
            let funfact:string = mapitem.funfact
            
            console.log('strain')
            console.log(strain)
            
            strains.create({
              data: {
                strainId: strainId,
                strain: strain,
                dominant: dominant,
                parents: parents,
                funfact: funfact
              }
            }).then( (createdstrains:any) => {
              console.log('createdstrains')
              console.log(createdstrains)
            })              
        })
    }
    }
      createStrains()

  
    // const updateId = async () => {      
    // }

    const checkdb = () => {
      console.log('were in the checkdb')
      console.log(dbstrainlist)
    }
    checkdb()



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
      res.json( { successObject: dbstrainlist, length: dbstrainlist.length})
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