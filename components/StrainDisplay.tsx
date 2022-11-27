import styled from 'styled-components'
import Display from 'styles/StrainDisplay'

export default function StrainDisplay (props) {
    console.log('props')
    console.log(props)
    return (
    // return as any (
        // clickedStrain={props.clickedStrain}
        // <Display
        // 
        <Display
        setClickedStrain={props.setClickedStrain}       
        clickedStrain={props.clickedStrain} 
        >
        <div>
                      
        </div>

         </Display>
    )
}
