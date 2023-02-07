import Axios from 'axios'
import Regex from 'utility/MasterRegex'

export default async function GETuserstrains(endpoint, data) {    
    console.log(`endpoint ${endpoint}`)

    // let precheck = data.replace(/^ID*$/g, '')
    // let IDcheck = precheck.slice(3, precheck.length)
    let IDcheck = data.slice(5, data.length)
    let paramcheck = data.slice(0, 5)

    let length = data.length || 'nothing'

    class GETuserstrainsES6 {
        constructor(data) {
            this.endpoint = endpoint
        }
        // * getters that invoke the methods and return the return value within that method.
        get alluserstrains() {
            return this.GETuserstrainsALL()
        }
        get specifyuserstrains() {
            return this.GETuserstrainsSPECIFY()
        }
        get getidwithname() {
            return this.getIDwithNAME()
        }
        get usernamesforid() {
            return this.usersStrainsStrainID()
        }

        async GETuserstrainsALL() {
            return Axios.post(endpoint, {
                data: data || 'all'        
            }).then( (getdata) => {
                return getdata
            })            
        }        
        async GETuserstrainsSPECIFY() {
            if (length === 'nothing') {
                console.log('lenth === nothing {strain: mimosa, userId: 48} ') // {strain: 'mimosa', userId: 48}                
                return Axios.post(endpoint, {                    
                    data: {
                        strain: data.strain,
                        userId: data.userId,
                        length: length
                    }
                }).then( (returndata) => {                    
                    return returndata
                })
            }
            if (length) {
                console.log("length condition met in the ES6 class")
                return Axios.post(endpoint, {
                    data: {
                        data: data,
                        length: length
                    }         
                }).then( (returndata) => {
                    return returndata
                })
            }
        }

        async getIDwithNAME () {
           return  Axios.post(endpoint, {
                name: IDcheck
            }).then( (response) => {
                console.log('response')
                console.log(response)
                return response 
            })
        }
        async usersStrainsStrainId() {
            return Axios.post(endpoint, {
                id: data
            }).then( (response) => {
                console.log('response')
                console.log(response)
                return response
            })
        }

    }

    // * there will be ALL / specify 1 
    if (endpoint) {
        if (typeof data === 'string'){
            if (data === 'all') {
                let getUserStrains = await new GETuserstrainsES6(data).alluserstrains                        
                return getUserStrains
            }
            if (paramcheck === 'getID') {
                console.log("meeting that condition")
                let getIdWithName = await new GETuserstrainsES6(data).getidwithname
                console.log('getIdWithName')
                console.log(getIdWithName)
                return getIdWithName
            }

        }        
        if (typeof data === 'object') {            
            let specifiedUserStrains = await new GETuserstrainsES6(data).specifyuserstrains            
            return specifiedUserStrains
        }    
        if (typeof data === 'number') {
            console.log("we  met our number condition")
            let usernamesFromStrainId = await new GETuserstrainsES6(data).usernamesforid
            return usernamesFromStrainId            
        }    
    }
}
// * {mydata: 'white widow'}  {mydata: ['white widow', 'pineapple express']} // this is how the objects would be set up to specify which getUserStrains data is coming back
// * i was originally going to use this but I decided the way the state would be handled is by returning all strains and doing ternary rendering based on currentUser
// * this approach means theres only one instance of grabbing the user strains database. and for a user to see other users' saved strains when they search a strain that has other user data associated with it,
// * We don't have to do all those prisma calls or hit all of these routes during this revised approach of global state 1 prisma call 1 global state to handle the bucket of all UserStrainsData
