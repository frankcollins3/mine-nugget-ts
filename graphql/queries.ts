   // axios.post('/api/graphql', { query: `query { allStrainsGET { strain, strainid, dominant, funfact, parents, taste, smell, gold, nugget, thc, cbd } }`})

export const allMinersGETquery = `query { allMinersGET { username, password, email, age } }`
export const allStrainsGETquery = `query { allStrainsGET { strain, strainid, dominant, funfact, parents, taste, smell, gold, nugget, thc, cbd } }`
export const allMinersOnStrainsQuery = `query { allMinersOnStrains { minersId, strainsid } }`

export const addMinersOnStrainsQueryStringFunc = (minersId: number, strainsid: number) => {
   const query = `
      mutation { addMinersOnStrains(minersId: ${minersId}, strainsid: ${strainsid}) {
              minersId,
              strainsid
            } 
         }
   `
   return query
}

export const userSignupQueryStringFunc = (username:string, email:string, age:any, password:string) => {
   const query = `
      mutation { userSignup(username: "${username}", email: "${email}", age: ${parseInt(age)}, password: "${password}" ) { 
      username,
      password,
      email,
      age
   } 
  }
  `
  return query
}


export const userLoginQueryStringFunc = (email:string, password:string) => {
   const query = `
   query { userLogin(email: "${email}", password: "${password}") {
           id,
           username,
           password,
           age,
           email,
           token             
         } 
      }
     `
   return query
}

export const getUserWithIdStringFunc = (id:number|string) => {
   const query = `query { getUserWithId(id: ${id}) { username, password, email, age, } }`
   return query
}

export const getMyStrainsStringFunc = (username:string) => {
   const query = `query { getMyMinersOnStrains(username: "${username}") { minersId, strainsid } }`;
   return query;
}



// axios.post('/api/graphql', { 
//    query: 
//    `
//    mutation { addMinersOnStrains(minersId: 1, strainsid: 1) {
//        minersId,
//        strainsid
//          } 
//    }
//    `
// }).then( (savedStrain) => {
//    console.log('savedStrain', savedStrain)
// })
