// @ts-nocheck
import styled from 'styled-components'

// import Display from 'styles/StrainDisplay'
import CardStyle from 'styles/StrainDisplay'

import Card from 'react-bootstrap'
import $ from 'jquery'
import CSS from 'utility/CSStool'


export default function StrainDisplay (props) {
    let columnclass = 'Column'
    let card = 'card'   // i wonder if doing this likes this takes the string data out of the scope of being tied to bootstrap 
    // bootstrap might only apply to inline styling. these 2 might be blended like a normal string.
    let doubleCardClass = [card, columnclass].join(' ')

    return (

    // return as any (
<>
        <CardStyle
        // <Display
            bgToggle={props.bgToggle} setBgToggle={props.setBgToggle}
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}
        >
                <div 
                className={doubleCardClass}
                >            
                <p
                style={{ backgroundColor: props.bgToggle === 'new' ? 'transparent' : 'rgb(62, 50, 32)'}}
                 className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
    
         </CardStyle>            
         {/* </Display>             */}
</>
    )
}
