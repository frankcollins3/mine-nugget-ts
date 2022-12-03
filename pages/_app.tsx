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
  console.log('StateStore')
  console.log(StateStore)

  let initialstate = {
    // pokemon:string: '',  cant
    pokemon: '',
    currentStrain: '',
    savedStrains: '',
    users: [],
    dbStrains: [],
    clickedStrain: undefined || null,
    bgToggle: 'new',
    textState: '',
    displayText: '',
    styleFile: '',
    nothing: '',
    apiLen: 0
}

  





  export default function App({ Component, pageProps }: AppProps) {
    
    // const [theme, setTheme] = useState(themes.dark)      this is for context in the example.
    const [url, setUrl] = useState('')    // url:string
    const [currentStrain, setCurrentStrain ] = useState('')
    const [allStrains, setAllStrains] = useState([])
    const [error, setError] = useState()
    const [errAcknowledge, setErrAcknowledge] = useState('')
      
    const testError = async () => {
      // test store of state that it returns the values declared across the app that i manually stored as obj
      
      // let url = `https://pokeapi.co/api/v2/pokemon/`
      console.log("hey whats up!")
      let globalstate = await StateStore()
      console.log(StateStore)
      console.log('globalstate')
      console.log(globalstate)
      // let url2 = 'hi'
      try {
        // let testfetch = await Axios.get('https://pokeapi.co/api/v2/pokemon')        
        // let test = await Axios.get('hi')
        // console.log('testfetch')
        // console.log(testfetch)
      } 
      catch(err) {              
      //   const testError:string = await ERROR(err, setError)
      //   setError(testError)
      }

    }

    // const ThemeContext = createContext(theme)
    // globalContext()
    // const appContext = createContext({
    //   default
    // })

    return (
      <>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

      {/* <ThemeContext.Provider value={theme}> */}
      <button onClick={testError}>
        ERROR TEST 
      </button>
      <p> {error || 'no error'} </p>
      
      <Component {...pageProps}
      error={error} setError={setError}
      currentStrain={currentStrain} setCurrentStrain={setCurrentStrain}
      url={url} setUrl={setUrl}
      allStrains={allStrains} setAllStrains={setAllStrains}
      />
    {/* </ThemeContext.Provider> */}
    </>
      
    )

  }
