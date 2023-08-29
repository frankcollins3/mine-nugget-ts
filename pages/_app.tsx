// @ts-nocheck
import React, { useState, useContext, useEffect, createContext } from 'react'
import Container from "react-bootstrap/Container"
import type { AppProps } from 'next/app'
import Head from "next/head";

// @reduxjs/toolkit global state management
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'redux/store/rootReducer';

// components and styles 
import Navbar from "components/Navbar"
import '../styles/globals.css'
import 'styles/stars.css'

// utils
import { PromiseProvider } from 'Contexts/Promises';
import { ImgProvider } from 'Contexts/Img';
import { RegexProvider } from 'Contexts/Regex';

// allows store={store} in the redux <Provider> wrapper. 
  const store = configureStore({
    reducer: rootReducer,
  }); 
  
 export default function App({ Component, pageProps, context }: AppProps) {

    return (
      <Container style={{ cursor: `url('img/goldcursor1.png'), auto`}} id="App">

        {/* Redux Provider */}
      <Provider store={store}>
          {/* Modular Promises */}
        <PromiseProvider>
          {/* Img Str String Bank */}
          
          <ImgProvider>
            {/* Regex Expressions  */}
          <RegexProvider>

          <div className="Navbar">
              <Navbar/>
          </div>

          <Component {...pageProps}/>

          </RegexProvider>

          </ImgProvider>

        </PromiseProvider>

      </Provider>

      </Container>    
    )
  
  }  
