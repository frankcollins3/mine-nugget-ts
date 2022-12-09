import Regex from 'utility/MasterRegex'
export default async function NumberStringLoop (stringNum:string, sizeOfLoop:number) {
        let i:number = 0
        let numberAsString = await Regex(stringNum, 'numreturn')

        if (numberAsString.length <= 2) {
        for (i; i < sizeOfLoop; i++) {
            // if 
        })    
        // if (numberAsString.length <= 2 || numberAsString.length <= 3) {
            
        }

        console.log('stringNum')
        console.log(stringNum)
        console.log(sizeOfLoop)

}