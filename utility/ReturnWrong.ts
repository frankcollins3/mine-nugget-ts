import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

export default async function ReturnWrong (parents:string) {
        let stringbucket:string[] = []
        let strains:(object|string|any) = await APIcall('all', null, null)  
        // the any in this case because the forEach on strains.forEach() returns doesn't exist for property of obj
        // let strains:(object|string) = await APIcall('all', null, null) property for each doesn't exist on obj

        
    

        await strains.forEach( (strain:string|object|any) => {        
            // i don't know why (string|object) isn't good enough to access endpoints. why need the any?
            console.log(strain)
            let parentsLoop:string = strain.parents 
            if (parentsLoop === parents) {      // parents in this case the func-params
                return 
            } else {
                stringbucket.push(strain.name)
            }
        }) 



        // strain.      name, parents, funfact, taste, smell, nug, 
        let randomWrongString = await Random(stringbucket)
        console.log('randomWrongString')
        console.log(randomWrongString)

        return randomWrongString
}