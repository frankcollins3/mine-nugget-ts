import Random from 'utility/Randomizer'

export default function Scrambler (array) {
console.log('array')
console.log(array)

let i:number = 0;
let arrLen:number = array.length
let indexArray:(string|number|object)[] = []        // need object because push won't work without it.
let indexLen:number = indexArray.length
let dontuse = new Array()
let dontuseLen:number = dontuse.length

const populateArray = () => {
    array.forEach( (indexitem, idx:any) => {        
            indexArray.push(idx)        
    })
}
// loop thru array and push the indexes in the array so we have them for reference.

const checkArray = async () => {
const swapindex = async () => {
    for (i; i < array.length; i++) {

        const checkdontuse = (array) => {
            for (i; i < array.length; i++) {
                for (i; i < dontuseLen; i++) {
                    if (array[i] === dontuse[i]) {
                        continue
                    } else {
                        return array[i]
                    }
                }
            }
        }
        let randomIndex = indexArray.filter(checkdontuse)        

        console.log('randomIndex')
        console.log(randomIndex)
        // let randomIndex = indexArray.filter(async(idx) => !dontuse.includes(idx) ? )        
        // let randomIndex = await Random(indexArray)        
        
        // array[randomIndex] = array[i]

    }
    
    // kind of crazy that this works. i had to test that: let arr = [1, 2, 3, 4, 5] arr[0] = 0... arr = [0, 2, 3, 4, 5]        
}
const check = () => {    
    return array
}
const asyncwaitfunc = async () => {
    await populateArray()
    await swapindex()
    return check()
}
return asyncwaitfunc()

}
return checkArray()

}
