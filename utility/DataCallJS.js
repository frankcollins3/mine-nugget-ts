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

    get fetchit() {
        return this.fetchcall()
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

    async fetchcall() {
        let predata = await fetch(url)
        let actualdata = await predata.json()
        return actualdata
        

    }

}   // ajax call ending 

        if (method === 'ajax') {
            console.log("we are over here doing it this way")
            const returnajaxcall = await new Call(url).ajax
            return returnajaxcall                        
        } else if (method === 'axios') {
            const returnaxiosdata = await new Call(url).axios
            return returnaxiosdata
        } else if (method === 'fetch') {
            const fetchdata = await new Call(url).fetchit
            return fetchdata
            // should be good with else { } but just to be stricter  using else if (stated expression) 

        }

}       // function end
