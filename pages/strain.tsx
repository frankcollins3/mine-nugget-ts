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

                    
export default  function Strain ( props:any, context ) {   
    // console.log('props')
    // console.log(props)
    let explicitprops = props
    


    const TextContext = createContext('')
    
    // * State 
    const [clickedStrain, setClickedStrain] = useState()
    const [bgToggle, setBgToggle] = useState('new')
    const [textState, setTextState] = useState('')
    const [displayText, setDisplayText] = useState('')

    const globalstrain = props.globalstate

    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");
    
    const access = async (context:any) => {             
    let ajaxstraindata = await DataCall('axios', `${url}/api/strains/allStrain`, null) // /pages/api/getAllStrains      
    let url:string = await ReturnUrl(context);  
      // console.log('url')
      // console.log(url)
      // let ajaxstraindata = await AjaxCall(`${url}/api/getAllStrain`, null, null) // /pages/api/getAllStrains        
  }
    
    const returnUrl = async (context:any) => { 
      let url:string = await ReturnUrl(context)      
      return url
    } // no 1liner?
    returnUrl()

    return (
        

          <Container 
          style={ { minWidth: '100%'}}
          className={classList}>

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
                // keyState={props.keyState} setKeyState={props.setKeyState}
                // valueState={props.valueState} setValueState={props.setValueState}
                // fetchLock={props.fetchLock} setFetchLock={props.setFetchLock}
                />

              {/* { props.strainSave === false      this made it take an extra 30 minutes
                            ? */}


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
              url={returnUrl}
              global={explicitprops}
              let contextprops={context}
              />
             }
                 
          </Container>
            
              
    )
}

export async function getServerSideProps(context:any) {              
  let url:any = await ReturnUrl(context);    
  // let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
  let predata = await fetch(new URL(`${url}/api/strains/strain`))            
  let serverdata = await predata.json()        
return {
props: {
  serverdata    
}
};
}
