import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()
export default async function GETspecifyuser(req, res) {
    console.log("get specify user route!")
    console.log('req.body')
    console.log(req.body)

    let username:string = req.body.username
    let password:string = req.body.password

    const findUser = await prisma.users.findFirst({
        where: {
            username: username
        }
    }).then( (user) => {
        console.log('user in the username')
        console.log(user)
    })

    res.json({ body: req.body, test: 'hey man'})


}