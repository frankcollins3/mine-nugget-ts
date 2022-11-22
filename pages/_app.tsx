import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from "next/head";
import React, { useState, useContext, createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
// import { themes, ThemeContext} from '.././utility/Context'
// import globalContext from   '.././utility/Context'

let themes = {
// export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    border: '10px solid orange'
  },
};


export default function App({ Component, pageProps }: AppProps) {
  
  const [theme, setTheme] = useState(themes.dark)
  const ThemeContext = createContext(theme)
  // globalContext()
  // const appContext = createContext({
  //   default
  // })
  const contextstate = () => {
    
  }

  return (
    <>
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

    <ThemeContext.Provider value={theme}>
    <Component {...pageProps} />
   </ThemeContext.Provider>
   </>
    
  )

}
