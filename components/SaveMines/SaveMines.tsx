import {useState} from "react"
// @reduxjs/toolkit global state management
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import axios from 'axios'
import { SET_VIEW_SELECTED_STRAIN, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE } from "redux/main/mainSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SaveMines.module.scss"

// utils
import { useImage } from "Contexts/Img"

export default function SaveMines() {    
    return <RENDER></RENDER>
}

function RENDER () {
    const { pick } = useImage()
    const [hoverShow, setHoverShow] = useState(false)
    const VIEW_SELECTED_STRAIN = useSelector( (state:RootState) => state.main.VIEW_SELECTED_STRAIN)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    
    const saveStrainToMinersOnStrains = () => {
        
        const username = CURRENT_USER.username
        const strainName = VIEW_SELECTED_STRAIN.strainValues.strain

        console.log('username', username)
        console.log('strainName', strainName)
        
        console.log('lets see!')

        console.log('currentuser', CURRENT_USER)
        console.log('view selected strain', VIEW_SELECTED_STRAIN)
        axios.post('/api/graphql', { 
            query: 
            `
            mutation { addMinersOnStrains(username: "${CURRENT_USER.username}", strain:"${VIEW_SELECTED_STRAIN.strainValues.strain}") {
                minersId,
                strainsid
                  } 
            }
            `
         }).then( (savedStrain) => {
            console.log('savedStrain', savedStrain)
         })
        
        }

    return (
        <>

    <Container onMouseLeave={() => setHoverShow(false)} id={styles.ValueCont}>        
        {
            hoverShow
                ?
     <img onClick={saveStrainToMinersOnStrains} style={{ cursor: 'pointer' }} id={styles.pick} src={pick}/> 
                :
    <pre 
        onMouseEnter={() => setHoverShow(true)}
        style={{ backgroundColor: 'transparent', color: 'papayawhip' }} 
        className={styles.pre}> Dig {VIEW_SELECTED_STRAIN.strainValues.strain} From Mines <span className={styles.span}>?</span> 
    </pre>
        }
    </Container>        
        
        </>
    )
}