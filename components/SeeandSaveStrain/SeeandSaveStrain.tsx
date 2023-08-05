

//  @reduxjs/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {
    SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE
} from "redux/main/mainSlice"

// components and styles
import Container from 'react-bootstrap/Container'
import styles from "./SeeandSaveStrain.module.scss"

// utils
import { strainsINTERFACE } from "utility/InterfaceTypes"
import { findStrainFromAllStrains, keysAndValuesFromStrain } from "utility/utilityValues"
import {nonGenericObjectKeysFunc, nonGenericObjectValsFunc} from "utility/interfaceHelperFuncs"

import { usePromise } from "Contexts/Promises"


interface Props {
    strain: string
}

export default function SeeandSaveStrain(props: Props) {    

    
    const strain = props.strain

    return (
        <Container id={styles.Cont}>
        <RENDER strain={strain}></RENDER>
        </Container>
    ) 
}

function RENDER( { strain } ) {

    const { deleteEndpointsPROMISE, strainClickPROMISE } = usePromise()

    const dispatch = useDispatch()
    const ALL_STRAINS = useSelector( (state:RootState) => state.main.ALL_STRAINS)        
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)        
    const VIEW_SELECTED_STRAIN_INDEX = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_INDEX)            

    
    
    const strainClick = async (strain) => {        
        
        let clickedStrain = findStrainFromAllStrains(strain, ALL_STRAINS)
        clickedStrain = await deleteEndpointsPROMISE(clickedStrain)
        .then( (clickedStrain:any) => {
            console.log('clickedStrain in the promise then',clickedStrain)
            if (clickedStrain.strainValues) {
                console.log('strainValues in if', clickedStrain.strainValues)
            // if (strain.length > 1 && strain !== VIEW_SELECTED_STRAIN.strainValues ? VIEW_SELECTED_STRAIN.strainValues.strain : ''){

                if (strain.length > 1 && VIEW_SELECTED_STRAIN.strainValues && strain === VIEW_SELECTED_STRAIN.strainValues.strain ) {
                // if (strain.length > 1 && strain === VIEW_SELECTED_STRAIN.strainValues.strain ) {
                    console.log('newstrain client PROMISE', clickedStrain)
                    dispatch(SET_VIEW_SELECTED_STRAIN(clickedStrain))    
                    dispatch(SET_VIEW_SELECTED_STRAIN_INDEX(VIEW_SELECTED_STRAIN_INDEX + 1))            

                } else {
                    console.log("strain is not equal");
                    dispatch(SET_VIEW_SELECTED_STRAIN(clickedStrain))
                    dispatch(SET_VIEW_SELECTED_STRAIN_KEY("strain"))
                    dispatch(SET_VIEW_SELECTED_STRAIN_VALUE(strain))
                    dispatch(SET_VIEW_SELECTED_STRAIN_INDEX(1))
                }
            }
        })

}    
    return (
        <>
        {/* <ul> */}
            <li onClick={() => strainClickPROMISE(strain)} className={styles.li}> {strain} </li>
            {/* <h1> {strain || 'strain string instead' } </h1> */}
        </>
        // </ul>
    )
}