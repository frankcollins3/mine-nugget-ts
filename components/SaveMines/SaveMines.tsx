import {useState} from "react"
// @reduxjs/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import axios from 'axios'
import { TOGGLE_HOVER_EVEN_ODD, TOGGLE_SELECTED_STRAIN_SAVE_ERROR } from "redux/main/mainSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SaveMines.module.scss"

// utils
import { useImage } from "Contexts/Img"

export default function SaveMines() {    
    return <RENDER></RENDER>
}

function RENDER () {
    const dispatch = useDispatch()

    const { pick, caution } = useImage()
    const [hoverShow, setHoverShow] = useState(false)    

    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)
    const HOVER_EVEN_ODD = useSelector( (state:RootState) => state.main.HOVER_EVEN_ODD)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const SELECTED_STRAIN_SAVE_ERROR = useSelector( (state:RootState) => state.main.SELECTED_STRAIN_SAVE_ERROR)
    

    
    const saveStrainToMinersOnStrains = () => {
        
        const username = CURRENT_USER.username
        const strainName = VIEW_SELECTED_STRAIN.strainValues.strain

        console.log('username', username)
        console.log('strainName', strainName)
        
        console.log('lets see!')

        console.log('currentuser', CURRENT_USER)
        console.log('view selected strain', VIEW_SELECTED_STRAIN)
        axios.post('/api/graphql', { 
            // mutation { addMinersOnStrains(username: "${CURRENT_USER.username}", strain:"chase") {
            query: 
            `
                mutation { addMinersOnStrains(username: "${CURRENT_USER.username}", strain:"${VIEW_SELECTED_STRAIN.strainValues.strain}") {
                minersId,
                strainsid
                  } 
            }
            `
         }).then( (savedStrain) => {
            console.log('savedStrain client!', savedStrain)
            if (savedStrain.data.errors) {
                if (savedStrain.data.errors[0]) {
                    console.log("weve found an error!");
                    if (SELECTED_STRAIN_SAVE_ERROR === false) {
                        dispatch(TOGGLE_SELECTED_STRAIN_SAVE_ERROR())
                    }
                }
            }
         }).catch( (error) => {
            console.log('error', error)
         })
        
        }

        const containerLeave = () => {
            setHoverShow(false)
            dispatch(TOGGLE_HOVER_EVEN_ODD())
            if (SELECTED_STRAIN_SAVE_ERROR === true) {
                dispatch(TOGGLE_SELECTED_STRAIN_SAVE_ERROR())
            }
        }

    return (
        <>

    <Container onMouseLeave={containerLeave} id={styles.ValueCont}>        
    {/* <Container onMouseLeave={() => setHoverShow(false)} id={styles.ValueCont}>         */}
        {
            hoverShow
                ?
     <img onClick={saveStrainToMinersOnStrains} style={{ cursor: 'pointer' }} id={styles.pick} src={SELECTED_STRAIN_SAVE_ERROR ? caution : pick}/> 
                :
    <pre 
        onMouseEnter={() => setHoverShow(true)}
        style={{ backgroundColor: 'transparent', color: 'papayawhip' }} 
        className={styles.pre}
        > 
        {/* Dig {VIEW_SELECTED_STRAIN.strainValues.strain} From Mines <span className={styles.span}>?</span>  */}
        {HOVER_EVEN_ODD ? "Mine To Be Gold ?" : "Gold To Be Mine ?"}
    </pre>
        }
    </Container>        
        
        </>
    )
}
