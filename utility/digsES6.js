// handle post and fetch data routes for Mine and Reviews.
import Axios from "axios";
import { isConstructorDeclaration } from "typescript";


export default async function digsES6 (endpoint, data, method) {        
        console.log('endpoint from the ES6 class')
        console.log(endpoint)

        class digdata {
            constructor(endpoint) {
                this.endpoint = endpoint;
            }
            //  * NEW DIG POST !!! * * * * * * * * * * * *   GETTER AND SETTER METHODS!  * *
            get newdig() {
                let postdata = this.NewDig()
                return postdata
            }

            async NewDig() {
                return Axios.post(endpoint, {
                   data: {
                       userId: data[0],
                       strain: data[1],
                        method: method
                   }
               }).then( (response) => {
                   return response
               })                
           }
            //  * * * * * * * * * * * * * * *
            
            //  ? * * * * * * * * * * * * * *
            get alldigs() {
                let getdata = this.GETdigs()
                return getdata
            }
            // async GETdigs() { return Axios.get(endpoint) }       // definition errors of no req.body.data
            async GETdigs() {
                return Axios.post(endpoint, {
                   data: {                                               
                        method: method
                   }
               }).then( (response) => {
                    console.log('response from the get .then() block!')
                    console.log(response)
                   return response
               })                
           }
            //  ? * * * * * * * * * * * * * *

            //  * * * * * * * * * * * * * * *
            get deletedig() {
                return this.DeleteDig()
            }

            async DeleteDig() {
                return Axios.post(endpoint, {
                    data: {
                        userId: data[0],
                        strain: data[1],
                        method: method,
                    }
                }).then( (deleteconfirm) => {
                    return deleteconfirm
                })
            }
            //  * * * * * * * * * * * * * * *
        }
        //  get && methods above      |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   |   | class setUps and method invocations below
        
        //  * * * * * * * * * * * * * * *
        if (method === 'POSTnewDIGS') {            
            let POSTdigConfirm = await new digdata(endpoint).newdig
            console.log('POSTdigConfirm')
            console.log(POSTdigConfirm)
            return POSTdigConfirm
        }
        //  * * * * * * * * * * * * * * *
        
        //  ? * * * * * * * * * * * * * *        
        if (method === 'GETallDIGS') {            
            let GETdata = await new digdata(endpoint).alldigs
            console.log('GETdata')
            console.log(GETdata)
            return GETdata
        }
        //  ? * * * * * * * * * * * * * *

        // :) * * * * * * * * * * * * * * * 
        if (method === 'DELETEDIG') {
            let deleteConfirm = await new digdata(endpoint).deletedig
            console.log('deleteConfirm')
            console.log(deleteConfirm)
            return deleteConfirm
        }
        // :) * * * * * * * * * * * * * * * 

}

