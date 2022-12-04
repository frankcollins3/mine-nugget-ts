// @ts-nocheck
import styled from 'styled-components'
// import Display from 'styles/StrainDisplay'
import CardStyle from 'styles/StrainDisplay'
import Card from 'react-bootstrap'
import $ from 'jquery'
import CSS from 'utility/CSStool'
import {useEffect, useState} from 'react'



export default function StrainDisplay (props) {
    
    useEffect( () => {
        console.log("state is being changed in the effect change.")
        console.log(props.globalState[1])
    }, [props.globalState[1]])

    console.log(props.globalState[1].bgToggle)

    
    let stateString:string = props.textState

    let columnclass = 'Column'
    let card = 'card'   // i wonder if doing this likes this takes the string data out of the scope of being tied to bootstrap 
    // bootstrap might only apply to inline styling. these 2 might be blended like a normal string.
    let doubleCardClass = [card, columnclass].join(' ')
    return (
    // return as any (
<>
        <CardStyle        
            bgToggle={props.globalState[1].bgToggle}
            // bgToggle={props.bgToggle} setBgToggle={props.setBgToggle}
            clickedStrain={props.globalState[1].clickedStrain} setClickedStrain={props.setClickedStrain}
            // clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}

        >
                <div 
                className={doubleCardClass}
                >            
                <p
                style={{ backgroundColor: props.bgToggle === 'new' ? 'transparent' : 'rgb(62, 50, 32)'}}
                 className="card-text">
                    {stateString || ''}
                 </p>
            </div>    
         </CardStyle>            
         {/* </Display>             */}
</>
    )
}
