import {useEffect} from "react"
import axios from 'axios'

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';

import
 {
     SET_SEE_LOGIN_OR_SIGNUP, SET_LOGIN_EMAIL_INPUT, TOGGLE_SUCCESSFUL_LOGIN, SET_LOGIN_PASSWORD_INPUT
 } from 'redux/loginSignup/loginSignupSlice';
 
import { SET_CURRENT_USER } from "redux/main/mainSlice";

// components and styles
import Container from "react-bootstrap/Container"
import LoginInput from 'components/LoginInput/LoginInput';
import SignupInput from 'components/SignupInput/SignupInput';
import SignupConstraints from 'components/SignupConstraints/SignupConstraints';
import styles from "./LoginSignupMirror.module.scss"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"
import { getUserWithIdStringFunc } from "graphql/queries";
import GoldRequestQL from "utility/GoldRequestQL"
import { clearCookie, getCookie } from "utility/utilityValues";

export default function LoginSignupMirror() {
    return <RENDER/>
}

function RENDER() {

    
    const SUCCESSFUL_LOGIN = useSelector( (state:RootState) => state.loginSignup.SUCCESSFUL_LOGIN)
    

    const { setallminersPROMISE, userLoginPROMISE, rememberMeCookiePROMISE } = usePromise()

    useEffect( () => {
            setallminersPROMISE()

            rememberMeCookiePROMISE()
            .then( (cookie) => {
                console.log('cookie in client promise',cookie)

                
                
                
        // const query = getUserWithIdStringFunc()
        //  axios.post('/api/graphql', {query:`${query}`})
        //  .then( (userWithId) => {
        //     console.log('clientside user in effect', userWithId)
        //  })

            

            })
    }, [])

    const SEE_LOGIN_OR_SIGNUP = useSelector( (state:RootState) => state.loginSignup.SEE_LOGIN_OR_SIGNUP )
    const dispatch = useDispatch()
    const { helmet, mine, kiss } = useImage()

    const loginSignupStateReset = () => {
        dispatch(SET_SEE_LOGIN_OR_SIGNUP(''))
        dispatch(SET_LOGIN_EMAIL_INPUT('@'))
        dispatch(SET_LOGIN_PASSWORD_INPUT('* * *'))
    }

    const loginUser = () => {
        // const query = userLoginQueryStringFunc(LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT)
        userLoginPROMISE()
        .then( (user:any) => {
            console.log('user in the', user)

            let cookies = getCookie()
            if (cookies[1]) {
                console.log('cookies', cookies)
                dispatch(TOGGLE_SUCCESSFUL_LOGIN())            
            } else {
                dispatch(SET_LOGIN_EMAIL_INPUT("Missed Me"))
                dispatch(SET_LOGIN_PASSWORD_INPUT("Dig again Please!"))
            }
        })              

    }

    // minimirror bighelmet

    return (
        <Container id={styles.Cont}>
        <img id={styles.helmet} onClick={loginSignupStateReset} src={helmet}/>
        {/* <img onClick={loginSignupStateReset} style={{ height: '25px', width: '25px', cursor: 'pointer' }} src={helmet}/> */}

        {
            SEE_LOGIN_OR_SIGNUP === 'login'
                        ?
                        <>
        <Container className="mirror" id={styles.mirror}>            
                        {
                            SUCCESSFUL_LOGIN
                                ?
                        <img style={{ height: '25px', width: '25px' }} src={kiss}/>
                                :
                                <>
                        <LoginInput inputType={"email"} />            
                        <LoginInput inputType={"password"} />            
                                </>
                        }
        </Container>
        <img className="mine" onClick={loginUser} style={{ height: '35px', width: '35px', boxShadow: '2px 2px 2px rgb(247, 208, 36)', borderRadius: '50%', cursor: 'pointer', marginTop: '0.5em' }} src={mine}/>
                        </>
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
