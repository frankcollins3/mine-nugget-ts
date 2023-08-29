import {useState} from "react"

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_SEE_LOGIN_OR_SIGNUP } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./LoginSignupHelmet.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function LoginSignupHelmet() {
    return <RENDER></RENDER>    
}



const RENDER = () => {
    const dispatch = useDispatch()

    const [helmetClick, setHelmetClick] = useState(false)
    const { helmet, gold } = useImage()

    const toggleHelmetClick = () => {
        setHelmetClick(helmetClick ? false : true)
        // console.log("toggle Helmet Click")
        // setHelmetClick(true)
    }

    return (
        <Container id={styles.Cont}>
            <pre className={styles.ghostPre}> hey </pre>
            <img style={{ height: helmetClick && "25px",  width: helmetClick && "25px" }} onClick={toggleHelmetClick} id={styles.helmet} src={helmet}/>

            <Container style={{ display: helmetClick ? "" : "none" }} id={styles.rowCont}>

            <Container className={styles.columnCont}>
            <img onClick={() => dispatch(SET_SEE_LOGIN_OR_SIGNUP("login"))} className={styles.goldLoginSignup} src={gold}/>
            <pre className={styles.loginSignupPre}> Login </pre>
            </Container>

            <Container className={styles.columnCont}>
            <img onClick={() => dispatch(SET_SEE_LOGIN_OR_SIGNUP("signup"))} className={styles.goldLoginSignup} src={gold}/>
            <pre className={styles.loginSignupPre}> Signup </pre>
            </Container>

            </Container>

            <pre className={styles.ghostPre}> yoooo </pre>
        </Container>

    )
}