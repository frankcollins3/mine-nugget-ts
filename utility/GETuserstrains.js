import Axios from 'axios'
import { collapseTextChangeRangesAcrossMultipleVersions, createNoSubstitutionTemplateLiteral } from 'typescript'
export default async function GETuserstrains(endpoint, data) {    
    let length = data.length || 'nothing'

    class GETuserstrainsES6 {
        constructor(data) {
            this.endpoint = endpoint
        }
        get alluserstrains() {
            return this.GETuserstrainsALL()
        }
        get specifyuserstrains() {
            return this.GETuserstrainsSPECIFY()
        }
        async GETuserstrainsALL() {
            return Axios.post(endpoint, {
                data: data || 'all'        
            }).then( (getdata) => {
                return getdata
            })
            // return {hey: 'hi'}
        }        
        async GETuserstrainsSPECIFY() {
            if (length === 'nothing') {
                console.log('lenth === nothing {strain: mimosa, userId: 48} ') // {strain: 'mimosa', userId: 48}                
                return Axios.post(endpoint, {
                    // strain: data.strain,
                    // userId: data.userId
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
    }

    // * there will be ALL / specify 1 
    if (endpoint) {
        if (typeof data === 'string') {
            let getUserStrains = await new GETuserstrainsES6(data).alluserstrains            
            console.log('getUserStrains')
            console.log(getUserStrains)
            return getUserStrains
        }
        if (typeof data === 'object') {
            console.log("typeof data === object man!")
            // * {mydata: 'white widow'}  {mydata: ['white widow', 'pineapple express']} // this is how the objects would be set up to specify which getUserStrains data is coming back
            // * i was originally going to use this but I decided the way the state would be handled is by returning all strains and doing ternary rendering based on currentUser
// * this approach means theres only one instance of grabbing the user strains database. and for a user to see other users' saved strains when they search a strain that has other user data associated with it,
// * We don't have to do all those prisma calls or hit all of these routes during this revised approach of global state 1 prisma call 1 global state to handle the bucket of all UserStrainsData
            let specifiedUserStrains = await new GETuserstrainsES6(data).specifyuserstrains
            console.log('specifiedUserStrains')
            console.log(specifiedUserStrains)
            return specifiedUserStrains
        }
    }
}
