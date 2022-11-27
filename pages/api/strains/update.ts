import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export default async function update (req:any, res:any) {              // res:string doesn't work
    // console.log('we are hitting the update route')
    // console.log('req')
    // console.log(req)

    let dbstrains = await prisma.strains.findMany()
    
    //   await prisma.strains.update({
    //     where: {
    //       strain: '...',
    //     },
    //     data: {
    //       strain: '',
    //     },
    //     orderBy: [
    //         {
    //             strainId: 'asc'
    //         }
    //     ]
    //   })

    dbstrains.forEach( (data:string|object) => {
        console.log('data in the dbstrains foreach')
        console.log(data)
    })

   



function reducecount(strainArray:string|object[] = []) {            // array:string fails need [str|obj]
    console.log("we are in the reduce count function")  
    return dbstrains.reduce( (countWords:any, word:any) => {
        countWords[word] = ++countWords[word] || 1;

        console.log('countWords')
        console.log(countWords)

        console.log('word')
        console.log(word)
        
        return countWords;
    }, {});
}
reducecount(dbstrains)




    // console.log(strains)
    res.json(  {watsup: 'hi'}  )
}
