import Axios from 'axios'
import Random from './Randomizer'
let allurl = `https://pokeapi.co/api/v2/pokemon/`
let strainurl = `https://frankcollins3.github.io/strainuous/strain.json`

// export default async function APIcall (method:string, pokemon:(string | number | null), stateToChange:any) {
async function APIcall(action:string, strain:(string|null), setState:(any|null)) {

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
        console.log(strain)
        console.log(typeof strain)

        strains.forEach( (loopstrain:any) => { // cant use strain:object because the goal output is to dig down an endpoint or 2 to the strain.strain (basically .name)
            console.log('strain')
                        
            // let randomStrain:any = Random(strains) 
            // specifying a type of any because ill be handling this array of objects (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
            //  by accessing string data, and will get an error changing from object to string even if were just accessing a string-data endpoint within object
            if (loopstrain.strain === strain) {                
                console.log('strain we have looped and met our function argument ')
                console.log(strain)
                setState(strain)
            }
           
        })
    }

    else if (action === 'random') {
        let randomstrain = await Random(strains)
        let strainname:string = randomstrain.strain
        console.log('strainname')
        console.log(strainname)
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

