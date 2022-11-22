// import modulecss from '../styles/Strain.module.scss'
import styles from '../styles/Strain.module.scss'
import AllStrainContainer from '../components/AllStrainContainer'

import React, { useEffect, useState } from 'react'
// import getAllStrain from './api/getAllStrain'



export default function Strain (props:any) {
    console.log('props')
    console.log(props)


    
    const classList:string = [styles.Page, 'Column'].join(" ")
    const textClasses:string = [styles.FontSizeTest, styles.BorderTest].join(" ");
    // const classList = [modulecss.Parent-Cont, modulecss.Test-Border].join(" ")


    return (
    // let doubleClass = [modulecss.Parent-Cont, ]
        <div className={classList}>
            <AllStrainContainer 
                // dummyprop={'dummyprop'}
                url={props.url} setUrl={props.setUrl}
                allStrains={props.allStrains} setAllStrains={props.setAllStrains}
                currentStrain={props.currentStrain} setCurrentStrain={props.setCurrentStrain}            
             />

            <p className={textClasses}> quick look </p>
        </div>
    )
}
