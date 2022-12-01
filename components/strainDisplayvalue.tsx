import styled from 'styled-components'
import CardStyle from 'styles/StrainDisplay'


export default async function StrainDisplayValue(props) {
    let columnclass = 'Column'
    let card = 'card' 
    let doubleCardClass = [card, columnclass].join(' ')
    // sister container to the original underdisplay of the rendererd strains
    // now [Left: Object.Keys(i.e. 'strain')] && [Right: Object.Values(i.e. Do-Si-Dos)]
    console.log('props')
    console.log(props)


    return (

        <CardStyle
        // <Display
            bgToggle={props.bgToggle} setBgToggle={props.setBgToggle}
            clickedStrain={props.clickedStrain} setClickedStrain={props.setClickedStrain}
        >
        <div className={doubleCardClass}>
            <p> right side container </p>
         </div>
        </CardStyle> 
    )
}
