// @ts-nocheck
import Axios from 'axios'
export default async function ERROR (url, errorobj, errorState, setErrorState) {                                
        try {
          let test = await Axios.get(url)
          return 'this works'
        } 
        catch(err:unknown) {      
          let errorstatus:string = err.response.status              
          return errorstatus
        }
}
