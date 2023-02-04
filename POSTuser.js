import Axios from 'axios'
import {useGame} from 'Contexts/game'

export default async function POSTuser (API, data) {
    const UserMap = new Map() 
    let datausername = await UserMap.set('username', API.username)
    let datapassword = await UserMap.set('password', API.password)
    let dataemail = await UserMap.set('email', API.email)
    let dataage = await UserMap.set('age', API.age)
    
    class POSTuserES6 {
        constructor(API) {
            this.API = API
        }
        // setter methods: 
        get newuser() {
            return this.newuserpost()
        }
        async newuserpost() {
            let myfetch = await Axios.post(API, {
                data: {
                    username: datausername,
                    password: datapassword,
                    email: dataemail,
                    dataage: dataage,
                }
            })            
            console.log('smyfetch')
            console.log(myfetch)

        }
    }
    try {
        if (typeof API === 'string') {
            let serverToClientConfirm = await new POSTuserES6(API).newuser
            return serverToClientConfirm
        } 
        // else {return}
//  I believe i don't want a return statement in here because this will execute return upon the if statement not being validated, triggering else block to be the default, effectively ever avoiding catch block init
    
    }
    catch (err) {
        // let errString = err.errorMsg
        //  hypotheticalGlobalErrorStatePush(errString)
        // trigger the error component (instead of redirect upon error, just a pop up and dismissible error acknowledging and bypassing the error) 
        // ternary render error component clientside

        // error component.
        // * for the error page:
        // * use useGame() global state to create error out of the returned error object
    }

}