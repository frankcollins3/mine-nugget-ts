import '../styles/globals.css'
  import type { AppProps } from 'next/app'
  import Head from "next/head";
  import React, { useState, useContext, createContext } from 'react'
  import 'bootstrap/dist/css/bootstrap.css'
  import styled from 'styled-components'
  import Axios from 'axios';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
  // import { themes, ThemeContext} from '.././utility/Context'
  // import globalContext from   '.././utility/Context'

  const testError = async () => {
    try {
      
      // let testfetch = await Axios.get('https://pokeapi.co/api/v2/pokemon')
      let test = await Axios.get('hi')
      // console.log('testfetch')
      // console.log(testfetch)
    } 
    catch(err) {
      console.log('err')
      console.log(err)
      // console.log(err.response.status)
      let errorstatus:string = err.response.status
      console.log('errorstatus')
      console.log(errorstatus)
      // setError(status)
    }
  }


  export default function App({ Component, pageProps }: AppProps) {
    
    // const [theme, setTheme] = useState(themes.dark)      this is for context in the example.
    const [url, setUrl] = useState('')    // url:string
    const [currentStrain, setCurrentStrain ] = useState('')
    const [allStrains, setAllStrains] = useState([])
    const [error, setError] = useState()
      

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
