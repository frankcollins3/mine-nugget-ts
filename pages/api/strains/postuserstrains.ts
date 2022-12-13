import MasterRegex from 'utility/MasterRegex'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'
import NumberStringLoop from 'utility/NumberStringLoop'
import ReturnEndpoints from 'utility/KeysOrValues'
import LoopAndPush from 'utility/LoopAndPush'

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

            const reusableUserCreate = async (username:string, email:string, pw:string, age:number) => {
                const createuser = await prisma.users.create({
                    data: {
                        username: username,
                        password: pw,
                        email: email,
                        age: age
                    }
                }).then( (newuser:(object|number|string)) => {
                    console.log(newuser)
                    return newuser
                })
            }

            const relationalStrainToUser = async (user:number|string, strainsId) => {
                const checkYes:(number)[] = []

                const checkstrain = await prisma.users.findFirst({
                    where: {
                      id: user 
                    },
                    include: {
                        strains: true
                    }
                }).then(async(founduser) => {
                    let userstrains = founduser.strains
                    let values = await ReturnEndpoints(founduser.strains, 'values')
                    let valueArray = values[0]
                    
                    
                    
                    // console.log('values')
                    // console.log(values)
                    // console.log(values.strainId)

                    values.forEach(async(value) => {
                        let val:number = value.strainsId
                        console.log(`val ${val} strainsId ${strainsId}`)
                        if (val === strainsId) {
                            console.log(`we already have this strain! dont do anything! ${strainsId}`)
                            return // continue
                        } else {
                            console.log(` this is what we want! ${strainsId}`)
                            const strainuser = await prisma.users.update({
                                where: {
                                id: 6,
                                },
                                data: {
                                    strains: {          
                                    createMany: {
                                    data: [{ strainsId: strainsId}],  //   data: [{ strainsId: 4 }, { strainsId: 3 }, { strainsId: 2}]
                                    },
                                },
                                },
                            }).then( (record) => {
                                console.log('record')
                                console.log(record)
                            }).catch( (error) => {
                                console.log('hey theres a little error!')
                                throw new Error('nice error!');
                            })                            
                                return founduser                        
                        }                      
                    })
                    // let looputil = await LoopAndPush(values, checkYes, valueArray.strainId, strainsId, null)                    
                    })
                        

                            


                // console.log('checkstrain')
                // console.log(checkstrain)


            }

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
                            let returnstrain:string = mydata.strain
                            let momdad:string = mydata.parents
                            let returnid:number = mydata.id
                            let returnStrainId:number = mydata.strainId                            
                        })

                        let newuser = await relationalStrainToUser(parseInt(req.body.id), strain.id)                        
                    }
                })

                let findstrain = await prisma.strains.findFirst({
                    where: {
                        strainId: strainid                        
                    } 
                })




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

                    // ** this works and adds strains to user !!!!!!
                    // const user = await prisma.users.update({
                    //     where: {
                    //       id: 4,
                    //     },
                    //     data: {
                    //       strains: {
                    //         createMany: {
                    //           data: [{ strainsId: strainid}],
                    //           data: [{ strainsId: 4 }, { strainsId: 3 }, { strainsId: 2}],
                    //         },
                    //       },
                    //     },
                    //   }).then( (record) => {
                    //     console.log('   record')
                    //     console.log(record)
                    //   })

                    // const changepassword = await prisma.users.update({
                    //     where: {
                    //       id: 1,
                    //     },
                    //     data: {
                    //       password: '777',
                    //     },
                    //   }).then( (newrecord:(object|string|number)) => {
                    //     console.log('newrecord')
                    //     console.log(newrecord)
                    //   })


                
                
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
                // res.json( {mystrain} )

            } else if (realdata === 'GorillaGlue') {
                if (strain.strain === 'GorillaGlue#4') {
                    console.log('strain passed the gorillaglue condition')
                    let strainid:(string|number) = strain.strainId  

                    const strainuser = await prisma.users.update({
                        where: {
                        id: 6,
                        },
                        data: {
                            strains: {          
                            createMany: {
                            data: [{ strainsId: 2}],  //   data: [{ strainsId: 4 }, { strainsId: 3 }, { strainsId: 2}]
                            },
                        },
                        },
                    }).then( (record) => {
                        res.json( {record})                        
                    }).catch( (error) => {                        
                        res.json( {error} )
                        throw new Error('nice error!');
                    })                            
                        return founduser                        
                }                                
                    // let mario = await reusableUserCreate('supermario', 'mario@nintendo.com', 'luigi', 41)  
                    // let newuser = await relationalStrainToUser(parseInt(req.body.id), strainid)                                                    
            } else if (realdata === 'DoSiDos') {
                if (strain.strain === 'Do-Si-Dos') {
                    console.log("we passed the Do-Si-Dos condition!")
                    let strainid:(string|number) = strain.strainId   
                    // let newuser = await relationalStrainToUser(parseInt(req.body.id), strainid)

                    const strainuser = await prisma.users.update({
                        where: {
                        id: 6,
                        },
                        data: {
                            strains: {          
                            createMany: {
                            data: [{ strainsId: 3}],  //   data: [{ strainsId: 4 }, { strainsId: 3 }, { strainsId: 2}]
                            },
                        },
                        },
                    }).then( (record) => {
                        res.json( {record})                        
                    }).catch( (error) => {
                        console.log('hey theres a little error!')
                        throw new Error('nice error!');
                    })      


                    // let newuser = await relationalStrainToUser(parseInt(req.body.id), strainid)                 
                }
            }
        })           
            // let testjson:string = 'testjson'        
        }    
    
    
