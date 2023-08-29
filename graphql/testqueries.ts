import axios from 'axios'
import {RootState} from 'redux/store/rootReducer'
import {useSelector, useDispatch} from "react-redux"
import {strainsINTERFACE, minersINTERFACE} from "utility/InterfaceTypes"
import { userSignupQueryStringFunc, getMyStrainsStringFunc } from './queries';
import { SET_CURRENT_USER } from 'redux/main/mainSlice';
import { minersOnStrainsINTERFACE } from 'utility/InterfaceTypes';

const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)


// allStrainsGET resolver that returns:                     prisma.strains.findMany()
axios.post('/api/graphql', { query: `query { allStrainsGET { strain, strainid, dominant, funfact, parents, taste, smell, gold, nugget, thc, cbd } }`})
.then((response:any) => {
  // console.log('allstrains', response.data);
  let strains:strainsINTERFACE = response.data
  console.log('strains', strains)
})
.catch((error) => {
  console.error('Error fetching data:', error);
});



// userSignup
        // const queryStr = userSignupQueryStringFunc(`${SIGNUP_USERNAME_INPUT}`, `${SIGNUP_EMAIL_INPUT}`, `${SIGNUP_AGE_INPUT}`, `${SIGNUP_PASSWORD_INPUT}`)
        // export const userSignupQueryStringFunc = (username:string, email:string, age:number, password:string) => {
  const queryStr = userSignupQueryStringFunc("chasethrillz", "cgoode@jodo.com", 30, "chase123")

  axios.post('/api/graphql', {query:`${queryStr}`})
  .then( (userSignup) => {
  console.log('signed up', userSignup)
  let user:minersINTERFACE = userSignup.data.data.userSignup
  console.log('user', user)
  })


  // getMyMinersOnStrains 
  const query = getMyStrainsStringFunc(CURRENT_USER.username)
    // axios.post('/api/graphql', { query: `query { getMyMinersOnStrains(username: "${CURRENT_USER.username}") { minersId, strainsid } }`})
    axios.post('/api/graphql', { query: `${query}` })
        .then( (myStrains:any) => {
            console.log('myStrains before endpoints!', myStrains)
            const myUserStrains:minersOnStrainsINTERFACE = myStrains.data.data.getMyMinersOnStrains
            console.log('myUserStrains', myUserStrains)
        })                                                                                                                