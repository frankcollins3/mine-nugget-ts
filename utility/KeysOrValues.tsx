
export default async function ReturnEndpoints(object:object, method:string) {
    // if (typeof object === 'object') 
    let strongstring:string = method.toLowerCase()  // VALUES will work like values
    console.log('strongstring')
    console.log(strongstring)

    if (method === 'keys') return Object.keys(object)
    if (method === 'values') return Object.keys(object)
    if (method ===' all') return [{keys:Object.keys(object), values:Object.values(object)}]

}
