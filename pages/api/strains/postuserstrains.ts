import MasterRegex from 'utility/MasterRegex'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'
const prisma = new PrismaClient()

export default async function (req, res) {
    // export default async function (req:(string|object|number), res:(string|object|number)) {

        let data = req.body.dataname
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

        strains.forEach( (strain) => {
            if (strain.strain === realdata) {
                let id:(string|number) = strain.strainId                
            } else if (realdata === 'GorillaGlue') {
                console.log('strain passed the gorillaglue condition')
                if (strain.strain === 'GorillaGlue#4') {
                    let id:(string|number) = strain.strainId                                        
                }
            } else if (realdata === 'DoSiDos') {
                if (strain.strain === 'Do-Si-Dos') {
                    console.log("we passed the Do-Si-Dos condition!")
                    let id:(string|number) = strain.strainId                    
                }
            }
        })           
            let testjson:string = 'testjson'        
            res.json( {myjson: testjson})
        }    
    
    
