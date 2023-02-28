// @ts-nocheck

import styled from 'styled-components'
import CardStyle from 'styles/StrainDisplay'
import {useState, useEffect} from 'react'


export default function StrainDisplayValue(props) {
    console.log("hello from strain display values!")
    let columnclass = 'Column'
    let card = 'card' 
    let doubleCardClass = [card, columnclass].join(' ')
    return (
        <>        

                 <CardStyle        
            bgToggle={props.bgToggle} setBgToggle={props.setBgToggle}
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}            
                >

                <div 
                className={doubleCardClass}
                >            
                <h2
                style={{ backgroundColor: props.bgToggle === 'new' ? 'transparent' : 'rgb(62, 50, 32)'}}
                 className="card-text">
                    {props.displayText || ''}
                 </h2>
            </div>    
         </CardStyle>   
        </>
    )
}
