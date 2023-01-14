import Axios from 'axios'
import $ from 'jquery'
import Regex from 'utility/MasterRegex'
import APIcall from 'utility/APIcall'

export default async function GET (url, data) {
    
    class GETclass {
        constructor(url) {               
            this.url = url,
            this.data = data
        }      
        // method getters
        get getgetter() {            
            console.log("over here in the getgetter")
            return this.axiosGet()
        }
        
        
        // methods 
        async axiosGet() {  
            if (url.length === 40) {
                let strainfetch = await Axios.get(url)
                console.log('strainfetch in the axiosget() method')
                console.log(strainfetch)
                return strainfetch
            }         
            if (url.length === 71) {
                $.ajax({
                    method: 'get',
                    data: {
                        strain: data
                    }
                }).then( (ajaxdata) => {
                    console.log('ajaxdata')
                    console.log(ajaxdata)
                    return ajaxdata
                })
            }        

        }  
}  

        if (url) {    
            if (url.length === 40) {
                console.log("atleast were in the url")        
                const es6get = await new GETclass(url).getgetter
                console.log('es6get')
                console.log(es6get)
                return es6get                                             
            }
            if (url.length === 71)  {
                const get = await new GETclass(url).getgetter
                console.log('get in .length === 71')
                console.log(get)
                
            }

    }
}

