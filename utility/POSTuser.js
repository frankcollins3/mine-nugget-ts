import { Prisma, PrismaClient } from '@prisma/client';
let prisma = new PrismaClient()

export default async function POSTroute (req:any, res:any) {

    let data = req.body.data

    console.log('req.body.data')
    console.log(req.body.data)

    let username = req.body.data.username
    let password = req.body.data.password
    let email = req.body.data.email
    let age;

    console.log(username)
    console.log(password)
    console.log(email)
    console.log(age)

    let numberbucket = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    let stringbucket = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30']

    const loopAndSet = () => {
        stringbucket.forEach( (string) => {
            numberbucket.forEach( (number) => {
                let stringnum:string = number.toString()
                if (number.toString() === string) {
                    age = number
                }
            })
        })
    }

    const userCreate = async () => {
        const createuser = await prisma.users.create({
            data: {
                username: username,
                password: password,
                email: email,
                age: age
            }
        }).then( (newuser:(object|number|string)) => {                    
            console.log('newuser')
            console.log(newuser)
            return newuser
        })
        res.json( { returndata: `this is  my newuser ${createuser}` } )    
    }

    const setAndRes = async () => {
        await loopAndSet()
        await userCreate()
    }
    setAndRes()
        
    // res.json( { returndata: `this is  my newuser ${newuser}` } )    
}

// model users {
//     id        Int      @id @default(autoincrement())
//     username  String?  @db.VarChar(255)
//     password  String?  @db.VarChar(255)
//     age       Int?
//     email     String?  @db.VarChar(255)
//     strains   UsersOnStrains[]  
//   }
