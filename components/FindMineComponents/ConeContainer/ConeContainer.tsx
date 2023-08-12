
// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {TOGGLE_SHOW_FEED} from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./ConeContainer.module.scss"


// utils
import {useImage} from "Contexts/Img"


export default function ConeContainer() {
    
    return <RENDER/>
}

function RENDER() {
    const dispatch = useDispatch()
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)

    const {signUpSigns} = useImage()
    

    return (
        <>
        <Container id={styles.coneContainer}>
            {
                SHOW_FEED 
                ?  
                <>
                <img onClick={() => dispatch(TOGGLE_SHOW_FEED())} className={styles.cone} src={signUpSigns}/>
                <img onClick={() => dispatch(TOGGLE_SHOW_FEED())} className={styles.cone} src={signUpSigns}/>
                <img onClick={() => dispatch(TOGGLE_SHOW_FEED())} className={styles.cone} src={signUpSigns}/>                
                </> 
                : 
                <img onClick={() => dispatch(TOGGLE_SHOW_FEED())} className={styles.cone} src={signUpSigns}/>
            }
    
            
        </Container>
    
        </>    
    )
}

