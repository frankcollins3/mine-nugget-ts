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
  
  
  export default function App({ Component, pageProps }: AppProps) {
    
    let initialstate = {
      // pokemon:string: '',  cant
      // pokemon: '',
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

  
  
  // const [theme, setTheme] = useState(themes.dark)      this is for context in the example.
  const [state, setState] = useState()
  let globalshorthand = [state, setState]
  const [url, setUrl] = useState('')    // url:string
  const [currentStrain, setCurrentStrain ] = useState('')
  const [allStrains, setAllStrains] = useState([])
  const [error, setError] = useState()
  const [errAcknowledge, setErrAcknowledge] = useState('')

      //  const Context = createContext(null as any);    
      // <Context.Provider value={ 'he4y'  }> {initialstate} </Context.Provider>       

  // const StateStore = (children) => {    
  //      const Context = createContext(null as any);    
  //      return (
  //         <Context.Provider value={[state, setState]}> {initialstate}</Context.Provider> || {my: 'life'}        
  //      )
  // }
    
    
  
        
    const testError = async () => {
      let url = `https://pokeapi.co/api/v2/pokemon/`
      let url2 = 'hi'          
      try {
        // let testfetch = await Axios.get('https://pokeapi.co/api/v2/pokemon')        
        let test = await Axios.get(url2)       
      } 
      catch(err) {              
        const testError:string = await ERROR(err, setError)      
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
      error={error} setError={setError}
      currentStrain={currentStrain} setCurrentStrain={setCurrentStrain}
      url={url} setUrl={setUrl}
      allStrains={allStrains} setAllStrains={setAllStrains}
      />
      </StateStore>      
      {/* </Context.Provider> */}
    
    </>
      
    )

  }
