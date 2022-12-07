import $ from 'jquery'
import Axios from 'axios'

export default async function DataCall (method, url, data) {
// export default async function DataCall (method:string, url:string, data:(string|object|number)) {
    console.log('url in the datacall')
    console.log(url)

    class Call {
        constructor(url) {        
            this.url = url
        }      
        // method getters
        get ajax() {
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
            const returnajaxcall = await new Call(url).ajax            
            if (data === null) {
                return returnajaxcall                   
            } else if (data !== null) {                
                let dataobject = {returndata: returnajaxcall, data: data}
                return dataobject
            }                     
            
        } else if (method === 'axios') {            
            const returnaxiosdata = await new Call(url).axios            
            if (data === null) {
                return returnaxiosdata
            } else if (data !== null) {                
                let dataobject = {returndata: returnaxiosdata, data: data}
                return dataobject
            }
        } else if (method === 'fetch') {
            const fetchdata = await new Call(url).fetchit
            if (data === null) {
                return fetchdata                
            } else if (data !== null) {                
                let dataobject = {returndata: fetchdata, data: data}
                return dataobject
            }                    
            // should be good with else { } but just to be stricter  using else if (stated expression) 

        }

}       // function end
