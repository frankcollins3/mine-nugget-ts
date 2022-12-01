// @ts-nocheck
import styled from 'styled-components'
import CardStyle from 'styles/StrainDisplay'


export default function StrainDisplayValue(props) {
    console.log("hello from strain display values!")
    let columnclass = 'Column'
    let card = 'card' 
    let doubleCardClass = [card, columnclass].join(' ')
    // sister container to the original underdisplay of the rendererd strains
    // now [Left: Object.Keys(i.e. 'strain')] && [Right: Object.Values(i.e. Do-Si-Dos)]
    console.log('props in the strain display value')
    console.log(props)


    return (
        <>        
        <CardStyle        
        bgToggle={props.bgToggle} setBgToggle={props.setBgToggle}
        clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}                   
        >
        <div className={doubleCardClass}>
            {props.displayText}
        </div>
        </CardStyle> 
        </>
    )
}
