 import $ from 'jquery'
// import modulecss from '../styles/Strain.module.scss'
// import { $ }  from 'react-jquery-plugin'
import styles from 'styles/Strain.module.scss'
import getAllStrain from 'pages/api/getAllStrain'
import AllStrainContainer from 'components/AllStrainContainer'
import React, { useEffect, useState, useContext } from 'react'
import ReturnUrl from '.././utility/ReturnUrl'
import Axios from 'axios';

// import useSWR from 'swr'
// import getAllStrain from './api/getAllStrain'

const access = () => {
    console.log('access')
    $.ajax({
        method: 'get',
        url: '/api/getAllStrain',
        // data: {
        //     key: 'all'
        // },        
        // http://localhost:3000/pages/api/getAllStrain?key=all      look at keyall how it ends up in the url
    }).then( (clientdata) => {
        console.log('data')
        console.log(clientdata)
    })

}


export async function getServerSideProps(context:any) {
    console.log("in the serverside props function")

    let url:any = await ReturnUrl(context);
    // let url = '/pages/api/getAllStrain'
    // let url = 'https://pokeapi.co/api/v2/pokemon/2'

    const baseURL = 'http://localhost'
    let pokeurl = `https://pokeapi.co/api/v2/pokemon/`
    // fetch(new URL(url, baseURL))

    // let finallydata = await fetch(new URL(pokeurl))
    let predata = await fetch(new URL(`${url}/api/getAllStrain`))
    let serverdata = await predata.json()
    console.log('this is my data')
    console.log('data')
    console.log(serverdata)

    return {
      props: {
        serverdata    
      }
    };
  }

export default function Strain ( props:any  ) {  
    console.log('props')
    console.log(props)
    
    

    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <div className={classList}>
            <AllStrainContainer                 
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}            
             />

            <p className={textClasses}> quick look </p>
            <button onClick={access}>   </button>
        </div>
    )
}
