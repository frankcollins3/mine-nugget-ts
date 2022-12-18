export default async function StringInt (StringOrInt:(number|string), method:(string|null)) {
    if (method === 'parseInt' && typeof StringOrInt === 'string') {
        console.log("hey we are in here")
        let Int:number = parseInt(StringOrInt)
        return Int
    }
    if (method === 'toString' && typeof StringOrInt === 'number') {
        let String:string = StringOrInt.toString()
         return String
     }
 
    if (method === null || method === undefined) {
        if (typeof StringOrInt === 'string') {
            let Int:number = parseInt(StringOrInt)
            return Int
        }
        if (typeof StringOrInt === 'number') {
            let String:string = StringOrInt.toString()
            return String
        }
    }
}
