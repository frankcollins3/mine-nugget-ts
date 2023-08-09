import {useState} from 'react'
// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_LOGIN_EMAIL_INPUT, SET_LOGIN_PASSWORD_INPUT } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./LoginInput.module.scss"
import { PromiseProvider } from 'Contexts/Promises';

// utils
import { LoginInterface } from 'utility/InterfaceTypes';
import { nothing } from 'utility/utilityValues';

export default function LoginInput(props: LoginInterface) {
    return <RENDER inputType={props.inputType} />
}


const RENDER = (props:LoginInterface) => {
    const [alreadyFocusedEmail, setAlreadyFocusedEmail] = useState(false)
    const [alreadyFocusedPassword, setAlreadyFocusedPassword] = useState(false)

    const dispatch = useDispatch()

    const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value:string = event.target.value
            dispatch(SET_LOGIN_PASSWORD_INPUT(value))
            return ""
    };

    const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_LOGIN_EMAIL_INPUT(event.target.value))
        return ""
    }

    const passwordReset = () => { 
        if (alreadyFocusedEmail === false) {
            dispatch(SET_LOGIN_PASSWORD_INPUT('')) 
        }
        setAlreadyFocusedEmail(true)
    }
    const emailReset = () => {
        if (alreadyFocusedPassword === false) {
            dispatch(SET_LOGIN_EMAIL_INPUT('')) 
        }
        setAlreadyFocusedPassword(true)    
    }


    const LOGIN_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_EMAIL_INPUT)
    const LOGIN_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_PASSWORD_INPUT)
    const LOGIN_PASSWORD_INPUT_SEE_TEXT = useSelector( (state:RootState) => state.loginSignup.LOGIN_PASSWORD_INPUT_SEE_TEXT)
    const inputType = props.inputType

    return (
        // inputType = "password" ? type="password" magnify.png to toggle on/off. 
        <input 
        className={styles.input} 

        // type={inputType === "password" && "password" || inputType === "email" && "text"}
        type={inputType === "password" ? LOGIN_PASSWORD_INPUT_SEE_TEXT ? "text" : "password" : "text"}

        spellCheck="false"
        value={inputType === "password" ? LOGIN_PASSWORD_INPUT : inputType === "email" ? LOGIN_EMAIL_INPUT : "" }
        // value={inputType === "password" && LOGIN_PASSWORD_INPUT || inputType === "email" && LOGIN_EMAIL_INPUT }
        onChange={inputType === "password" ? passwordInputHandler : inputType === "email" ? emailInputHandler : nothing }
        onFocus={inputType === "password" ? passwordReset : inputType === "email" ? emailReset : nothing }
        // type="text"
        />        
    )
}
