import Axios from 'axios'
import $ from 'jquery'
import Regex from 'utility/MasterRegex'

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
            console.log('data')
            console.log(data)
            let id = await  Regex(data, 'numreturn')
            console.log('id')
            console.log(id)
            // let strainId:number = await Regex(data, 'numReturn')

            // Axios.post({
                
            // })
            // const xhr = await new XMLHttpRequest();  
            // await xhr.open('POST', url, true);                   
            // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            // let response = await xhr.responseText            
            // xhr.onreadystatechange = () => { // Call a function when the state changes.                
                // if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // if (xhr.status === 200) {            
                    // return xhr.response            
                    // }
            // }
            // let postobject = {url: url, data: data}
            // xhr.send(postobject);             


            
            
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
