import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import FindMineFooter from "components/Footer/FindMineFooter"
import ConeContainer from "components/FindMineComponents/ConeContainer"
import NoFeedContainer from "components/FindMineComponents/NoFeedContainer"
import FeedContainer from "components/FindMineComponents/FeedContainer"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import {TOGGLE_SHOW_FEED, SET_CURRENT_USER_STRAINS, TOGGLE_DONT_RUN_USER_STRAINS_EFFECT_PROMISE} from "redux/findMine/findMineSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { allMinersGETquery, } from "graphql/queries"
import { getCookie, nothing, ReturnUrl } from "utility/utilityValues"

import { minersOnStrainsINTERFACE } from "utility/InterfaceTypes"

export default function FindMine(props: any) {

    console.log('props', props)

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
        dispatch(SET_CURRENT_PAGE("/findmine"))
        // this below cookieFunc() gave great difficulty in trying to modularize it in Contexts/Promises.tsx. It ultimately was the most consistent like this which was discovered in ./familytree.tsx
        // const cookieFunc = async () => {
            //     const cookie = await getCookie()
            //     console.log('cookie', cookie)
            //     if (cookie[0] && cookie[1]) {                
                //         let id
                //         id = cookie[0].length > cookie[1].length ? cookie[1].replace(/\D+/g, '') : cookie[0].replace(/\D+/g, '')
    //         console.log('id', id)
    //         if (id) {                
        //             const query = getUserWithIdStringFunc(id)
        //             return axios.post('/api/graphql', {query:`${query}`})
        //             .then( (userWithId:any) => {
            //                 console.log('userWithId', userWithId)
            //                 userWithId = userWithId.data.data.getUserWithId
            //                 dispatch(SET_CURRENT_USER(userWithId))                
            //             })
            //         } 
            //     } else { return }
            //   }
            //   cookieFunc()
            cookieFunc()
            .then(async(currentuser) => {
                console.log('currentuser then block', currentuser)
                // await setAllUserStrainsPROMISE()
                // await setCurrentUserStrainsPROMISE(CURRENT_USER.username)
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
        ? <p> ShowFeed Please </p>
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
            <img style={{ cursor: 'pointer', height: '200px', width: '200px' }} className="hover" onClick={hoverForMyUserStrains} src={vest}/>
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
  
      if (!allUsers) {
        throw new Error('Failed to fetch data from the GraphQL endpoint');
      }
  
      const data = await allUsers.json();
      allUsers = data.data.allMinersGET;
    
  
      return {
        props: {
          allUsers,
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