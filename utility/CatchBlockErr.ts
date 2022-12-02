// @ts-nocheck
import Axios from 'axios'
export default async function ERROR (url, errorobj, errorState, setErrorState) {
                            // * also do error state, setError    
    const testError = async (url:string) => {
        try {
          let test = await Axios.get(url)
        } 
        catch(err:unknown) {      
          let errorstatus:string = err.response.status              
          return errorstatus
        }
      }
}
