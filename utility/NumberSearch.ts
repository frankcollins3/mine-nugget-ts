import APIcall from 'utility/APIcall'

export default async function NumberSearch (num) {
// export default async function NumberSearch (num:string|number|any) {
    let strains = await APIcall('all', null, null)
    let number;
    let i:number = 0;
    let strainbucket = new Array()
    console.log('num in the utility function')
    console.log(num)
    if (typeof num === 'string') number = parseInt(num)
    if (num > 6) number = 6
    // if (number === 1) {
        
    //     return strains[0]
    // }
    // if (number === 2) {
    //     return [strains[0], strains[1]]
    // }
    // if (number === 3) {
    //     return [strains[0], strains[1], strains[2]]
    // }
    // if (number === 4) {
    //     return [strains[0], strains[1], strains[2], strains[3]]
    // }
    // if (number === 5) {
    //     return [strains[0], strains[1], strains[2], strains[3], strains[4]]
    // }
    // if (number === 6) {
    //     return [strains[0], strains[1], strains[2], strains[3], strains[4], strains[5]]
    // }
    // if (number === 7) {
    //     return [strains[0], strains[1], strains[2], strains[3], strains[4], strains[5], strains[6]]
    // }    
    const loopandpush = () => {
        while (i < number) {
            let incrementstrain = strains[i]
            console.log('incrementstrain')
            console.log(incrementstrain)
            strainbucket.push(incrementstrain)
            i++
        }
    }
    const checkAndReturn = async () => {
        console.log('strainbucket in the checkAndReturn function')
        console.log(strainbucket)
        return strainbucket
    }
    const bothfunctions = async () => {
        console.log('both functions function')
        await loopandpush() 
        return checkAndReturn()
    }
    return bothfunctions()
}
