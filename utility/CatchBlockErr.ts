// @ts-nocheck
import Axios from 'axios'
import $ from 'jquery'
import AttrTool from 'utility/JqAttr'
let url = '/error'


export default async function ERROR (errorobj, setErrorState) {                                
// export default async function ERROR (url, errorobj, errorState, setErrorState)
        if (errorobj) {     // also saying if (typof errorobj === 'object || string')            
            let errorstatus:string = errorobj.response.status              
            setErrorState(errorstatus)
        location.replace(url) || location.attr('href','/error')        
        // location.replace(url) || location.attr('href','/error')        
        AttrTool(location, href, url)
        } else {
            return ''
        }
}