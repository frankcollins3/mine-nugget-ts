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
    ajaxcall() {
            console.log('url in the ajaxcall method')
            console.log(url)
            let hi = {hey: 'hi'} 

            const getdata = async () => {
                let ajaxCallForStrain = $.ajax({
                    method: 'get',
                    url: url,
                    data: 'json'
                }).then( (data) => {
                    return data
                })
            }
            let returndata = await getdata()
            console.log('returndata')
            console.log(returndata)
            


            // const ajaxCall = () => {
            //     $.ajax({
            //     // let ajax = $.ajax({
            //         method: 'get',
            //         url: url,
            //         data: 'json',
            //         // success: (ajaxdata) => {
            //         //     console.log('ajaxdata')
            //         //     console.log(ajaxdata)
            //         //     return ajaxdata
            //     }).then( (data) => {
            //         let data = data.getdata
            //         console.log('data')
            //         console.log(data)
            //         return data        
            //     })            
            // }
            // return ajaxCall()
            
    }
}   // ajax call ending 

        if (method === 'ajax') {
            console.log("we are over here doing it this way")
            const returnajaxcall = new Call(url).ajax
            console.log('returnajaxcall')
            console.log(returnajaxcall)
            // console.log(returnajaxcall.responseJSON)
            // let actualdata = returnajaxcall.responseJSON.getdata
            // console.log('actualdata')
            // console.log(actualdata)
        }




}       // function end