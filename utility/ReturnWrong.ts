 import { useSWRHandler } from 'swr/dist/use-swr'
import APIcall from 'utility/APIcall'
import Random from 'utility/Randomizer'

export default async function ReturnWrong (parents:string, dontuse:string|string[]) {        
        let stringbucket:any[] = []   // redundant to enforce string? quite enforced elsewhere, func-params, forEach...

        // let stringbucket:string[] = []
        let strains:(object|string|any) = await APIcall('all', null, null)  
        // the any in this case because the forEach on strains.forEach() returns doesn't exist for property of obj
        // let strains:(object|string) = await APIcall('all', null, null) property for each doesn't exist on obj

        const loopandpush = async () => {

            await strains.forEach(async(strain:string|object|any) => {        
                // i don't know why (string|object) isn't good enough to access endpoints. why need the any?
                
                let parentsLoop:string|object|any = strain.parents 
                            
                if (parentsLoop === parents || parentsLoop === dontuse) {      // parents in this case the func-params
                    console.log(`IF BLOCK! this is the right parents ${strain.parents} for ${strain.strain}`)
                    return 
                } else {                    
                    if (dontuse.includes(strain.strain)) {
                        let newstrain = await Random(strains)
                        let name:string = newstrain.strain
                        if (strain.strain === 'pineapple express') {
                            stringbucket.push('pineapple') 
                        }
                        else if (strain.strain === 'wedding cake') {
                            stringbucket.push('wed cake')
                        }
                        else if (strain.strain === 'GorillaGlue#4') {
                            stringbucket.push('GG#4')
                        }
                        else if (strain.strain === 'Do-Si-Dos') {
                            stringbucket.push('DoSiDos')
                        }
                        else if (strain.strain === 'White Widow') {
                            stringbucket.push('Wh.Widow')
                        }                        
                        else { stringbucket.push(name)}
                        
                    } else { 
                        if (strain.strain === 'pineapple express') {
                            stringbucket.push('pineapple') 
                        }
                        else if (strain.strain === 'wedding cake') {
                            stringbucket.push('wed cake')
                        }
                        else if (strain.strain === 'GorillaGlue#4') {
                            stringbucket.push('GG#4')
                        }
                        else if (strain.strain === 'Do-Si-Dos') {
                            stringbucket.push('DoSiDos')
                        }
                        else if (strain.strain === 'White Widow') {
                            stringbucket.push('Wh.Widow')
                        }
                         else { stringbucket.push(strain.strain)}
                    }                                                 
                }
            }) 
        }
        // strain.      name, parents, funfact, taste, smell, nug, 
        const randomAsync = async () => {             
            let randomWrongString = await Random(stringbucket)            
            return randomWrongString
        }
        const doubleAsync = async () => {
            await loopandpush() 
            return  randomAsync()
        }
        return doubleAsync()
}
