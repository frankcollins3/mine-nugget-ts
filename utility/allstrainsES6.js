import Axios from 'axios';
import $ from 'jquery';

export default async function allstrainsES6func (url, method) {
 
            class allstrainsES6 {
                constructor(url) {
                    this.url = url
                }
                get allstrains () {
                    return this.GETallstrains();
                }
                
                async GETallstrains() {
                    // let fetchstrains = await Axios.get(url)               
                    let fetchstrains = await $.ajax({
                        method: 'post',
                        url: '/api/strains/strain',
                        data: {
                        key: 'all'
                        }
                    }).then( (msg) => {
                        console.log('msg we are in the .then() statement')
                        console.log(msg)      
                        return msg
                     })              
                    console.log('fetchstrains')
                    console.log(fetchstrains)
                    return fetchstrains.getdata
                }
                // * * * * * * * * * * * * * * * * * * * * * * * * * * * 
                
                get postallstrains() {
                    return this.POSTallstrains();
                }
                async POSTallstrains() {
                        $.ajax({
                            method: 'post',
                            url: '/api/strains/allStrain',
                            data: {
                            key: 'all'
                            }
                        }).then( (msg) => {
                            console.log('msg we are in the .then() statement')
                            console.log(msg)      
                         }).catch( (err) => {
                            console.log('err we are in the error!')
                            console.log(err)
                         })
                }

            }
            if (method === 'getALL') {
                let getstrains = await new allstrainsES6(url).allstrains;
                console.log(getstrains)
                return getstrains
            }
            if (method === 'postALL') {
                let allstrains = await new allstrainsES6(url).postallstrains;
                console.log(allstrains)
                return allstrains
            }
}
