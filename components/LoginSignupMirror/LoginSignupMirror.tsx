

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_SEE_LOGIN_OR_SIGNUP, SET_LOGIN_EMAIL_INPUT, SET_LOGIN_PASSWORD_INPUT } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import LoginInput from 'components/LoginInput/LoginInput';
import SignupInput from 'components/SignupInput/SignupInput';
import SignupConstraints from 'components/SignupConstraints/SignupConstraints';
import styles from "./LoginSignupMirror.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function LoginSignupMirror() {
    return <RENDER/>
}

function RENDER() {
    const SEE_LOGIN_OR_SIGNUP = useSelector( (state:RootState) => state.loginSignup.SEE_LOGIN_OR_SIGNUP )
    const dispatch = useDispatch()
    const { mirror, helmet } = useImage()

    const loginSignupStateReset = () => {
        dispatch(SET_SEE_LOGIN_OR_SIGNUP(''))
        dispatch(SET_LOGIN_EMAIL_INPUT('@'))
        dispatch(SET_LOGIN_PASSWORD_INPUT('* * *'))


    }

    return (
        <Container id={styles.Cont}>
        <img onClick={loginSignupStateReset} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={helmet}/>
        {/* <img onClick={() => dispatch(SET_SEE_LOGIN_OR_SIGNUP(''))} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={helmet}/> */}
        {/* <img id={styles.mirror} src={mirror}/> */}

        {
            SEE_LOGIN_OR_SIGNUP === 'login'
                        ?
        <Container id={styles.mirror}>            
            <LoginInput inputType={"email"} />            
            <LoginInput inputType={"password"} />            
        </Container>
                        :
                        <>
        <Container id={styles.mirror}>            
            <SignupInput inputType={"username"} />            
            <SignupInput inputType={"email"} />            
            <SignupInput inputType={"age"} />            
            <SignupInput inputType={"password"} />                       
        </Container>
                <SignupConstraints/>
                        </>
        }


        </Container>
    )
}