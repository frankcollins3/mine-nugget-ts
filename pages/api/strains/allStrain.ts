import { PrismaClient } from '@prisma/client';
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'



const prisma = new PrismaClient();

export default async function allStrain (req:any, res:any) {
  
    const { body } = req;      
    console.log('body')
    console.log(body)
    let allstrainspost:any = await APIcall(body.key, null, null)
    let dbstrainlist = await prisma.strains.findMany()
    let strains = prisma.strains
    
    console.log('we are in the allstrain post route **************')
    
    const createStrains = async () => {
          console.log('firing the createStrains function')
          if (dbstrainlist.length < 3) {                
          allstrainspost.map( (mapitem:any, index:number) => {
            let strainId:number = index + 1
            let strain:string = mapitem.strain
            let dominant:string = mapitem.dominant
            let parents:string = mapitem.parents
            let funfact:string = mapitem.funfact
            
            strains.create({
              data: {
                strainId: strainId,
                strain: strain,
                dominant: dominant,
                parents: parents,
                funfact: funfact
              }
            }).then( (createdstrains:any) => {        
              res.json( { successObject: dbstrainlist, length: dbstrainlist.length})                   
            }).catch( (err) => {
              res.json ( 'Gold in the Mines' )
            })              
        })
    } else { res.json ( 'Gold in the Mines' )}
    }
      createStrains()    

  // if (req.method === 'POST') {      
  //     let status:string = req.status            
  //     let dblength = dbstrainlist.length
  //     if (dbstrainlist.length) {

  //     }   
  // }
  // try {
  // }
  // catch (err) {
  //   console.log(err)
  // }

}
