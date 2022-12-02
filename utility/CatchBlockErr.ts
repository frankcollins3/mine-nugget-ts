// @ts-nocheck
import Axios from 'axios'
export default async function ERROR (url) {
                            // * also do error state, setError

    // try {
    //     let getdata = await Axios.get(url)
    // }
    // catch(err:unknown) {
    //     let status:string = err.response.status
    // }
    const testError = async () => {
        try {
          // let testfetch = await Axios.get('https://pokeapi.co/api/v2/pokemon')        
          let test = await Axios.get('hi')
          // console.log('testfetch')
          // console.log(testfetch)
        } 
        catch(err:unknown) {      
          let errorstatus:string = err.response.status      
        

        }
      }
}