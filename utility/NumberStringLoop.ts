import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'

export default async function NumberStringLoop (stringNum:string, sizeOfLoop:number) {
        let i:(number|string) = 0
        let strains = await APIcall('all', null, null)        
        let length:number = strains.length;
        let numberAsString = await Regex(stringNum, 'numreturn')
        if (numberAsString.length <= 2 && numberAsString < length.toString()) {
        for (i; i < sizeOfLoop; i++) {            
            if (i.toString() === stringNum) {
                console.log(`i ${i} string: ${i.toString()} original ${stringNum}`)
                console.log('i')
//  this should be the string value but returned as a number because its just the index.
                console.log(i)
                return i
            }
        })    
        }
}
