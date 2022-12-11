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

                const newstrain = await prisma.UsersOnStrains.create({
                    data: {
                      usersId: newNumber,
                      strainsId: strainid,
                    },
                    include: {
                        users: true,
                        strains: true
                    }
                }).then(async(data) => {
                    console.log('data success for post route!')
                    console.log(data)
                }).catch( (error) => {
                    console.log('error')
                    console.log(error)
                })

                //   usersId | strainsId | assignedAt | assignedBy
          //   }).then(async(data:object|string|numbers) => {

                res.json( {number: newNumber, id: strainid} )
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
    
    
