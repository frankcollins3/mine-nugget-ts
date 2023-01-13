import Axios from 'axios'
import $ from 'jquery'
import Regex from 'utility/MasterRegex'

export default async function GET (url, data) {
    
    class GETclass {
        constructor(url) {               
            this.url = url
        }      
        // method getters
        get getgetter() {            
            console.log("over here in the getgetter")
            return this.axiosGet()
        }
        
        
        // methods 
        async axiosGet() {                   
            let strainfetch = await Axios.get(url)
            console.log('strainfetch in the axiosget() method')
            console.log(strainfetch)
            return strainfetch
        }  
}  

        if (url) {    
            console.log("atleast were in the url")        
            const es6get = await new GETclass(url).getgetter
            console.log('es6get')
            console.log(es6get)
            return es6get                                             
    }
}

