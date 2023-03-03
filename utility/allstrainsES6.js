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
                    let fetchstrains = await Axios.get(url)               
                    console.log('fetchstrains')
                    console.log(fetchstrains)
                    return fetchstrains
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
                         })
                }

            }
            if (method === 'getALL') {
                let allstrains = await new allstrainsES6(url).allstrains;
                console.log(allstrains)
                return allstrains
            }
            if (method === 'postALL') {
                let allstrains = await new allstrainsES6(url).postallstrains;
                console.log(allstrains)
                return allstrains
            }
}