
// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_SEE_LOGIN_OR_SIGNUP, SET_LOGIN_EMAIL_INPUT, SET_LOGIN_PASSWORD_INPUT } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SignupConstraints.module.scss"

// utils


export default function SignupConstraints() {
    return <RENDER/>
}

const RENDER = () => {
    return (
        <Container id={styles.constraintGrid}>  
        
        </Container>
    )
}