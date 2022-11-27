import styled from 'styled-components'
import Display from 'styles/StrainDisplay'
import $ from 'jquery'
import CSS from 'utility/CSStool'

const changeMe = async (event) => {
    console.log('hey im being clicked')
    let target = $(event.target)
    CSS(target, 'border', '5px solid hotpink')
}
export default function StrainDisplay (props, {changeMe}) {
    console.log('props')
    console.log(props)
    return (
    // return as any (
        // clickedStrain={props.clickedStrain}
        // <Display
        // 
        <Display
        setClickedStrain={props.setClickedStrain}       
        onClick={changeMe}
        onMouseEnter={changeMe}
        clickedStrain={props.clickedStrain} 
        >
        <div>
                      
        </div>
         </Display>
    )
}
