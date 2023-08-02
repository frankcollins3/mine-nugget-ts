import styles from 'styles/Strain.module.scss'
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState, useContext, createContext } from 'react'
// import $ from 'jquery'
// import Axios from 'axios';
// import Document, { Html, Head, Main, NextScript } from 'next/document'
import {strains} from "utility/strainJSON.json"
                    
export default function Main ( props:any, context ) {       
    // props go here and get spit out in RENDERMAIN

    return (
      <Container className="Main">      
        <RENDERMAIN></RENDERMAIN> {/*     <RENDERMAIN props={}></RENDERMAIN>      */}
      </Container>                          
    )
  }
    
  function RENDERMAIN () {                // function RENDERMAIN (props) {
        const test = () => {
          console.log('strains', strains)
        }

        return (
          <Container>
          <pre onClick={test}> hey how are you guys </pre>
          </Container>
        )
  }

  //  useEffect( () => {
  //     (async() => {
  //         // const strainfunc = async () => {
  //   $.ajax({
  //     method: 'post',
  //     url: '/api/strains/allStrain',
  //     data: {
  //      key: 'all'
  //     }
  //   }).then( (msg) => {
  //     console.log('msg we are in the .then() statement')
  //     console.log(msg)      
  //   })
  //   })()
  //  }, [])
