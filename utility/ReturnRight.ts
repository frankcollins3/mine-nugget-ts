    import APIcall from 'utility/APIcall'
    export default async function ReturnRight (parents:string) {
        console.log('parents')
        console.log(parents)
        let allstrain = await APIcall('all', null, null) 
        // let allstrain:(object|string) = await APIcall('all', null, null) 
        allstrain.forEach( (strain) => {
        // allstrain.forEach( (strain:(object|string)) => {
            console.log('strain')
            console.log(strain)        
            console.log(strain.parents)        
            if (strain.parents.includes(parents)) {
                console.log("it includes parents alright!")
                console.log(`strainparents: ${strain.parents} parents: ${parents}`)
                console.log(`${strain}`)
                return strain
            }
            // let parents:(object|string) = strain.parents
        })
        

        
    }