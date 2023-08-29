import { useState, useEffect} from "react"

// @reduxjs/toolkit global state management.
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT} from "redux/main/mainSlice"

// components and styles
import Container from "react-bootstrap/Container"
import CanvasGame from "components/MineCanvas"
import SaveMines from "components/SaveMines"
import styles from "./StrainFooter.module.scss"


// utils 
import { strainsINTERFACE } from "utility/InterfaceTypes"
import { findStrainFromAllStrains, keysAndValuesFromStrain, nonGenericKeysAndValuesFromStrain } from "utility/utilityValues"
import {objectKeysFunc} from "utility/interfaceHelperFuncs"
import {useImage} from "Contexts/Img"

import {usePromise} from "Contexts/Promises"

export default function StrainFooter() {
    const dispatch = useDispatch()

    const VIEW_SELECTED_STRAIN_INDEX = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_INDEX)        
    const SELECTED_STRAIN_SAVE_OR_NOT = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_OR_NOT)        

    const { strainIndexIncrementPROMISE } = usePromise()
    
    


    useEffect( () => { strainIndexIncrementPROMISE() }, [VIEW_SELECTED_STRAIN_INDEX])

    return (
        <Container id={styles.StrainFooterCont}>
            {
                SELECTED_STRAIN_SAVE_OR_NOT
                ?  <RENDERSAVE></RENDERSAVE>
                : <RENDERDISPLAY></RENDERDISPLAY>
            }
        
        </Container>
    )
    
}

function RENDERDISPLAY() {    
    const VIEW_SELECTED_STRAIN_KEY = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_KEY)        
    const VIEW_SELECTED_STRAIN_VALUE = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_VALUE)        
    const SELECTED_STRAIN_SAVE_OR_NOT = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_OR_NOT)        
    return (
        <>
        <Container id={styles.ValueCont}>        

        <span className={styles.span}> {VIEW_SELECTED_STRAIN_KEY} </span>
        <pre className={styles.pre}> {VIEW_SELECTED_STRAIN_VALUE} </pre>

        {/* <CanvasGame/> */}

        </Container>        
        </>
    )
}
function RENDERSAVE() {    
    const { pick } = useImage()
    // const VIEW_SELECTED_STRAIN_KEY = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_KEY)        
    // const VIEW_SELECTED_STRAIN_VALUE = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN_VALUE)        
    // const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)        
    const [hoverShow, setHoverShow] = useState(false)
    
    return (
        <>  
        <SaveMines></SaveMines>
    {/* <Container onMouseLeave={() => setHoverShow(false)} id={styles.ValueCont}>        
        {
            hoverShow
                ?
     <img style={{ cursor: 'pointer' }} id={styles.pick} src={pick}/> 
                :
    <pre 
        onMouseEnter={() => setHoverShow(true)}
        style={{ backgroundColor: 'transparent', color: 'papayawhip' }} 
        className={styles.pre}> Dig {VIEW_SELECTED_STRAIN.strainValues.strain} From Mines <span className={styles.span}>?</span> 
    </pre>
        }
    </Container>         */}        
        </>
    )
}
