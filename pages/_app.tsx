// @ts-nocheck
import '../styles/globals.css'
  import type { AppProps } from 'next/app'
  import Head from "next/head";
  import React, { useState, useContext, createContext } from 'react'
  import 'bootstrap/dist/css/bootstrap.css'
  import styled from 'styled-components'
  import Axios from 'axios';
  import ERROR from 'utility/CatchBlockErr'
  import Link from 'next/link'

  import StateStore from 'hooks/store'
  // import StateStore from 'components/store'
  
  
  export default function App({ Component, pageProps, context }: AppProps) {
    
// * index.tsx 
  //  const [ pokemon, setPokemon ] = useState('')
   const [currentStrain, setCurrentStrain] = useState('')
   const [savedStrains, setSavedStrains] = useState('')
   const [users, setUsers] = useState([])
   const [dbStrains, setDbStrains] = useState([])
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
      setDbStrains: setDbStrains
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

      
      <button onClick={testError}>
        ERROR TEST 
      </button>
      <p> {error || 'no error'} </p>
      
      {/* <Context.Provider>         */}
      <StateStore>
      <Component {...pageProps}
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
      </StateStore>      
      {/* </Context.Provider> */}
    
    </>
      
    )

  }
  
