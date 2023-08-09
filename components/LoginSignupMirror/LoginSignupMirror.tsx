import {useEffect, useState} from "react"
import axios from 'axios'

// @reduxjs/toolkit global state management
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';

import
 {
     SET_SEE_LOGIN_OR_SIGNUP, SET_LOGIN_EMAIL_INPUT, TOGGLE_SUCCESSFUL_LOGIN, SET_LOGIN_PASSWORD_INPUT, INCREMENT_INCORRECT_LOGIN_ATTEMPT, RESET_INCORRECT_LOGIN_ATTEMPT, TOGGLE_LOGIN_PASSWORD_INPUT_SEE_TEXT, TOGGLE_REMEMBER_ME_USER
 } from 'redux/loginSignup/loginSignupSlice';
 
import { SET_CURRENT_USER } from "redux/main/mainSlice";

// components and styles
// import GoldMineCapptcha, {COMPLETE} from "capptcha/GoldMineCapptcha";
import GoldMineCapptcha from "components/GoldMineCapptcha";
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
    const INCORRECT_LOGIN_ATTEMPT = useSelector( (state:RootState) => state.loginSignup.INCORRECT_LOGIN_ATTEMPT)
    const REMEMBER_ME_USER = useSelector( (state:RootState) => state.loginSignup.REMEMBER_ME_USER)
    const SEE_LOGIN_OR_SIGNUP = useSelector( (state:RootState) => state.loginSignup.SEE_LOGIN_OR_SIGNUP )

    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    const [triedRememberMe, setTriedRememberMe] = useState(false)

    const { setallminersPROMISE, userLoginPROMISE, rememberMeCookiePROMISE } = usePromise()

    useEffect( () => {
            setallminersPROMISE()        
    }, [])

            
    


    const dispatch = useDispatch()
    const { helmet, mine, kiss, magnify, yesCursor, noCursor } = useImage()

    const loginSignupStateReset = () => {
        dispatch(SET_SEE_LOGIN_OR_SIGNUP(''))
        dispatch(SET_LOGIN_EMAIL_INPUT('@'))
        dispatch(SET_LOGIN_PASSWORD_INPUT('* * *'))
    }

    const loginUser = () => {
        // const query = userLoginQueryStringFunc(LOGIN_EMAIL_INPUT, LOGIN_PASSWORD_INPUT)
        userLoginPROMISE()
        .then(async(user:any) => {
            console.log('user in the', user)

            let cookies = getCookie()
            if (cookies[1]) {
                console.log('cookies', cookies)
                await dispatch(TOGGLE_SUCCESSFUL_LOGIN())     
                setTimeout( () => { window.location.href = "/strain" }, 1000)       
            } else {
                dispatch(INCREMENT_INCORRECT_LOGIN_ATTEMPT())
                dispatch(SET_LOGIN_EMAIL_INPUT("Missed Me"))
                dispatch(SET_LOGIN_PASSWORD_INPUT("Dig again Please!"))
            }
        })              

    }

// this is so npm i capptcha doesn't have to force the user to use redux and possibly have definition errors package-side with redux that isn't used:       dispatch(resetFunc()) send invoke ready.
    const reset = () => { dispatch(RESET_INCORRECT_LOGIN_ATTEMPT()) }

    const rejectRememberMe = () => {
        if (CURRENT_USER.username.length) {
            dispatch(TOGGLE_REMEMBER_ME_USER())
            clearCookie('id')
            clearCookie('token')
        }
    }

    const tryToRememberMe = () => {
        console.log("trying hard")
        if (triedRememberMe === false) {
            rememberMeCookiePROMISE()
            .then( (userFromCookie) => {
                console.log('user in client', userFromCookie)
                if (userFromCookie) {
                    userFromCookie = userFromCookie.data.data.getUserWithId
                    console.log('userFromCookie', userFromCookie)
                    dispatch(SET_CURRENT_USER(userFromCookie))
                    dispatch(TOGGLE_REMEMBER_ME_USER())
                }
            })
        }
        setTriedRememberMe(true)
    }

    return (
        
        <Container onMouseEnter={tryToRememberMe} id={styles.Cont}>
        <img id={styles.helmet} onClick={loginSignupStateReset} src={helmet}/>
        {
            SEE_LOGIN_OR_SIGNUP === 'login'
                        &&
                        <>
                        {
                            INCORRECT_LOGIN_ATTEMPT > 1 
                                        ?                    
                    <GoldMineCapptcha resetFunc={reset}/>
                                        :
                                        <>
                <Container className="mirror" id={styles.mirror}>            
                                {
                                    SUCCESSFUL_LOGIN || REMEMBER_ME_USER
                                        ?
                                        <>
            <img onClick={() => window.location.href = "/strain"} style={{ height: '25px', width: '25px', cursor:  REMEMBER_ME_USER ? `url('${yesCursor}'), auto` : "pointer"  }} src={kiss}/>
            {/* <img onClick={() => window.location.href = "/"} style={{ height: '25px', width: '25px', cursor: { REMEMBER_ME_USER ? `url('${yesCursor}'), auto` : "pointer" } }} src={kiss}/> */}
                                {
                                    REMEMBER_ME_USER &&
                                    <>                                        
                                    <pre style={{ color: '#B31B38', fontFamily: 'Moon Dance', }} > Miss You { CURRENT_USER ? CURRENT_USER.username : ""} </pre>
                                {/* <pre style={{ color: '#B31B38', fontFamily: 'Moon Dance', cursor: `url('${noCursor}'), auto`}}> X </pre> */}
                                <pre onClick={rejectRememberMe} style={{ color: '#B31B38', fontFamily: 'Moon Dance', cursor: `url('${noCursor}'), auto`}}> X </pre>

                                    </>
                                }
                                        </>
                                        :
                                        <>
                                <LoginInput inputType={"email"} />            
                                <LoginInput inputType={"password"} />            
                                        </>
                                }
                </Container>
                <>
                <img className="mine" onClick={loginUser} style={{ height: '35px', width: '35px', boxShadow: '2px 2px 2px rgb(247, 208, 36)', borderRadius: '50%', cursor: 'pointer', marginTop: '0.5em' }} src={mine}/>
        <img onClick={() => dispatch(TOGGLE_LOGIN_PASSWORD_INPUT_SEE_TEXT())} style={{ height: '15px', width: '15px', marginTop: '0.5em', position: 'relative', left: '2px'}} src={magnify}/>
                </>
                
                                        </>
                        }
                        </>
        }

            { 

            SEE_LOGIN_OR_SIGNUP === 'signup' &&
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
