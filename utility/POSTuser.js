import Axios from 'axios'
import {useGame} from 'Contexts/game'

export default async function POSTuserCLASS (API, data) {
    const UserMap = new Map() 
     await UserMap.set('username', data.username)
     await UserMap.set('password', data.password)
     await UserMap.set('email', data.email)
     await UserMap.set('age', data.age)

     let datausername = await UserMap.get('username')
     let datapassword = await UserMap.get('password')
     let dataemail = await UserMap.get('email')
     let dataage = data.age

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
                return Axios.post(API, {                
                    data: {
                        username: datausername,
                        password: datapassword,
                        email: dataemail,
                        dataage: dataage,
                    }
                }).then( (response) => {    
                    return response.data
                })                        
            }
            catch (err) {
                console.log('huge error')
                return err
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
