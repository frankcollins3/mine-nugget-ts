import APIcall from 'utility/APIcall'


export default function FirstLetter (char:string) {
    let lowerchar:string = char.toLowerCase()
    let namebucket:string[] = []

    if (char) {
        const firstLetterLoop = async () => {
            let allstrains = await APIcall('all', null, null)
            allstrains.forEach( (strain:any) => {
            // allstrains.forEach( (strain:(string|object)) => {
                let strainName:string = strain.strain
                let firstLetter = strainName.slice(0, 1)
                let lowerLetter:string = firstLetter.toLowerCase()
                console.log(firstLetter)
                if (lowerLetter === lowerchar) {
                    console.log(`firstLetter ${firstLetter} char ${char}`)
                    namebucket.push(strainName)
                }
            })
        }
        const returnBucket = () => {
            return namebucket
        }
        const doubleUP = async () => {
            await firstLetterLoop
            await returnBucket
        }
        doubleUP()
    } else return
}
