export default async function FindIndex(str:any, wheresMyIndex:string) {
    console.log('typeof str')
    console.log(typeof str)

if (typeof str === 'string') {
    let newstr:any = str;
    for (const char in newstr) {
        let stringChar:string = newstr[char]
        if (stringChar === wheresMyIndex) return char
    }
}

if (typeof str === 'object') {
    console.log('str')    
    console.log(str)    
}





}

// The right-hand side of a 'for...in' statement must be of type 'any', an object type or a type parameter, but here has type 'string'.ts(2407)