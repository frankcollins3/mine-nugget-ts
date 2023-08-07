import axios from 'axios'

export default async function GoldRequestQL(query:string) {   // instead of options:object which won't give viability to accessing object endpoints.
    // export default async function GoldRequestQL(url:object, args:) {   // instead of options:object which won't give viability to accessing object endpoints.

    // I would make a token to check for users but I want a non logged in user to be able to see the strain UI which wouldn't allow user to see strain UI
    let APIgraphQL = '/api/graphql'

    const fetchQL = await axios.post(`${APIgraphQL}`, { query: `${query}`})

    if (fetchQL.status === 200) {
        return fetchQL
    } else {
        return fetchQL.status
    }

    
    // axios.post('/api/graphql', { query: `${allMinersGETquery}`})
    // .then( (allusers) => {
    //     console.log('allusers', allusers)
    // })
    
    
    // const API = "http://localhost:5000/"
          // get the code from local storage via the key UWU_TOKEN
        //   const userToken = localStorage.getItem('WAPPTOKEN');
            //  const userToken = "H20TOKEN"
        
          // send the google_id as a custom header
    
        //   const headers = {
        //     ...options.headers,
        //     'Content-Type': 'application/json',
        //     'X-WAPP-User': userToken,
        //   };
        
        //   const response = await fetch(`${url}`, { ...options, headers });
        //   console.log('response')
        //   console.log(response)
        
        //   if (response.status === 401){
        //     return "401"
        //   }
    
        //   const contentType = response.headers.get('Content-Type');
        
        //   if (contentType && contentType.includes('application/json')) {
        //     return response.json();
        //   }

            // return response.json();
        
            // return "H 2 0"
        }