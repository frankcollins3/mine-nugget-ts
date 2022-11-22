// import modulecss from '../styles/Strain.module.scss'
import styles from '../styles/Strain.module.scss'
import AllStrainContainer from '../components/AllStrainContainer'

import React, { useEffect, useState } from 'react'
// import getAllStrain from './api/getAllStrain'



export default function Strain (props:any) {

    console.log("right now we are in the strain function");
    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <div className={classList}>
            <AllStrainContainer
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
             />

            <p className={textClasses}> quick look </p>
        </div>
    )
}
