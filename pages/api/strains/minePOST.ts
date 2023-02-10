import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function minePOST (req, res) {

    console.log('req.body')
    console.log(req.body)

    let data = req.body.data
    let strainId = data.strainId
    let title = data.title
    let review = data.review

    console.log('data from the post route')
    console.log(data)

    console.log('title')
    console.log(title)

    console.log('review')
    console.log(review)

    const user = await prisma.mines.create({
        data: {
          title: title,
          review: review,
          strainId: strainId
        },
      })




    res.json( { body: req.body, hey: 'hi'})
}