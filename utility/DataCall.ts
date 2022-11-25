import $ from 'jquery'
import Axios from 'axios'

export default async function DataCall ( method:string, url:string, data:(string|null)) { 
    const ajaxCall = async () => {
        if (method === 'ajax') {
            let ajax = $.ajax({
                method: 'get',
                url: url,
                data: 'json',
                success: (ajaxdata) => {
                    console.log('ajaxdata')
                    console.log(ajaxdata)
                    return ajaxdata
                }
            })
            return ajax
        }
    }
        return ajaxCall()

        if (method === 'axios') {

        }    

        }
