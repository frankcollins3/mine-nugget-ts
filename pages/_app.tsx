// @ts-nocheck
import '../styles/globals.css'
  import type { AppProps } from 'next/app'
  import Head from "next/head";
  import React, { useState, useContext, useEffect, createContext } from 'react'
  import Container from "react-bootstrap/Container"


  
 export default function App({ Component, pageProps, context }: AppProps) {

    return (
      <Container id="App">
          <Component {...pageProps}/>
      </Container>    
    )
  
  }  
