import Axios from 'axios'
import Regex from 'utility/MasterRegex'

export default async function GETuserstrains(endpoint, data) {    
    console.log(`endpoint ${endpoint}`)

    // let precheck = data.replace(/^ID*$/g, '')
    // let IDcheck = precheck.slice(3, precheck.length)
    let IDcheck = typeof data === 'string' ? data.slice(5, data.length) : ''
    let paramcheck = typeof data === 'string' ? data.slice(0, 5) : ''

    let length = typeof data === 'string' ? data.length || 'nothing' : 'something'

    console.log('data from the GETuserstrains')
    console.log(data)

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

        get allusersnostrains() {
            return this.onlyAllUsers()
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
        async usersStrainsStrainID() {
            return Axios.post(endpoint, {
                id: data
            }).then( (response) => {
                console.log('response')
                console.log(response)
                return response
            })
        }

        async onlyAllUsers() {
            return Axios.get(endpoint)
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
            if (data === 'onlyusers') {
                let allusers = await new GETuserstrainsES6(data).allusersnostrains
                console.log('allusers from the return')
                console.log(allusers)
                return allusers
            }

        }        
        if (typeof data === 'object') {            
            let specifiedUserStrains = await new GETuserstrainsES6(data).specifyuserstrains            
            return specifiedUserStrains
        }    
        if (typeof data === 'number') {
            console.log("we  met our number condition")
            let usernamesFromStrainId = await new GETuserstrainsES6(data).usernamesforid
            console.log('usernamesFromStrainId')
            console.log(usernamesFromStrainId)
            return usernamesFromStrainId            
        }    

    }
}
