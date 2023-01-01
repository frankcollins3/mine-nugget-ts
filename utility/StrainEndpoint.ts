// export default async function Endpoint(strain:any, endpoint:string) {
export default async function Endpoint(strain:(object|string), endpoint:string) {
    // considering using a for in loop
    console.log('strain')
    console.log(strain)

    console.log('endpoint')
    console.log(endpoint)
    
    let keys = Object.keys(strain[0])
    keys.forEach( (key:string) => {
        if (key === endpoint) {
            console.log(`they are equal key: ${key} endpoint: ${endpoint}`)
        }
    })

    for (const property in strain) {

    }
    console.log('keys')
    console.log(keys)

    // console.log(`heres what we need: ${strain.endpoint}`)
}