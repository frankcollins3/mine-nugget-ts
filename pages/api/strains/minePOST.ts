import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function minePOST (req, res) {

    let data = req.body.data
    let strainId = data.strainId
    let title = data.title
    let review = data.review
    let usersId = data.usersId

    let allmines = await prisma.mines.findMany()
    // const duplicateMap = new Map()
    let duplicatearray:any = []

    let filteredForStrain = allmines.filter( mines => mines.strainId === strainId)
    await filteredForStrain.forEach( (searchStrain:any) => {
        let looptitle:string = searchStrain!.title
        let userId = looptitle.slice(0, looptitle.indexOf('/'))
        if (userId === usersId) duplicatearray.push(userId)
    })

    if (duplicatearray.includes(usersId)) {
        console.log('yeah the array has that value we did it')
        res.json( { body: req.body, msg: 'Already Have A Mine!' })
    } else {
        console.log("there are no duplicates were good to post!")
        const newmine = await prisma.mines.create({
            data: {
                title: title,
                review: review,
                strainId: strainId
            },
        })
        console.log('newmine from the POST route')
        console.log(newmine)
        res.json( { body: req.body, filter: filteredForStrain })
    }
}
