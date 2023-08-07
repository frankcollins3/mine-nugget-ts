
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

export default function LoginInput(props: LoginInterface) {
    return <RENDER inputType={props.inputType} />
}


const RENDER = (props:LoginInterface) => {
    const dispatch = useDispatch()

    const passwordInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            let value:string = event.target.value
            dispatch(SET_LOGIN_PASSWORD_INPUT(value))
    };

    const emailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SET_LOGIN_EMAIL_INPUT(event.target.value))
    }

    const passwordReset = () => { dispatch(SET_LOGIN_PASSWORD_INPUT('')) }
    const emailReset = () => { dispatch(SET_LOGIN_EMAIL_INPUT('')) }


    const LOGIN_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_EMAIL_INPUT)
    const LOGIN_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.LOGIN_PASSWORD_INPUT)
    const inputType = props.inputType

    return (
        // inputType = "password" ? type="password" magnify.png to toggle on/off. 
        <input 
        className={styles.input} 

        // type={inputType === "password" && "password" || inputType === "email" && "text"}
        type="text"

        spellCheck="false"
        value={inputType === "password" ? LOGIN_PASSWORD_INPUT : inputType === "email" ? LOGIN_EMAIL_INPUT : "" }
        // value={inputType === "password" && LOGIN_PASSWORD_INPUT || inputType === "email" && LOGIN_EMAIL_INPUT }
        onChange={inputType === "password" ? passwordInputHandler : inputType === "email" ? emailInputHandler : "" }
        onFocus={inputType === "password" ? passwordReset : inputType === "email" ? emailReset : "" }
        // type="text"
        />        
    )
}