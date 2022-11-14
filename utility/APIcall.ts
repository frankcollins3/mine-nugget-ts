import Axios from 'axios'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import Random from './Randomizer'
let allurl = `https://pokeapi.co/api/v2/pokemon/`

export default async function APIcall (method:string, pokemon:(string | number | null), stateToChange:any) {

    if (typeof method === 'string') {
        console.log('we are here in the API function')
        if (method === 'all') {
            console.log('typescript style baby!')
            let prepokedata = await Axios.get(allurl)
            let pokedata = prepokedata.data.results
            // return pokedata

            let friends = ['burger', 'fries', 'shake'];
            let food: string[] = ['burger', 'fries', 'shakes'];
            
            let randomfood = await Random(food)
            let randompokemon:object = await Random(pokedata)
            console.log('randompokemon')
            console.log(randompokemon)
            let name:any = randompokemon.name
            // if randompokemon:object 

            stateToChange()
            
        }
        else if (method === 'specify' && pokemon !== null || pokemon !== undefined) {
            
        }
    }
}