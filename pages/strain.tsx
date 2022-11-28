import AllStrainContainer from 'components/AllStrainContainer'
import StrainDisplay from 'components/StrainDisplay'

import styles from 'styles/Strain.module.scss'
import getAllStrain from 'pages/api/strains/strain'
import Random from 'utility/Randomizer'
import Children from 'utility/jqChildren'
import React, { useEffect, useState, useContext } from 'react'
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





export async function getServerSideProps(context:any) {      
        
  

        let url:any = await ReturnUrl(context);    
        let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
        let predata = await fetch(new URL(`${url}/api/strains/strain`))
    
        // let updateit = await fetch(new URL(`${url}/api/strains/update`))        
        // let updateit = await DataCall('axios', `${url}/api/strains/update`, null)
        // console.log('updateit')
        // console.log(updateit)
        
        let serverdata = await predata.json()
    return {
      props: {
        serverdata    
      }
    };
  }

export default  function Strain ( props:any, context ) {       
      useEffect( () => {
        // let body = $('body')   this expression is not callable.
        (async() => {

          let childelem:any = await Children($('body'))
          // let childelem:(object|string) = await Children(body)
          console.log('childelem') 
          console.log(childelem) 
        })()
        
    }, [])
  
    const [clickedStrain, setClickedStrain] = useState()
    const [bgToggle, setBgToggle] = useState('new')
    const [textState, setTextState] = useState('')

    console.log('props.serverdata')
    console.log(props.serverdata)

    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");

    const access = async (context:any) => {             
      let url:string = await ReturnUrl(context);  
      let ajaxstraindata = await DataCall('axios', `${url}/api/getAllStrain`, null) // /pages/api/getAllStrains      
      // let ajaxstraindata = await AjaxCall(`${url}/api/getAllStrain`, null, null) // /pages/api/getAllStrains        
  }


    return (
        

        <div className={classList}>
            <AllStrainContainer   
                bgToggle={bgToggle} setBgToggle={setBgToggle}
                textState={textState} setTextState={setTextState}
                clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}       
                serverdata={props.serverdata}      
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}            
                />

             <StrainDisplay  
                textState={textState} setTextState={setTextState}
                bgToggle={bgToggle} setBgToggle={setBgToggle}
                clickedStrain={clickedStrain} setClickedStrain={setClickedStrain}       
                />                  
        </div>


        
        
    )
}
