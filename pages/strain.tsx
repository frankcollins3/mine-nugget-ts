// @ts-nocheck

import AllStrainContainer from 'components/AllStrainContainer'
import StrainDisplay from 'components/StrainDisplay'
import StrainDisplayValue from 'components/strainDisplayvalue'
import PickMines from 'components/PickMines'
import styles from 'styles/Strain.module.scss'
import Container from 'react-bootstrap/Container';
import getAllStrain from 'pages/api/strains/strain'
import Random from 'utility/Randomizer'
import Children from 'utility/jqChildren'
import React, { useEffect, useState, useContext, createContext } from 'react'
import ReturnUrl from 'utility/ReturnUrl'
import AjaxCall from 'utility/AjaxCall'
import $ from 'jquery'
// import DataCall from 'utility/DataCall'
import CSS from 'utility/CSStool'
import DataCall from 'utility/DataCallJS'
import Axios from 'axios';
let relativepath = `/api/getAllStrain.ts`
import styled from 'styled-components'
import Display from 'styles/StrainDisplay'
import {useGame} from 'Contexts/game'

import Document, { Html, Head, Main, NextScript } from 'next/document'


                    
export default  function Strain ( props:any, context ) {       

  console.log('props from strain page')
        console.log(props)
        console.log('props.appCurrentUser')
        console.log(props.appCurrentUser)
        console.log('props.appCurrentUserName')
        console.log(props.appCurrentUserName)
        let appCurrentUser = props.appCurrentUser
        let appCurrentUserName = props.appCurrentUserName


    let explicitprops = props

    let localhost = props.localhost

    const TextContext = createContext('')
    
    // * State 
    const [clickedStrain, setClickedStrain] = useState()
    const [bgToggle, setBgToggle] = useState('new')
    const [textState, setTextState] = useState('')
    const [displayText, setDisplayText] = useState('')

    const {currentUser, currentUserName, currentuseridset, currentUserId, currentusernameset, noUser, nouserset, userStrains, userstrainset } = useGame()

    useEffect( () => {
      console.log('useEffect.. currentUser from from strain')
      const checkuser = async () => {
        let currentusername =   window.localStorage.getItem('currentUserName')
        let currentuserid =  window.localStorage.getItem('currentUserId')
        let prestrains = window.localStorage.getItem('myStrains')          
        let splitId = prestrains?.split(',')        
        console.log('splitId')
        console.log(splitId)
        let filteredId = await splitId?.filter( strainsId => strainsId !== ',' && strainsId.length === 1)      
        console.log('filteredId these are my strains!')                                    
        console.log(filteredId)                                    
        currentusernameset(currentusername)
        currentuseridset(currentuserid)    
        userstrainset(filteredId)    
        
      }
      checkuser()
  }, [currentUser])


    const globalstrain = props.globalstate
    let userId = currentUser ? currentUser.id : ''
    console.log('userId from over here!')
    console.log(userId)

    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");
    
    const access = async (context:any) => {             
    let ajaxstraindata = await DataCall('axios', `${url}/api/strains/allStrain`, null) // /pages/api/getAllStrains      
    let url:string = await ReturnUrl(context);        
  }
    
    const returnUrl = async (context:any) => { 
      let url:string = await ReturnUrl(context)      
      return url
    } // no 1liner?
    returnUrl()

    const usercheck = async () => {
      console.log('appCurrentUser')
      console.log(appCurrentUser)
      console.log('appCurrentUserName')
      console.log(appCurrentUserName)
      
      console.log('userStrain')
      console.log(userStrains)
    }

    const LOGOUT = () => {
      // window.localStorage.setItem('currentUserId', '')
      // window.localStorage.setItem('currentUserName', '')
      window.localStorage.setItem('currentUserName', '')            
      window.localStorage.setItem('currentUserId', '')            
      currentusernameset('')
      currentuseridset('')
    }

    const noUserClickMine = (event) => {
      

      $(event.target)
      .animate({
        opacity: '0.8'  
      }, 500)
      .animate({
        opacity: '0.3'
      }, 500)
      .animate({
        opacity: '0.3'
      }, 500, () => {
        setTimeout( () => {
          location.href = '/LoginLogout'          
          nouserset(false);
          $('*').css('cursor', 'pointer' )
        }, 1000)

      })

      setTimeout( () => {
        $('*')        
        .animate({
          opacity: '0.8'  
        }, 500)
        .animate({
          opacity: '0.3'
        }, 500)
        .animate({
          opacity: '0.3'
        })
      }, 2000)

    }

    return (

      <>
        
        

          <Container 
          style={ { minWidth: '100%'}}
          className={classList}>

            
            { noUser === true ? 
            <div className="Row">
              <p id="noUserText" > You Must Be Mine To Dig For Gold. </p>
            </div>
            :
            <pre></pre>
          }
            <AllStrainContainer   
                let global={explicitprops}
                strainSave={props.strainSave} setStrainSave={props.setStrainSave}
                // globalState={globalstrain}
                bgToggle={bgToggle} setBgToggle={setBgToggle}
                textState={textState} setTextState={setTextState}
                displayText={displayText} setDisplayText={setDisplayText}
                clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}       
                serverdata={props.serverdata}      
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}                            
                />
            {
              noUser === true ?
              <div style={{
                height: '10em',
                width: '10em',
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                flexDirection: 'row'
              }} 
              >
                <img 
                onClick={noUserClickMine}
                style={{ transform: 'scale(0.10)', boxShadow: '18px 50px 10px papayawhip', borderRadius: '50%', padding: '0', margin: '0' }}  src="/img/mine.png"/>              
            </div>            
              : 
              <div></div>
            }

              <div className={styles.Rows}>
              {props.strainSave === false 
                 ?
                 <>
              <StrainDisplay  
                strainSave={props.strainSave} setStrainSave={props.setStrainSave}
                // globalState={globalstrain}
                textState={textState} setTextState={setTextState}
                bgToggle={bgToggle} setBgToggle={setBgToggle}
                clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}       
                />

              <StrainDisplayValue
              // globalState={globalstrain}
              strainSave={props.strainSave} setStrainSave={props.setStrainSave}
              displayText={displayText} setDisplayText={setDisplayText}
              bgToggle={bgToggle} setBgToggle={setBgToggle}
              clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}       
              >
              </StrainDisplayValue>
                </>
              :
              ''
            }
                </div>                
             {props.strainSave === false 
                ? 
                ''
              :
              <PickMines
              localhost={localhost}
              url={returnUrl}
              global={explicitprops}
              contextprops={context}
              />
              }
                 <button style={{ backgroundColor: 'red', marginTop: '2em' }} onClick={LOGOUT}></button> 
                <button onClick={usercheck}></button> 
          </Container>
          </>
            
              
    )
}

export async function getServerSideProps(context:any) {              
  let url:any = await ReturnUrl(context);    
  let localhost = url
  // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
  let predata = await fetch(new URL(`${url}/api/strains/strain`))            
  let serverdata = await predata.json()        
return {
props: {
  serverdata, localhost
}
};
}
