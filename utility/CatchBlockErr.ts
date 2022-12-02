// @ts-nocheck
import Axios from 'axios'
export default async function ERROR (errorobj, errorState, setErrorState) {                                
        if (errorobj) {     // also saying if (typof errorobj === 'object || string')            
            let errorstatus:string = errorobj.response.status              
            return errorstatus
        }
}
