import MasterRegex from 'utility/MasterRegex'
import { PrismaClient } from '@prisma/client';
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'
const prisma = new PrismaClient()

export default async function (req, res) {
    // export default async function (req:(string|object|number), res:(string|object|number)) {
        // let body:string = req.body
        
        // console.log(req.body)
        // conosle.log(JSON.stringify())
        // let parse = JSON.parse(JSON.stringify(req.body))
        // let parse = JSON.parse(req.body) 
        console.log("body: %j", req.body)

        let data = req.body.dataname
        let realdata = await Regex(data, 'alphareturn')
        console.log('data')
        console.log(data)
        console.log('realdata')
        console.log(realdata)
        // this works just make conditional logic

        let strains = await prisma.strains.findMany()
        let apistrains = await APIcall('all', null, null)

        apistrains.forEach( (strain) => {

            if (strain.strain === realdata) {
                console.log('strain finally!')
                console.log(strain)
            } else if (realdata === 'GorillaGlue') {
                console.log('strain passed the condition')
                if (strain.strain === 'GorillaGlue#4') {
                    console.log('strain condition')
                    console.log(strain)
                }
            }
        })

        // strains.forEach( (strain) => {
        //     if (strain.strain === realdata) {
        //         console.log('strain in the DB!')
        //         console.log(strian.taste)
        //         console.log(strain.funfact)
        //     }
        // })
        // let dbstrainlist = await prisma.strains.findMany()

        // const result = await prisma.strains.findUnique({
        //     where: { id: parseInt(req.body.id) },
            // * ******************** MIGHT HAVE TO ACCESS Strain id from other side
            // select: {
            //   name: true,
            //   profileViews: true,
            // },
        //   })
        //   console.log('result')
        //   console.log(result)

            // await prisma.strains.findUnique({
            //     where: {
            //         strain: data
            //     }
            // }).then( (data) => {
            //     console.log('found match')
            //     console.log(data)
            // }).catch( (error) => {
            //     console.log('error')
            //     console.log(error)
            // })

        // strains.forEach( (strain:string) => {
            // strains.forEach(async(strain:(string|number|object)) => {
            //     let cleanstrain = await Regex(data, 'whiteout')
            //     let reqbodyclean = await Regex(data, 'whiteout')                
                // if (strain.strain.replace(/\s/g, '') == req.body.dataname.replace(/\s/g, '')) {                    
                // }
            // })
             
           
            let testjson:string = 'testjson'        
            res.json( {myjson: testjson})
        }    
    
    
