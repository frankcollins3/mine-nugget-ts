import MasterRegex from 'utility/MasterRegex'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'
import NumberStringLoop from 'utility/NumberStringLoop'
const prisma = new PrismaClient()

export default async function (req, res) {
    // export default async function (req:(string|object|number), res:(string|object|number)) {

        let data = req.body.dataname
        let id = req.body.id
        console.log('id')
        console.log(id)
        let realdata = await Regex(data, 'alphareturn')


        let strains = await prisma.strains.findMany()
        let apistrains = await APIcall('all', null, null)

        // apistrains.forEach( (strain) => {
        //     if (strain.strain === realdata) {
        //         console.log('strain finally!')
        //         console.log(strain)
        //     } else if (realdata === 'GorillaGlue') {
        //         console.log('strain passed the condition')
        //         if (strain.strain === 'GorillaGlue#4') {
        //             console.log('strain condition')
        //             console.log(strain)
        //         }
        //     }
        // })

        strains.forEach(async(strain) => {
            if (strain.strain === realdata) {
                let strainid:(string|number) = strain.strainId   
                console.log(`typoe strainid ${typeof strainid}`)
                
                // CREATE TABLE "UsersOnStrains" (
                //     "usersId" INTEGER NOT NULL,
                //     "strainsId" INTEGER NOT NULL,
                //     CONSTRAINT "UsersOnStrains_pkey" PRIMARY KEY ("usersId","strainsId")
                // );

                let newNumber = await NumberStringLoop(id, 7)
                console.log(`typoe new number ${typeof newNumber}`)
                // let cleanStrain = await NumberStringLoop(strainid, 7)
                // let resobject = {name: strainid, id: strainid}

                let mystrains = await prisma.strains.findMany()
                // mystrains.forEach(async(strain) => {
                //     if (strain.id === strainid) {
                //         let mystrain = await prisma.strains.findUnique({
                //             where: {
                //                 id: strain.id
                //             }
                //         }).then( (mydata) => {
                //         })
                //     }
                //  })
                
                mystrains.forEach(async(strain) => {
                    if (strain.id === strainid) {
                        let typestrain:(object|string|number) = await prisma.strains.findUnique({
                            where: {
                                id: strain.id
                            }
                        }).then((mydata:(object|string|number)) => {
                            console.log("return data specified type")
                            let returnstrain:string = mydata.strain
                            let momdad:string = mydata.parents
                            let returnid:number = mydata.id
                            let returnStrainId:number = mydata.strainId
                            console.groupCollapsed()
                            // console.log(mydata)
                            console.log(`name: ${returnstrain} parents: ${momdad}`)
                            console.log(`testing numbers ${returnid} ${returnStrainId}`)
                            console.groupEnd()
                            
                        })
                    }
                })

                let findstrain = await prisma.strains.findFirst({
                    where: {
                        strainId: strainid                        
                    } 
                })

                // const assignStrain = await prisma.users.create({
                //     data: {
                //       username: 'good guy',
                //       password: 'nice pass',
                //       email: 'goodemail@gmail.com',
                //       age: 44,
                //       strains: {
                //         // usersId: req.body.id,
                //         // strainsId: strainid,
                //         create: [  
                //             {
                //             strains: {
                //                 connect: {
                //                     id: strain.id
                //                 }
                //             },
                //           },
                //         ],
                //       },
                //     },
                //   })

                // const assignStrain = await prisma.users.findFirst({
                // const assignStrain = await prisma.users.create({
                //     where: {
                //       username: 'good guy',
                //       password: 'nice pass',
                //       email: 'goodemail@gmail.com',
                //       age: 44,
                //       strains: {
                //         usersId: req.body.id,
                //         strainsId: strainid,
                //         create: [  
                //             {
                //             strains: {
                //                 connect: {
                //                     id: strain.id
                //                 }
                //             },
                //           },
                //         ],
                //       },
                //     },
                //   }).then( (data) => {
                //     console.log('data')
                //     console.log(data)
                //   }

                // model Post {
                //     author      String     @id
                //     lastUpdated DateTime   @updatedAt
                //     categories  Category[]
                //   }
                  
                //   model Category {
                //     id    Int    @id
                //     posts Post[]
                //   }
                // *   As for the query, it would look like this:                  
                //   const categories = [
                //     { create: { id: 1 }, where: { id: 1 } },
                //     { create: { id: 2 }, where: { id: 2 } },
                //   ]
               
                const newStrain =  { create: { strainsId: parseInt(strainid) }, where: { usersId: 1 } }
                  
              
                
                
                  


                  // const updatePost = await prisma.users.update({
                
                
                  //     where: {
                //       id: 3,
                //     },

                // const userAndStrains = await prisma.users.create({
                //     data: {
                //       username: 'me again',
                //       password: '1000', 
                //       age: 22, 
                //       email: 'again@again.again',
                //       strains: {
                //         create: [
                //           { strainsId: 5 }
                //         ],
                //       },
                //     },
                //   }).then( (newrecord) => {
                //     console.log('newrecord')
                //     console.log(newrecord)
                //   })

                
                // const UsersAndUserStrains = await prisma.users.create({
                //     data: {


                    const user = await prisma.users.update({
                        where: {
                          id: 4,
                        },
                        data: {
                          strains: {
                            createMany: {
                              data: [{ strainsId: 5}],
                            //   data: [{ strainsId: 4 }, { strainsId: 3 }, { strainsId: 2}],
                            },
                          },
                        },
                      }).then( (record) => {
                        console.log('   record')
                        console.log(record)
                      })
                
                
                // await prisma.strains.findUnique({
                //     where: {
                //          id: { findstrain.id }
                //     }
                // }).then( (unique) => {
                //     console.log('unique')
                //     console.log(unique)
                // })
                // const newstrain = await prisma.UsersOnStrains.create({
                //     data: {
                //       usersId: newNumber,
                //       strainsId: strainid,
                //     },
                //     include: {
                //         users: true,
                //         strains: true
                //     }
                // }).then(async(data) => {
                //     console.log('data success for post route!')
                //     console.log(data)
                // }).catch( (error) => {
                //     console.log('error')
                //     console.log(error)
                // })

                //   usersId | strainsId | assignedAt | assignedBy
          //   }).then(async(data:object|string|numbers) => {
                res.json( {mydog: 'we made it'} )
                // res.json( {mystrain} )

            } else if (realdata === 'GorillaGlue') {
                console.log('strain passed the gorillaglue condition')
                if (strain.strain === 'GorillaGlue#4') {
                    let strainid:(string|number) = strain.strainId    
                    console.log('strainid GG!')                                    
                    console.log(strainid)                                    
                }
            } else if (realdata === 'DoSiDos') {
                if (strain.strain === 'Do-Si-Dos') {
                    console.log("we passed the Do-Si-Dos condition!")
                    let strainid:(string|number) = strain.strainId                    
                }
            }
        })           
            // let testjson:string = 'testjson'        
        }    
    
    
