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
        data: {
            key: 'all'
        },        
    }).then( (clientdata) => {
        console.log('data')
        console.log(clientdata)
    })

}


export async function getServerSideProps(context:any) {
    console.log("in the serverside props function")

    // let url:any = await ReturnUrl(context);
    let url = '/pages/api/getAllStrain'
    // let url = 'https://pokeapi.co/api/v2/pokemon/2'

    const baseURL = 'http://localhost'
    let pokeurl = `https://pokeapi.co/api/v2/pokemon/`
    // fetch(new URL(url, baseURL))

    // let finallydata = await fetch(new URL(pokeurl))
    let finallydata = await fetch(new URL(`https://localhost:3000/pages/api/getAllStrain`))

    // let finallydata = await fetch(new URL(url, baseURL))
    console.log('finallydata')
    console.log(finallydata)
//     fetch(new URL(url, baseURL, {
//         method: 'POST',
//         headers: {authorization: 'Bearer ' + process.env.AUTHO_TOKEN},
// -        data: '{"user_metadata": {"displayName": "FooName"}',
// +        body: '{"user_metadata": {"displayName": "FooName"}',
//     }))
    

    
    // console.log('data')
    // console.log(data)
    // /let newdata = JSON.parse(JSON.stringify(data))
    // console.log('newdata')
    // console.log(newdata)/

    // const data = await fetch(`${url}/pages/api/getAllStrain.ts`).then((res) => res.json());
    return {
      props: {
        // data: data,
      }
    };
  }

export default function Strain (props:any, allpokemon:any) {
    console.log('allpokemon')        
    console.log(allpokemon)        

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
