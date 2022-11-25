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
    
    get axios() {
        return this.axioscall()
    }

    // methods 
    async ajaxcall() {            
            // let hi = {hey: 'hi'} this was a minimum-viable test that steered things correctly
            let datacall = await $.ajax({
                method: 'get',
                url: url,
                data: 'json'
            })            
            let actualdata = datacall.getdata            
            return actualdata    
    }

    async axioscall() {
        let datacall = await Axios.get(url)
        console.log('datacall in the axios')
        console.log(datacall)
        let data = datacall.data
        return data
    }

}   // ajax call ending 

        if (method === 'ajax') {
            console.log("we are over here doing it this way")
            const returnajaxcall = await new Call(url).ajax
            return returnajaxcall                        
        } else if (method === 'axios') {
            const returnaxiosdata = await new Call(url).axios
            return returnaxiosdata
        }

}       // function end
