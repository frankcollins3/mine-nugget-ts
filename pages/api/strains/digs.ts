import { Prisma, PrismaClient } from '@prisma/client';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
let prisma = new PrismaClient()

export default async function digsROUTE (req, res) {
    
    let body = req.body
    let data = body.data
    console.log('body')
    console.log(body)
    let alldigs = await prisma.digs.findMany()
    console.log('alldigs')
    console.log(alldigs)
    
    let method = data.method ? data.method : ''

    if (method === 'POSTnewDIGS') {
        // let userId = data.userId
        // let strainId = data.strainId
        let userId = data.userId        
        let strainId = data.strainId        

        console.log("POSTnewDIGS in the POST ROUTE!")
        let dataLikesFilter = await alldigs.filter( alldig => alldig.strainId === strainId && alldig.userId === userId)

        console.log('dataLikesFilter')
        console.log(dataLikesFilter)
        
        await prisma.digs.create({
            data: {
                userId: userId,
                strainId: strainId,
                into_it: true                
            }
        }).then(async(newlike) => {
            console.log('hey super duper!')
            await res.json( { newlike })            
            
        }).catch (async(err) => {
            console.log('there is an error')
            await res.json( { error: 'error' })            
        })

        
    } else {
        console.log('there isnt any method so run this code')
        alldigs? res.json( {alldigs} ) : res.json( 'oops' )
    }


}