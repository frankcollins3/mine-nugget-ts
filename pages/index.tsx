import axios from 'axios';
import React, { useEffect, useState, useContext, createContext } from 'react'
// import $ from 'jquery'
// import Document, { Html, Head, Main, NextScript } from 'next/document'

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { TOGGLE_MINE_CANVAS_TOUCH, SET_CURRENT_PAGE } from 'redux/main/mainSlice';

// components and styles
import Container from 'react-bootstrap/Container';
import LoginSignupMirror from 'components/LoginSignupMirror/LoginSignupMirror';
import MineCanvas from 'components/MineCanvas';
import LoginSignupHelmet from 'components/LoginSignupHelmet/LoginSignupHelmet';
import GreatBarrierFooter from 'components/Footer/GreatBarrierFooter';
// import styles from 'styles/Strain.module.scss'

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import {strains} from "utility/strainJSON.json"
import {strainsINTERFACE} from "utility/InterfaceTypes"
import { allStrainsGETquery } from 'graphql/queries';
import {nothing} from "utility/utilityValues"
                    
export default function Main ( props:any ) {     

  const dispatch = useDispatch()  
  const {goldcursor2} = useImage()
  const [touchCoin, setTouchCoin] = useState(false)
    // props go here and get spit out in RENDERMAIN     
    
    useEffect( () => {
      dispatch(SET_CURRENT_PAGE("/"))
    }, [])

    return (
      <>
      
      <Container style={{ boxShadow: 'none', cursor: `url('${goldcursor2}'), auto` }} className="Main">      
      {/* <Container style={{ border: 'none', overflowY: 'hidden', maxHeight: '50vh', boxShadow: 'none', cursor: `url('${goldcursor2}'), auto`  }} className="Main">       */}
        {
          touchCoin
          ? <RENDERLOGINSIGNUP/>
          : <RENDERMAIN touchCoin={touchCoin} setTouchCoin={setTouchCoin}/>
        }

      </Container>       

      <Container className="Footer">
        
        <GreatBarrierFooter/>

        </Container>                   
      </>
    )
  }
    
  function RENDERMAIN (props) {               
        const setTouchCoin = props.setTouchCoin
        const touchCoin = props.touchCoin
        
        return (
          <Container style={{ marginTop: '100px', cursor: 'none' }}>         
          { !touchCoin && <MineCanvas setTouchCoin={setTouchCoin}/> }           
          </Container>
          
        )
  }

  function RENDERLOGINSIGNUP () {
    const SEE_LOGIN_OR_SIGNUP = useSelector( (state:RootState) => state.loginSignup.SEE_LOGIN_OR_SIGNUP)
    return (
      <>

      {
        SEE_LOGIN_OR_SIGNUP.length > 1
        ? <LoginSignupMirror/>
        : 
          <LoginSignupHelmet/>
      } 

      {/* { SEE_LOGIN_OR_SIGNUP === "signup" && <SignupConstraints/> } */}
      {/* { SEE_LOGIN_OR_SIGNUP === "signup" && <SignupConstraints/> } */}

      {/* <LoginSignupHelmet/> */}
      </>
    )
  }

