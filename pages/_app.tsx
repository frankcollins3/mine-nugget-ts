// @ts-nocheck
import '../styles/globals.css'
  import type { AppProps } from 'next/app'
  import Head from "next/head";
  import React, { useState, useContext, useEffect, createContext } from 'react'
  import 'bootstrap/dist/css/bootstrap.css'
  import styled from 'styled-components'
  import Axios from 'axios';
  import ERROR from 'utility/CatchBlockErr'
  import Link from 'next/link'
  import StateStore from 'hooks/store'
  import error from' components/error'

  // import { ThemeProvider, ColorModeProvider } from "@chakra-ui/react"
  // import { ChakraProvider } from '@chakra-ui/react'
  import store from 'redux/store'
  import {Provider} from 'react-redux';
  import { GameProvider } from 'Contexts/game'
  import { useRouter } from 'next/router'
  import NavBar from 'components/NavBar'
  


  
 export default function App({ Component, pageProps, context }: AppProps) {

  // i posted an issue before finding this as a solution. I wanted to delete index.tsx but didn't know how to handle auto renavigate
   const router = useRouter()
   if (typeof window !== 'undefined') {
     router.push('/strain')
   }

  useEffect( () => {
  
  }, [])
    // const {store, props} = wrapper.useWrappedStore()
    
    // const {  pageProps } = wrapper.useWrappedStore(rest);

    const [appCurrentUser, setAppCurrentUser] = useState([])
    const [appCurrentUserName, setAppCurrentUserName] = useState('')
    
// * index.tsx 
  //  const [ pokemon, setPokemon ] = useState('')
   const [currentStrain, setCurrentStrain] = useState('')
   const [savedStrains, setSavedStrains] = useState('')
   const [users, setUsers] = useState([])
   const [dbStrains, setDbStrains] = useState([])

   const [contextParents, setContextParents] = useState('')
   const [contextParents1, setContextParents1] = useState('')
   const [contextParents2, setContextParents2] = useState('')
   const [isInPlay, setIsInPlay] = useState('')
   const [winStreak, setWinStreak] = useState(0)
   const [guessCount, setGuessCount] = useState(0)
   
   const contextparentarray = [contextParents, setContextParents]
   const contextparent1array = [contextParents1, setContextParents1]
   const contextparent2array = [contextParents2, setContextParents2]
   const inplayarray = [isInPlay, setIsInPlay]
   const winstreakarray = [winStreak, setWinStreak]
   const guessarray = [guessCount, setGuessCount]

   //  * strain.tsx global state
  const [clickedStrain, setClickedStrain] = useState()
  const [bgToggle, setBgToggle] = useState('new')
  const [textState, setTextState] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [styleFile, setStyleFile] = useState('')
  const [nothing, setNothing] = useState()
  const [apiLen, setApiLen] = useState(0)
  const [strainSave, setStrainSave] = useState(false)
  const [keyState, setKeyState] = useState([])
  const [valueState, setValueState] = useState([])
  const [fetchLock, setFetchLock] = useState(false)

  // * error.tsx global state
 //  const [currentStrain, setCurrentStrain ] = useState('')
 const [url, setUrl] = useState('')    // url:string
 const [allStrains, setAllStrains] = useState([])
 const [error, setError] = useState()
 const [errAcknowledge, setErrAcknowledge] = useState('')


  // const [theme, setTheme] = useState(themes.dark)      this is for context in the example.
  
  const [state, setState] = useState()

    let indexObj = {     
      // currentStrain: [currentStrain, setCurrentStrains] 
      currentStrain: currentStrain,
      setCurrentStrain: setCurrentStrain,
      savedStrains: savedStrains,
      users: users,
      setUsers: setUsers,
      dbStrains: dbStrains,
      setDbStrains: setDbStrains,

      inplay2: inplayarray,
      contextparents: contextparentarray,
      contextparents1: contextparent1array,
      contextparents2: contextparent2array,
      winstreak: winstreakarray,
      wrongguess: guessarray, 
    }
  
    let strainObj = {      
      clickedStrain: clickedStrain,
      setClickedStrain: setClickedStrain,
      bgToggle: bgToggle,
      setBgToggle: setBgToggle,
      textState: textState,
      displayText: displayText,
      setDisplayText: setDisplayText,
      styleFile: styleFile,
      setStyleFile: setStyleFile,
      nothing: nothing,
      setNothing: setNothing,
      apiLen: apiLen,
      setApiLen: setApiLen
    }

    let errorObj = {
      url: url,
      setUrl: setUrl,
      currentStrain: currentStrain, 
      setCurrentStrain: setCurrentStrain,
      allStrains: allStrains,
      setAllStrains: setAllStrains,
      error: error,
      setError: setError,
      errAcknowledge: errAcknowledge,
      setErrAcknowledge: setErrAcknowledge
    }

    let stateArray = [indexObj, strainObj, errorObj]    
    const testError = async () => {
      let url = `https://pokeapi.co/api/v2/pokemon/`
      let url2 = 'hi'          
      try {
        // let testfetch = await Axios.get('https://pokeapi.co/api/v2/pokemon')        
        let test = await Axios.get(url2)       
      } 
      catch(err) {              
        let globalSetError = stateArray[2].setError
        const testError:string = await ERROR(err, globalSetError)      
      }
    }

    return (

      <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

          


          
      <GameProvider>

      <StateStore>
      <Provider store={store}>

          
          
          {/* useContext() /contexts/game.tsx errormsg<string>('') any toggled state with valid string data entry === this renders until relief of duty from click  */}
          {/* if (state === 'toggle') {
            <error/>
          } */}
      <NavBar/>
      <Component {...pageProps}
      appCurrentUser={appCurrentUser} setAppCurrentUser={setAppCurrentUser}
      appCurrentUser={appCurrentUser} setAppCurrentUserName={setAppCurrentUserName}


      globalstate={stateArray}// homebody={initialstate}
      error={error} setError={setError}
      currentStrain={currentStrain} setCurrentStrain={setCurrentStrain}
      url={url} setUrl={setUrl}
      allStrains={allStrains} setAllStrains={setAllStrains}
      
      
      // * strain.tsx state 
      clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}
      bgToggle={bgToggle} setBgToggle={setBgToggle} textState={textState} setTextState={setTextState} displayText={displayText} setDisplayText={setDisplayText}
      styleFile={styleFile} setStyleFile={setStyleFile} nothing={nothing} setNothing={setNothing} apiLen={apiLen} setApiLen={setApiLen}
      // * error.tsx related state
      url={url} setUrl={setUrl} allStrains={allStrains} setAllStrains={setAllStrains} 
      error={error} setError={setError} errAcknowledge={errAcknowledge} setErrAcknowledge={setErrAcknowledge}
      strainSave={strainSave} setStrainSave={setStrainSave}
      keyState={keyState} setKeyState={setKeyState}
      valueState={valueState} setValueState={setValueState}
      fetchLock={fetchLock} setFetchLock={setFetchLock}      
      />      


      </Provider>
      </StateStore>      
      </GameProvider>
      {/* </Context.Provider> */}
    
    </>
      
    )

  }
const makeStore = () => wrapper;
//withRedux wrapper that passes the store to the App Component
// export default withRedux(makeStore)(App);
// export default withRedux(makeStore)(App);
  
