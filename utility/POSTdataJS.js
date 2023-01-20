import Axios from 'axios'
import $ from 'jquery'
import Regex from 'utility/MasterRegex'

export default async function POST (url, data) {
    // * the URL is the '/api/strains.. the data is the [straindata += userdata] (just have to make data in global and )



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
            let dataname = await Regex(data, 'alphareturn')         
            console.log('dataname')       
            console.log(dataname)       
            let id = await Regex(data, 'numreturn')
      
           return  Axios.post(url, {
                dataname: dataname,
                id: id
              })
              .then(function (response) {
                console.log(response);
                return response
              })
              .catch(function (error) {
                console.log(error);
              });            
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
