export default async function IntStringCount (n:number) {
let i:number = 0;
let stringbucket:string[] = []
    const loop = () => {
        while (i < n) {
            let numberstring:string = i.toString()
            stringbucket.push(numberstring)
        }
    }
    const returnbucket = () => {
        return stringbucket
    }
    const loopAndReturn = async () => {
        await loop()
        return returnbucket()
    }
    return loopAndReturn()
}