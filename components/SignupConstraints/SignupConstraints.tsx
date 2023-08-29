import {useEffect} from "react"
import axios from 'axios'

// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { 
    SET_CHECKED, TOGGLE_PASSWORD_UPPERCASE, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_TOO_EZ,
    TOGGLE_EMAIL_UNIQUE, TOGGLE_EMAIL_EXTENSION, SET_EMAIL_EXTENSION_UI, TOGGLE_USERNAME_LENGTH, TOGGLE_USERNAME_UNIQUE, SET_SEE_LOGIN_OR_SIGNUP,
} from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SignupConstraints.module.scss"
import Checkbox from './Checkbox/Checkbox';
import PasswordConstraints from "components/SignupConstraints/PasswordConstraints"
import UsernameConstraints from "./UsernameConstraints/UsernameConstraints";
import EmailConstraints from "components/SignupConstraints/EmailConstraints"

// utils
import {useRegex} from "Contexts/Regex"
import {usePromise} from "Contexts/Promises"
import {useImage} from "Contexts/Img"
import { userSignupQueryStringFunc } from "graphql/queries";
import { minersINTERFACE } from "utility/InterfaceTypes"

export default function SignupConstraints() {
    return <RENDER/>
}

const RENDER = () => {
    const { MemailExtension } = useRegex()
    const { passwordWordMatchPROMISE, localPasswordCheckerPROMISE, emailInputPROMISE, usernameInputPROMISE, userSignupPROMISE } = usePromise()
    const { gold, mine } = useImage()

    const dispatch = useDispatch()
    const CHECKED = useSelector( (state:RootState) => state.loginSignup.CHECKED)
    const SIGNUP_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_INPUT)
    const PASSWORD_UPPERCASE = useSelector( (state:RootState) => state.loginSignup.PASSWORD_UPPERCASE)
    const PASSWORD_LENGTH_PASS = useSelector( (state:RootState) => state.loginSignup.PASSWORD_LENGTH_PASS)
    const PASSWORD_NUMBER_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_NUMBER_CHAR)
    const PASSWORD_SPECIAL_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_SPECIAL_CHAR)
    const PASSWORD_TOO_EZ = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ)
    const PASSWORD_TOO_EZ_BANK = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ_BANK)

    const SIGNUP_EMAIL_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_EMAIL_INPUT)
    const EMAIL_UNIQUE = useSelector( (state:RootState) => state.loginSignup.EMAIL_UNIQUE)
    const EMAIL_EXTENSION = useSelector( (state:RootState) => state.loginSignup.EMAIL_EXTENSION)
    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)
    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)

    const SIGNUP_USERNAME_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_USERNAME_INPUT)
    const USERNAME_LENGTH = useSelector( (state:RootState) => state.loginSignup.USERNAME_LENGTH)
    const USERNAME_UNIQUE = useSelector( (state:RootState) => state.loginSignup.USERNAME_UNIQUE)
    
    const SIGNUP_AGE_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_AGE_INPUT)
    
    useEffect( () => {

        Promise.all([passwordWordMatchPROMISE(), localPasswordCheckerPROMISE()])

    }, [SIGNUP_PASSWORD_INPUT])

    useEffect( () => {
        emailInputPROMISE()
    }, [SIGNUP_EMAIL_INPUT])

    useEffect( () => {
        usernameInputPROMISE()
        
    }, [SIGNUP_USERNAME_INPUT])

    const sty = styles
    let boxcont = [sty.checkboxcontainer, 'tag'].join("")

    const checkboxclick = (id) => {
        console.log('id', id)
        if (CHECKED !== id) {
            dispatch(SET_CHECKED(id))
        } else if (CHECKED === id) {
            dispatch(SET_CHECKED(''))
        }
    }

    const hovercheck = () => {
        console.log('CHECKED', CHECKED)
        console.log('length', CHECKED.length)
    }

    const userSignupSubmit = () => {
        userSignupPROMISE()
        .then( (user) => {
            console.log('user clientside!! !! !!', user)
            if (user.username) {
                dispatch(SET_SEE_LOGIN_OR_SIGNUP('login'))
            }
        })                            
    }

    return (
        <Container id={styles.constraintGrid}>  
        {
            USERNAME_LENGTH && USERNAME_UNIQUE === false && parseInt(SIGNUP_AGE_INPUT) > 10 &&
            EMAIL_EXTENSION && !EMAIL_UNIQUE &&
            PASSWORD_UPPERCASE && PASSWORD_NUMBER_CHAR && PASSWORD_SPECIAL_CHAR && PASSWORD_LENGTH_PASS && !PASSWORD_TOO_EZ 
                                            ?
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '0.25em'}}>
                <img onClick={userSignupSubmit} style={{ height: '35px', width: '35px', boxShadow: '2px 2px 2px rgb(247, 208, 36)', borderRadius: '50%', cursor: 'pointer' }} src={mine}/>
                                    <pre style={{ color: 'rgb(62, 50, 32)', fontSize: '18px', fontFamily: 'Josefin Sans', fontWeight: 'bolder',   }}> Dig Mines ? </pre>
                                            </Container>
                                            :
                                            <>
                            <Container id={styles.constraintA}>
                            <Checkbox cb={1}/>
                            <Checkbox cb={2}/>
                            <Checkbox cb={3}/>
                            </Container>
                            <Container id={styles.constraintB}>
                                    { CHECKED === "cb1" && <UsernameConstraints/> }
                                    { CHECKED === "cb2" && <PasswordConstraints/> }
                                    { CHECKED === "cb3" && <EmailConstraints/> }
                            </Container>
                                            </>
        }

        </Container>
    )
}