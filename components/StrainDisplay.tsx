// @ts-nocheck
import styled from 'styled-components'
// import Display from 'styles/StrainDisplay'
import CardStyle from 'styles/StrainDisplay'
import Card from 'react-bootstrap'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import {useEffect, useState} from 'react'



export default function StrainDisplay (props) {
    let strainSave = props.strainSave
    let setStrainSave = props.setStrainSave

    let stateString:string = props.textState    // this should still satisfy accessing the global state with this declaration.    
    console.log('stateString')
    console.log(stateString)

    let columnclass = 'Column'
    let card = 'card'   // i wonder if doing this likes this takes the string data out of the scope of being tied to bootstrap 
    // bootstrap might only apply to inline styling. these 2 might be blended like a normal string.
    let doubleCardClass = [card, columnclass].join(' ')
    return (
<>
        <CardStyle        
            bgToggle={props.bgToggle} 
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}
        >

                <div 
                className={doubleCardClass}
                >            
                <h1
                style={{ backgroundColor: props.bgToggle === 'new' ? 'transparent' : 'rgb(62, 50, 32)'}}
                 className="card-text">
                    {stateString || ''}
                 </h1>
            </div>    
         </CardStyle>            
         {/* </Display>             */}
</>
    )
}
