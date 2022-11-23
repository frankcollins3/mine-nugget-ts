import $ from 'jquery'
// import modulecss from '../styles/Strain.module.scss'

// import { $ }  from 'react-jquery-plugin'

import styles from '../styles/Strain.module.scss'
import getAllStrain from './api/getAllStrain'

import AllStrainContainer from '../components/AllStrainContainer'

import React, { useEffect, useState } from 'react'
// import getAllStrain from './api/getAllStrain'

export async function getStaticProps(context:any) {
    console.log('server side! in the strain!')
    let currentdirectory = process.cwd()
    console.log('currentdirectory')
    console.log(currentdirectory)
    
    // let getdbALL = await fetch('/pages/api/allStrain.ts')
    // console.log('getdbALL')
    // console.log(getdbALL)

    // const protocol = req.headers['x-forwarded-proto'] || 'http'
    // const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // let strains = await fetch(`/Users/medium/Desktop/mine-nugget-ts/pages/api/getAllStrain.ts`)

    // console.log('strains')
    // console.log(strains)

    // $.ajax({
    //     method: 'get',
    //     url: '/api/getAllStrains',
    //     data: 'json'    
    // }).then( (data) => {
    //     console.log('data')
    //     console.log(data)
    // })
    return {
        props: {
            
        }
    }


}

export default function Strain (props:any,) {
    
    
    
    
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
        </div>
    )
}
