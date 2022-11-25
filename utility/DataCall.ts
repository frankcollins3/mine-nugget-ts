import $ from 'jquery'
import Axios from 'axios'

export default async function ( method:string, url:string, data:(string|null), dataType:any ) { // thought you could do dataType:string
        //  if (typeof method === 'string') { } this is redundant in TS no?
        if (method === 'axios') {
            $.ajax({
                method: 'get',
                url: url,
                data: 'json'
            }).then( (data) => {            // cant do data:dataType and parse for a user-inputted 'string' or 'object'
                console.log('data')
                console.log(data)
            })
        }
}