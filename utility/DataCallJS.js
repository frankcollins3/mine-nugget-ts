import $ from 'jquery'
import Axios from 'axios'

// export default async function DataCall ( method:string, url:string, data:(string|null)) { 
//     const ajaxCall = async () => {
//         if (method === 'ajax') {
//             let ajax = $.ajax({
//                 method: 'get',
//                 url: url,
//                 data: 'json',
//                 success: (ajaxdata) => {
//                     console.log('ajaxdata')
//                     console.log(ajaxdata)
//                     return ajaxdata
//                 }
//             })
//             return ajax
//         }
//     }
//         return ajaxCall()

//         if (method === 'axios') {

//         }    

//         }

export default async function DataCall (method, url, data) {
    console.log('url')
    console.log(url)

    class Call {

        constructor(url) {        
            this.url = url
        }      
    // method getters
    get ajax() {
        console.log("we are over here")
        return this.ajaxcall()
    }

    // methods 
    async ajaxcall() {
            console.log('url in the ajaxcall method')
            console.log(url)
            let hi = {hey: 'hi'} 

            let datacall = await $.ajax({
                method: 'get',
                url: url,
                data: 'json'
            })

            console.log('datacall')
            console.log(datacall)
            let actualdata = datacall.getdata            
            return actualdata    
    }
}   // ajax call ending 

        if (method === 'ajax') {
            console.log("we are over here doing it this way")
            const returnajaxcall = await new Call(url).ajax
            return returnajaxcall
            console.log('returnajaxcall')
            console.log(returnajaxcall)
            
        }




}       // function end
