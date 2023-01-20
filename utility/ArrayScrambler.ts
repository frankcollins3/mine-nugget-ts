import Random from 'utility/Randomizer'

export default function Scrambler (array) {
console.log('array')
console.log(array)

let i:number = 0;
let arrLen:number = array.length
let indexArray:(string|number|object)[] = []        // need object because push won't work without it.
let dontuse = new Array()
// let indexArray:(string|number|object)[] = []
const populateArray = () => {
    array.forEach( (indexitem, idx:any) => {
        // if (dontuse.includes(idx)) {
        //     return    
        // } else {
            indexArray.push(idx)
        // }

    })
}
// loop thru array and push the indexes in the array so we have them for reference.

const checkArray = async () => {
const swapindex = async () => {
    for (i; i < array.length; i++) {
        let randomIndex = await Random(indexArray)
        array[randomIndex] = array[i]
    }
}
const check = () => {
    console.log('array down here')
    console.log(array)
    return array
}
const asyncwaitfunc = async () => {
    await populateArray()
    await swapindex()
    return check()

}
}
return checkArray()

}