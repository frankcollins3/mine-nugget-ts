import axios from 'axios';
import React, { useEffect, useState, useContext, createContext } from 'react'
// import $ from 'jquery'
// import Document, { Html, Head, Main, NextScript } from 'next/document'

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX, SET_ALL_STRAINS } from 'redux/main/mainSlice';

// components and styles
import Container from 'react-bootstrap/Container';
import SeeandSaveStrain from "components/SeeandSaveStrain"
import SeeandSaveStrainCont from "components/SeeandSaveStrainCont"
import SaveMines from "components/SaveMines"
import StrainFooter from "components/Footer/StrainFooter"
// import styles from 'styles/Strain.module.scss'

// utils
import {usePromise} from "Contexts/Promises"
import {strains} from "utility/strainJSON.json"
import {strainsINTERFACE} from "utility/InterfaceTypes"
import { allStrainsGETquery } from 'graphql/queries';
                    
export default function Main ( props:any, context ) {       
    const dispatch = useDispatch()
    // props go here and get spit out in RENDERMAIN
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)

    const readyToSave = true
    // readyToSave = false

    return (
      <>
      {/*    if SAVED_STRAIN scroll: none;    */}

      <Container onMouseLeave={() => dispatch(SET_VIEW_SELECTED_STRAIN('')) } className="Main">      
      {/* <Container style={{ border: readyToSave ? "none" : "", overflowY: readyToSave ? "hidden" : "scroll" }} className="Main">       */}

        <RENDERMAIN></RENDERMAIN> 
        {/* <RENDERSAVE></RENDERSAVE> */}

      </Container>       

      <Container className="Footer">

        {/* <StrainFooter></StrainFooter> */}
        { VIEW_SELECTED_STRAIN.strainValues && VIEW_SELECTED_STRAIN.strainValues.strain.length > 1 && <StrainFooter></StrainFooter> }

        </Container>                   
      </>
    )
  }
    
  function RENDERMAIN () {                // function RENDERMAIN (props) {
        const { setallstrainsPROMISE } = usePromise()
        const dispatch = useDispatch()
        const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)
        
        // const test = () => {          
        //   console.log('check yourself');
        //   console.log('all strains', ALL_STRAINS)                    
        // }

        return (
          <>          
          {/* <SaveMines/> */}
            <SeeandSaveStrainCont/>
          </>
        )
  }

  function RENDERSAVE () {
    return (
      <>
      <SaveMines/>
      </>
    )
  }
