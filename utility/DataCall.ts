import $ from 'jquery'
import Axios from 'axios'

export default async function DataCall ( method:string, url:string, data:(string|null)) { 
        if (method === 'ajax') {
            $.ajax({
                method: 'get',
                url: url,
                data: 'json',
                success: (ajaxdata) => {
                    return ajaxdata
                }
            })
        }

        if (method === 'axios') {

        }    

        }

    
    
    
    // cant do data:dataType and parse for a user-inputted 'string' or 'object'
// export default async function AjaxCall(url:string, data:(string|null), error:(any|null)) {
//     let ajaxCall = await $.ajax({
//         method: 'get',
//         url: url,
//         data: 'json'
//     })
//     return ajaxCall
// }
