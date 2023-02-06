import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
    // hmm also just realized you could follow that same one prisma call ideaology twice.
    //  I was going to have 2 different res.json here: 1 for the 'all' && 1 for 'specify' singular strain or array of specified 
    
    // in case of [ req.body.data !== 'all' ] My plan to specify data: send over req.body.data --------> body.data === {strain: 'white widow'} || body.data === ['widow', 'wedcake', 'GG4', 'ogkush']

    const Prisma = new PrismaClient()
    let body = req.body
    console.log(req.body)

    // let alluserStrains = Prisma.usersOnStrains.findMany()    // 1 data call up here for both conditions below to share as a root database store? 

    if (req.body.data === 'all') {    
        let alluserStrains = await Prisma.usersOnStrains.findMany()
        res.json( { body: req.body, userStrains: alluserStrains})
        // res.json( { body: req.body, hey: 'hi'})
    }

    // if (typeof req.body.data === 'object') {
    // }
    // {strain: 'white widow'} || ['white widow', 'pineapple express', 'GorillaGlue#4'] both of these would validate the condition as [typeof object] leaving 'all' excluded as [typeof string]

}
