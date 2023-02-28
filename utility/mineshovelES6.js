// handle post and fetch data routes for Mine and Reviews.
import Axios from "axios";
import { isConstructorDeclaration } from "typescript";


export default async function mineshovelES6 (endpoint, data, method) {
        console.log('endpoint')
        console.log(endpoint)

        console.log('data from the mineshovelES6')
        console.log(data)



        class MineShovel {
            constructor(endpoint) {
                this.endpoint = endpoint;
            }
            get postmine() {
                let postdata = this.postMine()
                return postdata
            }

            async postMine() {
                return Axios.post(endpoint, {
                   data: {
                       strainId: data.strainId,
                       review: data.review,
                       title: data.title,
                       usersId: data.usersId
                   }
               }).then( (response) => {
                   return response
               })                
           }
            //  * * * * * * * * * * * * * * *


            get allminesforallusers() {
                let allusermines = this.allUsersMines()
                return allusermines
            }

            async allUsersMines() {
                let allMinesForAllUsers = await Axios.get(`${endpoint}`)
                return allMinesForAllUsers
            }
            //  ? * * * * * * * * * * * * * *

            get deleteall() {
                let deleteall = this.deleteAllMines()
                return deleteall
            }

            async deleteAllMines() {
                return Axios.post(endpoint, {
                    data: {
                        delete: 'all'
                    }
                }).then( (response) => {return response})
            }
            //  * * * * * * * * * * * * * * *

            get deleteone() {
                let deleteone = this.deleteOneMine() 
                return deleteone
            }

            async deleteOneMine() {
                console.log('data in the async method!')
                data = data[0]
                return Axios.post(endpoint, {
                    data: {
                        delete: 'one',
                        strainId: data.strainId,
                        usersId: data.usersId,
                        review: data.review
                    }
                }).then( (response) => {
                    return response
                })
            }
            //  ? * * * * * * * * * * * * * *
        }

        if (method === 'minePOST') {
            let minePOSTfromES6 = await new MineShovel(endpoint).postmine            
            return minePOSTfromES6
        }
        if (method === 'GETallmines') {
            let allMinesallUsersES6 = await new MineShovel(endpoint).allminesforallusers
            return allMinesallUsersES6            
        }
        if (method === 'DELETEALL') {
            let deleteAllMines = await new MineShovel(endpoint).deleteall
            console.log('deleteAllMines')
            console.log(deleteAllMines)
            return deleteAllMines
        }
        if (method === 'DELETEone') {
            let deleteOneMine = await new MineShovel(endpoint).deleteone
            console.log('deleteOneMine')
            console.log(deleteOneMine)
            return deleteOneMine         
        }
}

// mine_nugget_dev=# SELECT* FROM mines;
//  id | strainId | review | title
// ----+----------+--------+-------
// (0 rows)

// mine_nugget_dev=#