    import APIcall from 'utility/APIcall'
    export default async function ReturnRight (parents:string) {
        let allstrain = await APIcall('all', null, null)  // let allstrain:(object|string) = await APIcall('all', null, null) 
        console.log('parents in the ReturnRight')
        console.log(parents)


    
        let parentarray:(string)[] = []
        // let parentarray:any = []
        const loopandpush = () => {
            allstrain.forEach( (strain) => {
            // allstrain.forEach( (strain:(object|string)) => {        
                if (strain.parents === parents) {                            
                    parentarray.push(strain.strain)
                } else {
                    console.log('nope')                    
                }
            })
        }
        await loopandpush()
        console.log(`parentarray: ${parentarray} type: ${typeof parentarray[0]}`)
        return parentarray[0]
        
        // const returnvalue = async () => {
        //     await loopandpush()
        //     return parentarray[0]
        // }
        // return returnvalue()
    }
            // return parentarray
            // let parents:(object|string) = strain.parents        
