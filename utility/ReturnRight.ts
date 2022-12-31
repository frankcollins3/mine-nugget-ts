    import APIcall from 'utility/APIcall'
    export default async function ReturnRight (parents:string) {
        let allstrain = await APIcall('all', null, null)  // let allstrain:(object|string) = await APIcall('all', null, null) 
        console.log('parents')
        console.log(parents)
    
        let parentarray:(string|object)[] = []
        // let parentarray:any = []
        const loopandpush = () => {
            allstrain.forEach( (strain) => {
            // allstrain.forEach( (strain:(object|string)) => {
        
                if (strain.parents === parents) {
        
                    console.log("it includes parents alright!")
                    console.log(`strainparents: ${strain.parents} parents: ${parents}`)
                    console.log(strain)
                    // return strain
                    parentarray.push(strain)
                } else {
                    console.log('nope')
                    // return
                    // console.log("it doesn't include those parents")
                    // console.log('parents')
                    // console.log(parents)
                }
            })
        }
        
        const returnvalue = async () => {
            await loopandpush()
            return parentarray
        }
        return returnvalue()
    }
            // return parentarray
            // let parents:(object|string) = strain.parents        
