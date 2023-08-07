
// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_SIGNUP_USERNAME_INPUT, SET_SIGNUP_EMAIL_INPUT, SET_SIGNUP_AGE_INPUT, SET_SIGNUP_PASSWORD_INPUT } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SignupInput.module.scss"

// utils
import { SignupInterface } from 'utility/InterfaceTypes';

export default function SignupInput(props: SignupInterface) {
    return <RENDER inputType={props.inputType} />
}


const RENDER = (props:SignupInterface) => {
    const inputType = props.inputType
    const dispatch = useDispatch()

    const signupInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (inputType === "username") { dispatch(SET_SIGNUP_USERNAME_INPUT(event.target.value)) }
            if (inputType === "email") { dispatch(SET_SIGNUP_EMAIL_INPUT(event.target.value)) }
            if (inputType === "age") { dispatch(SET_SIGNUP_AGE_INPUT(event.target.value)) }
            if (inputType === "password") { dispatch(SET_SIGNUP_PASSWORD_INPUT(event.target.value)) }
    }

    // const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //         let value:string = event.target.value
    //         // dispatch(SET_LOGIN_PASSWORD_INPUT(value))
    //         dispatch(SET_SIGNUP_PASSWORD_INPUT(value))
    // };

    // const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // dispatch(SET_LOGIN_EMAIL_INPUT(event.target.value))
    // }

    // const usernameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    // }

    // const ageInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

    // }

    const reset = () => {
            if (inputType === "username") { dispatch(SET_SIGNUP_USERNAME_INPUT('')) }
            if (inputType === "email") { dispatch(SET_SIGNUP_EMAIL_INPUT('')) }
            if (inputType === "age") { dispatch(SET_SIGNUP_AGE_INPUT('')) }
            if (inputType === "password") { dispatch(SET_SIGNUP_PASSWORD_INPUT('')) }
    }

    const SIGNUP_USERNAME_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_USERNAME_INPUT)
    const SIGNUP_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_EMAIL_INPUT)
    const SIGNUP_AGE_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_AGE_INPUT)
    const SIGNUP_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_INPUT)


    return (
        <input 
        className={styles.input} 
        type="text"
        spellCheck="false"
        value=
        {
            inputType === "username" ? SIGNUP_USERNAME_INPUT :
            inputType === "email" ? SIGNUP_EMAIL_INPUT : 
            inputType === "age" ? SIGNUP_AGE_INPUT : 
            inputType === "password" ? SIGNUP_PASSWORD_INPUT : ""
        }
        onChange={signupInputHandler}
        onFocus={reset}
        />        
    )
}