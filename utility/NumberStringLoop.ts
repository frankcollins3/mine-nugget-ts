import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'

export default async function NumberStringLoop (stringNum:string, sizeOfLoop:number) {

        let i:(number|string) = 0
        let strains = await APIcall('all', null, null)        

        let length:number = strains.length;
        let stringAsNumber = await Regex(stringNum, 'numreturn')
        if (stringAsNumber.length <= 2 && stringAsNumber < length.toString()) {
        for (i; i < sizeOfLoop; i++) {      
            console.log('i this is the easy part')      
            // console.log(i)    
            console.log(`${i.toString()} ${typeof i.toString()}`)    
            // console.log(typeof i)
            console.log(stringNum)
            console.log(typeof stringNum)
            console.log(parseInt(stringNum))
            if (i === parseInt(stringNum)) {
            // if (i.toString() == stringNum) {
                console.log(`i ${i} string: ${i.toString()} original ${stringNum}`)
                console.log('i')
//  this should be the string value but returned as a number because its just the index.
                return i
            }
        }  
        }
}
