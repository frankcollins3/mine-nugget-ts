import {useEffect} from "react"

// @reduxjs/toolkit
import {useSelector, useDispatch} from 'react-redux'
import { RootState } from 'redux/store/rootReducer';
import { SET_CHECKED, TOGGLE_PASSWORD_UPPERCASE, TOGGLE_PASSWORD_NUMBER_CHAR, TOGGLE_PASSWORD_SPECIAL_CHAR, TOGGLE_PASSWORD_TOO_EZ } from 'redux/loginSignup/loginSignupSlice';

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./SignupConstraints.module.scss"
import Checkbox from './Checkbox/Checkbox';

// utils
import {useRegex} from "Contexts/Regex"
import {usePromise} from "Contexts/Promises"
import {useImage} from "Contexts/Img"

export default function SignupConstraints() {
    return <RENDER/>
}

const RENDER = () => {
    const { RhasNums, RhasCaps, RhasSpecialChar } = useRegex()
    const { passwordWordMatchPROMISE, localPasswordCheckerPROMISE } = usePromise()
    const { gold } = useImage()

    const dispatch = useDispatch()
    const CHECKED = useSelector( (state:RootState) => state.loginSignup.CHECKED)
    const SIGNUP_PASSWORD_INPUT = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_INPUT)
    const PASSWORD_UPPERCASE = useSelector( (state:RootState) => state.loginSignup.PASSWORD_UPPERCASE)
    const PASSWORD_LENGTH_PASS = useSelector( (state:RootState) => state.loginSignup.PASSWORD_LENGTH_PASS)
    const PASSWORD_NUMBER_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_NUMBER_CHAR)
    const PASSWORD_SPECIAL_CHAR = useSelector( (state:RootState) => state.loginSignup.PASSWORD_SPECIAL_CHAR)
    const PASSWORD_TOO_EZ = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ)
    const PASSWORD_TOO_EZ_BANK = useSelector( (state:RootState) => state.loginSignup.PASSWORD_TOO_EZ_BANK)

    useEffect( () => {

                // let numberPattern = /\d+/g;
                // let upperCasePattern = /[A-Z\s]/g;
                // let specialPattern = /[!@#$%&*?]/g;
                // let onlyLettersPattern = /[a-zA-Z]/g;

                // let uppercaseRegex = passwordinputstring.match(upperCasePattern)            
                // let regexnumber = passwordinputstring.match(numberPattern)                                   
                // let specialRegex = passwordinputstring.match(specialPattern)

        // const localPasswordChecker = () => {            
        //     if (/\d+/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_NUMBER_CHAR === false) {
        //         // if (PASSWORD_NUMBER_CHAR === false) {
        //             dispatch(TOGGLE_PASSWORD_NUMBER_CHAR())
        //             // }
        //         }
        //         else if (PASSWORD_NUMBER_CHAR === true && !/\d+/g.test(SIGNUP_PASSWORD_INPUT)) {
        //         dispatch(TOGGLE_PASSWORD_NUMBER_CHAR())
        //     }
            
        //     if (/[A-Z\s]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_UPPERCASE === false) {
        //         dispatch(TOGGLE_PASSWORD_UPPERCASE())
        //     } else if (!/[A-Z\s]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_UPPERCASE === true) {
        //         dispatch(TOGGLE_PASSWORD_UPPERCASE())
        //     }
            
        //     if (/[!@#$%^&()*?<>,.=+-]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_SPECIAL_CHAR === false) {
        //         dispatch(TOGGLE_PASSWORD_SPECIAL_CHAR())
        //     } else if (!/[!@#$%^&()*?<>,.=+-]/g.test(SIGNUP_PASSWORD_INPUT) && PASSWORD_SPECIAL_CHAR === true ){
        //         dispatch(TOGGLE_PASSWORD_SPECIAL_CHAR())
        //     }            
        // }
        // use a match count to check integer if any of the characters match! if they do add it. 

        Promise.all([passwordWordMatchPROMISE(), localPasswordCheckerPROMISE()])

    }, [SIGNUP_PASSWORD_INPUT])

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

    return (
        <Container onMouseEnter={hovercheck} id={styles.constraintGrid}>  
        <Container id={styles.constraintA}>

        <Checkbox cb={1}/>
        <Checkbox cb={2}/>
        <Checkbox cb={3}/>

        </Container>

        <Container id={styles.constraintB}>

                        {/* style={{     
                          color: passworduppercase ? 'rgb(247, 208, 32)' : 'moccasin',
                          fontWeight: 'bold', fontSize: '15px'
                        }}> upper </p> */}

            {
                CHECKED === "cb2" &&
                <>
                {
                PASSWORD_UPPERCASE && PASSWORD_NUMBER_CHAR && PASSWORD_SPECIAL_CHAR && !PASSWORD_TOO_EZ 
                                                ?
                                            // <pre> hey </pre>
                        <img style={{ height: '30px', width: '30px' }} src={gold}/>
                                                    :
                                                    <>          
                                                    {
                                                        PASSWORD_TOO_EZ
                                                            &&
                                                     <pre style={{
                                                    color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)",
                                                    fontWeight: 'bold'
                                                }}
                                                > tooEZ </pre> 
                                                    }    

                                                    {
                                                        !PASSWORD_TOO_EZ  &&
                                                        <>
                                                    <pre style={{                        
                                                    color: PASSWORD_UPPERCASE ? "rgb(247, 208, 32)" : "moccasin",
                                                    fontWeight: 'bold', 
                                                }}                    
                                                > upper </pre>
                                                
                                                <pre style={{
                                                    color: PASSWORD_NUMBER_CHAR ? "rgb(247, 208, 32)" : "moccasin",
                                                    fontWeight: 'bold',
                                                    // color: RhasNums.test(SIGNUP_PASSWORD_INPUT) ? "rgb(247, 208, 32)" : "moccasin",
                                                }}
                                                > number </pre>
                                                
                                                <pre style={{                        
                                                    color: PASSWORD_SPECIAL_CHAR ? "rgb(247, 208, 32)" : "moccasin",
                                                    fontWeight: 'bold'
                                                }}> special </pre>
                                                
                                                {/* color: tooeasy ? '#E01115' : 'rgb(247, 208, 32)', */}
                                                <pre style={{
                                                    color: PASSWORD_LENGTH_PASS ? "rgb(247, 208, 32)" : "moccasin",
                                                    fontWeight: 'bold'
                                                    // color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)"
                                                }}
                                                > length </pre>
                                                        </>
                                                    }                                                                                          
                                        </>
                }

                    {/* <pre style={{
                        color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)",
                        fontWeight: 'bold'
                        // color: PASSWORD_TOO_EZ ? "#E01115" : "rgb(247, 208, 32)"
                    }}
                    > tooEZ </pre> */}

                </>
            }

        </Container>

        {/* upper, number, special tooEZ */}

        </Container>
    )
}
