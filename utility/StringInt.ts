export default async function StringInt (StringOrInt:(number|string), method:any) {
    if (method === 'parseInt' && typeof StringOrInt === 'string') {
        console.log("hey we are in here")
        let Int:number = parseInt(StringOrInt)
        return Int
    }
    if (method === 'toString' && typeof StringOrInt === 'number') {
        let String:string = StringOrInt.toString()
        return String
    }
}
