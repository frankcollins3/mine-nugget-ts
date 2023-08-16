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

export const addStrainLikeStringFunc = (username: string, strainid: number, into_it: boolean) => {
   // `mutation { addStrainDig(userId: 3, strainid: 2, into_it: true) { userId, strainid, into_it } }`
   const query = `mutation { addStrainDig(username: "${username}", strainid: ${strainid}, into_it: ${into_it}) { userId, strainid, into_it } }`
   return query
}

export const getMyLikesStringFunc = (username:string) => {
   const query = `query {getMyLikes(username: "${username}"), { userId, strainid, into_it } }`
   return query
}
// axios.post('/api/graphql', { query: `query {getMyLikes(username: "${CURRENT_USER.username}"), { userId, strainid, into_it } } `})

export const removeStrainLikeStringFunc = (username: string, strainid: number, into_it: boolean) => {
   const query = `mutation { removeStrainDig(username: "${username}", strainid: ${strainid}, into_it: ${into_it}) { userId, strainid, into_it } }`
   return query
}

export const addMineReviewStringFunc = (username:string, review:string, title:string, strainid: any) => {
   const query = `mutation  { addMineReview(username: "${username}", review: "${review}", title: "${title}", strainid: ${parseInt(strainid)}) { userId, strainid, review, title } }`
   return query
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
