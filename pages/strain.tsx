// import $ from 'jquery'
// import modulecss from '../styles/Strain.module.scss'
// import { $ }  from 'react-jquery-plugin'
import styles from 'styles/Strain.module.scss'
import getAllStrain from 'pages/api/getAllStrain'
import AllStrainContainer from 'components/AllStrainContainer'
import Random from 'utility/Randomizer'
import React, { useEffect, useState, useContext } from 'react'
import ReturnUrl from 'utility/ReturnUrl'
import Axios from 'axios';

    const access = () => {
        // console.log("heyy") tested pokeAPI on/off here.
    }

export async function getServerSideProps(context:any) {            
        let url:any = await ReturnUrl(context);    
        let pokeurl = `https://pokeapi.co/api/v2/pokemon/`    
        let relativepath = `pages/api/getAllStrain.ts`
        let predata = await fetch(new URL(`${url}/api/getAllStrain`))
        let serverdata = await predata.json()
    return {
      props: {
        serverdata    
      }
    };
  }

export default  function Strain ( props:any ) {          
    console.log('props.serverdata')
    console.log(props.serverdata)

    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");

    return (
        <div className={classList}>
            <AllStrainContainer           
                serverdata={props.serverdata}      
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}            
             />
            <button onClick={access}> </button>            
        </div>
    )
}
