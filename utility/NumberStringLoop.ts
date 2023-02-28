import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'

export default async function NumberStringLoop (stringNum:string, sizeOfLoop:number) {    
        let i:(number|string) = 0
        let strains = await APIcall('all', null, null)        

        let length:number = strains.length;
        let stringAsNumber = await Regex(stringNum, 'numreturn')
        if (stringAsNumber.length <= 2 && stringAsNumber < length.toString()) {
        for (i; i < sizeOfLoop; i++) {                  
            if (i === parseInt(stringNum)) {            
                return i
            }
        }  
        }
}
