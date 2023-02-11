// handle post and fetch data routes for Mine and Reviews.
import Axios from "axios";
import { isConstructorDeclaration } from "typescript";


export default async function digsES6 (endpoint, data, method) {        
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
                        // userId: data.get('userId'),
                        // strainId: data.get('strainId'),
                        method: method
                   }
               }).then( (response) => {
                   return response
               })                
           }
            //  * * * * * * * * * * * * * * *
            
            //  ? * * * * * * * * * * * * * *
            get alldigs() {
                let alldigdata = this.AllDigs()
                return alldigdata
            }
            async AllDigs() {
                let alldigs = await Axios.get(endpoint)
                return alldigs
            }            
            //  ? * * * * * * * * * * * * * *
        }
        
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
            let GETdigsToClient = await new digdata(endpoint).alldigs
            console.log('GETdigsToClient')
            console.log(GETdigsToClient)
            return GETdigsToClients
        }
        //  ? * * * * * * * * * * * * * *

}

