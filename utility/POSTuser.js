import Axios from 'axios'
import {useGame} from 'Contexts/game'

export default async function POSTuserCLASS (API, data) {
    const UserMap = new Map() 
    let datausername = await UserMap.set('username', API.username)
    let datapassword = await UserMap.set('password', API.password)
    let dataemail = await UserMap.set('email', API.email)
    let dataage = await UserMap.set('age', API.age)

    // console.log('API from ES6')
    // console.log(API)

    // console.log('data')
    // console.log(data)
    console.log('API')
    console.log(API)

    console.log('data')
    console.log(data)

    
    class POSTuserES6 {
        constructor(API) {
            this.API = API;
        }
        // setter methods: 
        get newuser() {
            return this.newuserpost()
        }
        async newuserpost() {
            try {
                let myfetch = await Axios.post(API, {
                    data: {
                        username: datausername,
                        password: datapassword,
                        email: dataemail,
                        dataage: dataage,
                    }
                })            
                console.log('myfetch')
                console.log(myfetch)
                return myfetch
            }
            catch (err) {
                // error component triggeering.
            }

        }
    }
    // try {
        if (typeof API === 'string') {
            let serverToClientConfirm = await new POSTuserES6(API).newuser
            console.log('serverToClientConfirm')
            console.log(serverToClientConfirm)
            
            return serverToClientConfirm
        } 
        // else {return}
//  I believe i don't want a return statement in here because this will execute return upon the if statement not being validated, triggering else block to be the default, effectively ever avoiding catch block init
    
    // }


}