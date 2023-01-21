import APIcall from 'utility/APIcall'
import Scrambler from 'utility/ArrayScrambler'

export default async function NumberSearch (num) {
// export default async function NumberSearch (num:string|number|any) {
    let strains = await APIcall('all', null, null)
    let scrambled = await Scrambler(strains)
    console.log('scrambled in NumberSearch')
    console.log(scrambled)


    let number;
    let i:number = 0;
    let strainbucket = new Array()    
    if (typeof num === 'string') number = parseInt(num)
    if (num > 6) number = 7

    const loopandpush = () => {
        while (i < number) {
            let incrementstrain = scrambled[i]      
            console.log('incrementstrain')     
            console.log(incrementstrain)     
            strainbucket.push(incrementstrain)
            i++
        }
    }
    const checkAndReturn = async () => {
        return strainbucket
    }
    const bothfunctions = async () => {        
        await loopandpush() 
        return checkAndReturn()
    }
    return bothfunctions()
}
