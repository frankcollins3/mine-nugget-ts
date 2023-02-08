import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()
import bcrypt from 'bcryptjs'

export default async function GETspecifyuser(req, res) {
    console.log("get specify user route!")
    console.log('req.body')
    console.log(req.body)

    let username:string = req.body.username
    let password:string = req.body.password
    
    const findUser:any = await prisma.users.findFirst({
        where: {
            username: username,            
        }
    }).then( (user) => {
        return user
    }).catch( () => {
        return []
    })

    console.log('findUser returned success!')
    console.log(findUser)
    console.log(findUser.username)
    
    let findUserpassword = findUser.password
    
    
    let bcryptresult = await bcrypt
    .compare(password, findUserpassword)
    .then(res => {
        return res ? true : false // this looks weird at first.
    })

    res.json({ user: bcryptresult === true && findUser.username ? findUser : []})
    
    // bcrypt.compare(plaintextPassword, hash, function(err, result) {
    //         if (result) {
    //            // password is valid
    //        }
    //     });





}
