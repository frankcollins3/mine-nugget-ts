import {useEffect, useState} from "react"
import axios from 'axios'
import $ from 'jquery'

// components and styles
import Container from "react-bootstrap/Container"
import FindMineFooter from "components/Footer/FindMineFooter"
import ConeContainer from "components/FindMineComponents/ConeContainer"
import NoFeedContainer from "components/FindMineComponents/NoFeedContainer"
import FeedContainer from "components/FindMineComponents/FeedContainer"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_PAGE, SET_CURRENT_USER } from "redux/main/mainSlice"
import { TOGGLE_SHOW_FEED, SET_CURRENT_USER_STRAINS, TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE } from "redux/findMine/findMineSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import {  allMinersOnStrainsQuery, allMinersGETquery, allLikesGETquery, allReviewsGETquery } from "graphql/queries"
import { getCookie, nothing, ReturnUrl, ThrowErrIfNoData } from "utility/utilityValues"

import { minersOnStrainsINTERFACE } from "utility/InterfaceTypes"

export default function FindMine(props: any) {

    // console.log('props in the pages/FindMine', props)

    const { setCurrentUserStrainsPROMISE, setAllUserStrainsPROMISE, cookieFunc } = usePromise()
    const [contHovered, setContHovered] = useState(false)
    const dispatch = useDispatch()


    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const TRIGGER_USER_STRAINS_EFFECT = useSelector( (state:RootState) => state.findMine.TRIGGER_USER_STRAINS_EFFECT)

    const ALL_USER_STRAINS = useSelector( (state:RootState) => state.findMine.ALL_USER_STRAINS)
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const DONT_RUN_USER_STRAINS_EFFECT_PROMISE = useSelector( (state:RootState) => state.findMine.DONT_RUN_USER_STRAINS_EFFECT_PROMISE)
    
    useEffect( () => {
        // tampering with deployment! ! ! 
        setTimeout( () => {
            console.log("timeout click function firing!")
            $('#vest').click()
        }, 2000)
        // tampering with deployment! ! ! 
        
        dispatch(SET_CURRENT_PAGE("/findmine"))
            cookieFunc()
            .then(async(currentuser) => {
                console.log('currentuser then block', currentuser)
                console.log('currentuser', currentuser)
            
                dispatch(SET_CURRENT_USER({ id: currentuser.id, age: currentuser.age, email: currentuser.email, icon: currentuser.icon, password: currentuser.password, username: currentuser.username, wins: currentuser.wins}))

            })
    }, [])

    useEffect( () => {
        console.log("TOGGLE USER STRAINS EFFECT!!!!!")        
        // Promise.all([setCurrentUserStrainsPROMISE(CURRENT_USER.username), setAllUserStrainsPROMISE()])              
        if (DONT_RUN_USER_STRAINS_EFFECT_PROMISE) {
            return 
        } else {
            setCurrentUserStrainsPROMISE(CURRENT_USER.username)
                dispatch(TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE())
        }
    }, [TRIGGER_USER_STRAINS_EFFECT])
    
    const classCombine = ["Main", "Main-Find-Mine"].join(" ")
    const {ilink, welink, pickaxe, goldcursor2, vest} = useImage()


    const test = async () => {
        // Promise.all([setCurrentUserStrainsPROMISE(CURRENT_USER.username), setAllUserStrainsPROMISE()])                        

        const allMinersOnStrainsFetch = await fetch('/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: `query { allMinersOnStrains { minersId, strainsid } }` }),
          });
      
          if (!allMinersOnStrainsFetch) {
            throw new Error('Failed to fetch data from the GraphQL endpoint');
          }
      
          const data = await allMinersOnStrainsFetch.json();
          const allUserStrains = data.data.allMinersOnStrains;
    }
    
    const stateTest = () => {
        console.log(CURRENT_USER_STRAINS)
        console.log(ALL_USER_STRAINS)
    }

    const hoverForMyUserStrains = () => {
        console.log("oh its false here we go!")
        setCurrentUserStrainsPROMISE(CURRENT_USER.username)
        setContHovered(true)
    }


    return (
        <>

    {
        CURRENT_USER_STRAINS.length > 1 
                ?
                <>
    <Container style={{ cursor: `url('${goldcursor2}'), auto` }} className={classCombine}>    

    <ConeContainer/>
    {
        SHOW_FEED
        ? <FeedContainer 
        allUsers={props.allUsers} 
        allStrainsForAllUsers={props.allStrainsForAllUsers} 
        allLikesFromAllUsers={props.allLikesFromAllUsers} 
        allReviewsFromAllUsers={props.allReviewsFromAllUsers} 
        />
        : <NoFeedContainer/>
    }
    {/* <p style={{ opacity: '0' }}> im a ghost </p> */}
    </Container>

    <Container className="Footer">
        <FindMineFooter/>
    </Container>
            </>
             :
            <Container > 
            <img id="vest" style={{ cursor: 'pointer', height: '200px', width: '200px' }} className="hover" onClick={hoverForMyUserStrains} src={vest}/>
            {/* <Container onMouseEnter={contHovered ? nothing : hoverForMyUserStrains}>  */}
            </Container>            
    }
        </>
    )
}

function RENDER() {
    const {signUpSigns} = useImage()

    return (
        <>
        <Container>            
    <img style={{ height: '25px', width: '25px', marginTop: '1.25em'}} src={signUpSigns}/>
        </Container>

    <pre> test </pre>
    <pre> test </pre>
        </>    
    )
}

// export async function getServerSideProps() {
    // Promise.all([setCurrentUserStrainsPROMISE(CURRENT_USER.username), setAllUserStrainsPROMISE()])                              

    // axios.post('/api/graphql', { query: `${allMinersOnStrainsQuery}`})
    //     .then( (allUserStrains:any) => {
    //         allUserStrains = allUserStrains.data.data.allMinersOnStrains
            // dispatch(SET_ALL_USER_STRAINS(allUserStrains))     
        // })        

// }

export async function getServerSideProps(context:any) {
    
    let url:any = await ReturnUrl(context);  

    try {
      let allUsers = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `${allMinersGETquery}` }),
        // body: JSON.stringify({ query: `query { allMinersOnStrains { minersId, strainsid } }` }),
      });

      let allStrainsForAllUsers = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: `${allMinersOnStrainsQuery}` })
      })

      let allLikesFromAllUsers = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: `${allLikesGETquery}` })
      })

      let allReviewsFromAllUsers = await fetch(`${url}/api/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: `${allReviewsGETquery}` })
      })
  
Promise.all([
    ThrowErrIfNoData(allUsers, 'allUsers'), ThrowErrIfNoData(allStrainsForAllUsers, 'allStrainsForAllUsers'), 
    ThrowErrIfNoData(allLikesFromAllUsers, 'allLikesFromAllUsers'), ThrowErrIfNoData(allReviewsFromAllUsers, 'allReviewFromallUsers')
])
  
      const predataUsers = await allUsers.json();
      allUsers = predataUsers.data.allMinersGET;

      const predataUserStrains = await allStrainsForAllUsers.json()
      allStrainsForAllUsers = predataUserStrains.data.allMinersOnStrains

      const predataLikes = await allLikesFromAllUsers.json()
      allLikesFromAllUsers = predataLikes.data.getAllLikes


      const predataReviews = await allReviewsFromAllUsers.json()
      allReviewsFromAllUsers = predataReviews.data.getAllReviews
      
      return {
        props: {
          allUsers, allStrainsForAllUsers, allLikesFromAllUsers, allReviewsFromAllUsers, 
        },
      };
    } catch (error) {
        return {
            props: { 
                error
            }
        }
    }
  }
