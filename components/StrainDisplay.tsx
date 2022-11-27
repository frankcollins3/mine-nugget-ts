// @ts-nocheck
import styled from 'styled-components'
import Display from 'styles/StrainDisplay'
import $ from 'jquery'
import CSS from 'utility/CSStool'

// const changeMe = async (event) => {
//     console.log('hey im being clicked')
//     let target = $(event.target)
//     // $(event.target).css('height', '400px')
//     CSS($(event.target), 'border', '5px solid white')
// }

export default function StrainDisplay (props) {
    
    return (

    // return as any (
        // clickedStrain={props.clickedStrain}
        // <Display
    // 
        // <p> hi</p>
<>
        <Display
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}
        >
            <div>

            </div>
  
    
         </Display>            
</>
    )
}
