
export default async function ReturnEndpoints(object:object, method:string) {
    // if (typeof object === 'object') 
    let strongstring:string = method.toLowerCase()  // VALUES will work like values
    if (method === 'keys') return Object.keys(object)
    if (method === 'values') return Object.values(object)
    if (method === 'all') return [{keys:Object.keys(object), values:Object.values(object)}]
}
