import axios from 'axios';
import React, { useEffect, useState, useContext, createContext } from 'react'
// import $ from 'jquery'
// import Document, { Html, Head, Main, NextScript } from 'next/document'

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_VIEW_SELECTED_STRAIN, SET_CURRENT_USER, SET_CURRENT_PAGE } from 'redux/main/mainSlice';

// components and styles
import Container from 'react-bootstrap/Container';
import SeeandSaveStrain from "components/SeeandSaveStrain"
import SeeandSaveStrainCont from "components/SeeandSaveStrainCont"
import SaveMines from "components/SaveMines"
import Navbar from "components/Navbar"
import StrainFooter from "components/Footer/StrainFooter"
import GreatBarrierFooter from 'components/Footer/GreatBarrierFooter';
// import styles from 'styles/Strain.module.scss'

// utils
import {usePromise} from "Contexts/Promises"
import {useImage} from "Contexts/Img"
import {strains} from "utility/strainJSON.json"
import {strainsINTERFACE} from "utility/InterfaceTypes"
import { getUserWithIdStringFunc } from 'graphql/queries';
import {nothing, getCookie} from "utility/utilityValues"
                    
export default function Main ( props:any, context ) {       
    const {goldcursor2} = useImage()

    const dispatch = useDispatch()
    // props go here and get spit out in RENDERMAIN
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)
    const SELECTED_STRAIN_SAVE_OR_NOT = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_OR_NOT)

    const readyToSave = true

    useEffect( () => {
      dispatch(SET_CURRENT_PAGE('/strain'))
      // const tryToRememberMe = () => {
        // only reason this function is abstract and not set as a modular function in Contexts/Promises.tsx is that the index of either cookie[id] or cookie[token] kept switching orders
        console.log("trying hard")
        // if (triedRememberMe === false) {    
            const cookieFunc = async () => {
                const cookie = await getCookie()
                console.log('cookie', cookie)
                if (cookie[0] && cookie[1]) {                
                    let id
                    id = cookie[0].length > cookie[1].length ? cookie[1].replace(/\D+/g, '') : cookie[0].replace(/\D+/g, '')
                    console.log('id', id)
                    if (id) {                
                        const query = getUserWithIdStringFunc(id)
                        return axios.post('/api/graphql', {query:`${query}`})
                        .then( (userWithId:any) => {
                        console.log('userWithId', userWithId)
                        userWithId = userWithId.data.data.getUserWithId
                        dispatch(SET_CURRENT_USER(userWithId))
                        })
                    } 
                } else { return }
              }
                // }
            cookieFunc()


        // setTriedRememberMe(true)

    }, [])


    return (
      <>

      <Container style={{ cursor: `url('${goldcursor2}'), auto` }} onMouseLeave={() => SELECTED_STRAIN_SAVE_OR_NOT ? nothing : dispatch(SET_VIEW_SELECTED_STRAIN('')) } className="Main-Strain">      
      {/* <Container style={{ border: readyToSave ? "none" : "", overflowY: readyToSave ? "hidden" : "scroll" }} className="Main">       */}

        <RENDERMAIN></RENDERMAIN> 
        {/* <RENDERSAVE></RENDERSAVE> */}

      </Container>       

      <Container className="Footer">

        {/* <StrainFooter></StrainFooter> */}
        { VIEW_SELECTED_STRAIN.strainValues && VIEW_SELECTED_STRAIN.strainValues.strain.length > 1 && <StrainFooter></StrainFooter> }
        { !VIEW_SELECTED_STRAIN && <GreatBarrierFooter/>}

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