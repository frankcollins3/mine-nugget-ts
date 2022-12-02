import Axios from 'axios'
export default async function ERROR (errorobj:(object|string), errorState, setErrorState) {                                
        if (errorobj) {     // also saying if (typeof errorobj === 'object || string')            
            let errorstatus:string = err.response.status              
            return errorstatus
        }
}
