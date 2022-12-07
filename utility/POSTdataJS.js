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
            const xhr = await new XMLHttpRequest();  
            let myrequest = await xhr.open('POST', url, true);           
            console.log('myrequest')
            console.log(myrequest)

            let response = await xhr.responseText
            console.log('response')
            console.log(response)
            // xhr.onreadystatechange = () => { // Call a function when the state changes.                
                // if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if (xhr.status === 200) {
                    console.log("im right here you heard")
                    console.log(xhr)
                    console.log(xhr.response)
                    return xhr.response
 
                }
            // }
            let postobject = {url: url, data: data, hello: 'hi'}
            // this is sending the url but sending [object object for the postobject] 
            xhr.send(url);
 
            
    }

}   // ajax call ending 

        if (url && data) {            
            const postcall = await new POSTclass(url).postgetter  
            console.log('postcall')                     
            console.log(postcall)                     
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
