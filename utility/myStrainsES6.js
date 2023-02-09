import Axios from 'axios';

export default async function myStrainsES6 (endpoint, data) {
    console.log('endpoint from ES6')
    console.log(endpoint)

    console.log('data from ES6')
    console.log(data)


    // let usersId = await data.get('usersId')
    // console.log('usersId')
    // console.log(usersId)

    class myStrains {
        constructor(endpoint) {
            this.endpoint = endpoint
        }
        get mystrains () {
            return this.myStrainsGET()
        }
        async myStrainsGET() {
            return Axios.post(endpoint, {
                data: {
                    usersId: data                    
                }
            }).then( (response) => {
                console.log('response')
                console.log(response)
                return response
            })
        }
    }
    if (endpoint) {
        let allMyUsers = await new myStrains(endpoint).mystrains
        console.log('allMyUsers')
        console.log(allMyUsers)        
        return allMyUsers
    }
    
    // endpoint & (
    //     let allMyUsers = new myStrainsES6(endpoint).mystrains
    //   )

    // {trueState & (               saw code likt this && didn't know if it would work for variable/es6 logic. instead of the if statement above.
    //     <div> </div>
    //   )}

}