    import APIcall from 'utility/APIcall'
    export default async function ReturnRight (parents:string) {
        type miniany = string | number | object
        
        let allstrain = await APIcall('all', null, null)         
        type arraystring = string | any;
    
        let parentarray:string[] = []        
        const loopandpush = () => {
            allstrain.forEach( (strain) => {                
                if (strain.parents === parents) {                            
                    parentarray.push(strain.strain)
                } else {
                    // continue
                }
            })
        }
        await loopandpush()
        return parentarray[0]            
    }            
