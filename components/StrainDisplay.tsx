// @ts-nocheck
import styled from 'styled-components'

// import Display from 'styles/StrainDisplay'
import CardStyle from 'styles/StrainDisplay'

import Card from 'react-bootstrap'
import $ from 'jquery'
import CSS from 'utility/CSStool'

// const changeMe = async (event) => {
//     console.log('hey im being clicked')
//     let target = $(event.target)
//     // $(event.target).css('height', '400px')
//     CSS($(event.target), 'border', '5px solid white')
// }

export default function StrainDisplay (props) {
// export default function StrainDisplay (props:(string|object)) {
// if i do props:(object|string)
//     Type '{ clickedStrain: string; setClickedStrain: Dispatch<SetStateAction<string>>; }' is not assignable to type 'IntrinsicAttributes & (string | object)'.
//   Property 'clickedStrain' does not exist on type 'IntrinsicAttributes & object'.ts(2322)
    
    return (

    // return as any (
        // clickedStrain={props.clickedStrain}
        // <Display
    // 
        // <p> hi</p>
<>
        <CardStyle
        // <Display
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}
        >
            <div class="card">
            {/* <div class="card-body"> */}
                This is some text within a card body.
            {/* </div> */}
            </div>
    
         </CardStyle>            
         {/* </Display>             */}
</>
    )
}
