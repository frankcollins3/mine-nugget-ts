// @ts-nocheck
import React, { useState, useContext, useEffect, createContext } from 'react'
import Container from "react-bootstrap/Container"
import type { AppProps } from 'next/app'
import Head from "next/head";

// @reduxjs/toolkit global state management
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'redux/store/rootReducer';


// styles 
import '../styles/globals.css'


  const store = configureStore({
    reducer: rootReducer,
  });
  
 export default function App({ Component, pageProps, context }: AppProps) {

    return (
      <Container id="App">

      <Provider store={store}>
          <Component {...pageProps}/>

      </Provider>
      </Container>    
    )
  
  }  
