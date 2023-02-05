import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function POSTroute (req:any, res:any) {

    let endpointbody = req.body.data

    let username = endpointbody.username
    // let username = req.body.data.username
    let password = endpointbody.password
    let email = endpointbody.email
    let age = req.body.data.dataage / 1

    // let numberbucket = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    // let stringbucket = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']

    // const loopAndSet = () => {
    //     stringbucket.forEach( (string) => {
    //         numberbucket.forEach( (number) => {
    //             let stringnum:string = number.toString()
    //             if (number.toString() === string && req.body.age) {
    //                 age = number
    //             }
    //         })
    //     })
    // }

        const createuser = await prisma.users.create({
            data: {
                username: username,
                password: password,
                email: email,
                age: age
            }
        }).then( (newuser:any) => { 
            console.log('newuser')
            console.log(newuser)
            let USER = newuser
            res.json( { user: USER } )      
         })
}

// model users {
//     id        Int      @id @default(autoincrement())
//     username  String?  @db.VarChar(255)
//     password  String?  @db.VarChar(255)
//     age       Int?
//     email     String?  @db.VarChar(255)
//     strains   UsersOnStrains[]  
//   }