// @ts-nocheck
import Axios from 'axios'
export default async function ERROR (errorobj:(object|string), errorState, setErrorState) {                                
        if (errorobj) {     // also saying if (typof errorobj === 'object || string')            
            let errorstatus:string = errobj.response.status              
            return errorstatus
        }
}
