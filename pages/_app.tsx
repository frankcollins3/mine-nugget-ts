import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import React, { useState, useContext, createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
// import { themes, ThemeContext} from '.././utility/Context'
// import globalContext from   '.././utility/Context'


export default function App({ Component, pageProps }: AppProps) {
  
  // const [theme, setTheme] = useState(themes.dark)      this is for context in the example.
  const [url, setUrl] = useState('')    // url:string
  const [ currentStrain, setCurrentStrain ] = useState('')
  const [allStrains, setAllStrains] = useState([])

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

    <Component {...pageProps}
     currentStrain={currentStrain} setCurrentStrain={setCurrentStrain}
     url={url} setUrl={setUrl}
     allStrains={allStrains} setAllStrains={setAllStrains}
     />
   {/* </ThemeContext.Provider> */}
   </>
    
  )

}
