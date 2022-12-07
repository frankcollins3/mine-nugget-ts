import $ from 'jquery'
import Axios from 'axios'

export default async function POST (url, data) {
// export default async function DataCall (method, url, data) {
// export default async function DataCall (method:string, url:string, data:(string|object|number)) {
    console.log('url in the datacall')
    console.log(url)

    class POSTclass {
        constructor(url) {   
            console.log("lets go in the URLs")     
            this.url = url
        }      
        // method getters
        get postgetter() {
            console.log("i am over here in getAjax")
            return this.xmlcall()
        }
  
        
        // methods 
        async xmlcall() {                    
            console.log("i am over here in the ajaxcalls")
          
            let postobject = {url: url, data: data}
            console.log('postobject')
            console.log(postobject)
            return postobject
    }

}   // ajax call ending 

        if (url && data) {            
            const postcall = await new POSTclass(url).ajax                        
                let dataobject = {returndata: postcall, data: data}
                return dataobject
                                 
}       // function end
}



    // const xhr = new XMLHttpRequest()
    // xhr.open("POST", url, true)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

    // xhr.onreadystatechange = () => {
    //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //         console.log('url')
    //         console.log(url)

    //         console.log('data')
    //         console.log(data)
            
    //         return {url: url, data: data}
    //       }
    // }