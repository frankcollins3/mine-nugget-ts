import Axios from 'axios'
import Random from './Randomizer'
let allurl = `https://pokeapi.co/api/v2/pokemon/`
let strainurl = `https://frankcollins3.github.io/strainuous/strain.json`

// export default async function APIcall (method:string, pokemon:(string | number | null), stateToChange:any) {
async function APIcall(action:string, strain:(string|number|null), setState:(any|null)) {
    console.log('strain')
    console.log(strain)
    console.log(typeof strain)
  let accessAPI = await Axios({
        method: 'get',
        url: strainurl,
        data: 'json'
    })
    let strains = accessAPI.data.strains
    
    if (action === 'all') {        
        console.log('strains')
        console.log(strains)
        return strains
    }
    else if (action === 'specify' && typeof action === 'string' ) {  // i guess this is redundant? forcing 2nd evaluation of types         
        const specifybucket = new Array()

        const specifyStrain = async () => {
            strains.forEach( (loopstrain:any) => { // cant use strain:object because the goal output is to dig down an endpoint or 2 to the strain.strain (basically .name)                                
                console.log('loopstrain')
                console.log(loopstrain)
                console.log(loopstrain.strainId)
                console.log(typeof loopstrain.strainId)
                
                if (loopstrain.strain === strain || loopstrain.strainId === strain) {                                    
                    console.log("loopstrain id or number equals strain as hoped for")
                    specifybucket.push(loopstrain)
                    // specifybucket.push(loopstrain.strain)
                    return loopstrain
                    setState(strain)
                }
            })
        }
        const checkbucket = () => {            
            return specifybucket
        }
        const pushAndCheckBucket = async () => {
            await specifyStrain()            
            let checkbucket2 = checkbucket()
            return checkbucket2
        }
        return pushAndCheckBucket()    
    }

    else if (action === 'random') {
        let randomstrain = await Random(strains)
        let strainname:string = randomstrain.strain    
        setState(strainname)    
        return strainname
    }
}
export default APIcall

// let pokedata = prepokedata.data.results
//             let friends = ['burger', 'fries', 'shake'];
//             let food: string[] = ['burger', 'fries', 'shakes'];
// let name:string = randompokemon.name
// let randomfood = await Random(food)
// let randompokemon:any = await Random(pokedata)    
// else if (method === 'specify' && pokemon !== null || pokemon !== undefined) {
// stateToChange(name)
// }
// let prepokedata = await Axios.get(allurl)
