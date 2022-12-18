export default async function StringInt (StringOrInt:(number|string), method:any) {
    if (method === 'parseInt' && typeof StringOrInt === 'string') {
        console.log("hey we are in here")
        let Int:number = parseInt(StringOrInt)
        return Int
    }

}