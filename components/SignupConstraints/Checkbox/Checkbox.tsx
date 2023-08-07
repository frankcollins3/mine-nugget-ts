
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CHECKED, TOGGLE_SIGNUP_PASSWORD_SEE } from "redux/loginSignup/loginSignupSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../SignupConstraints.module.scss"

export default function Checkbox(props:any) {
    const cb:any = props.cb    
    const dispatch = useDispatch()

    const sty = styles
    let boxcont = [sty.checkboxcontainer, 'tag'].join(" ")

    const CHECKED = useSelector( (state:RootState) => state.loginSignup.CHECKED)
    const SIGNUP_PASSWORD_SEE = useSelector( (state:RootState) => state.loginSignup.SIGNUP_PASSWORD_SEE)

    const boxcontID = `boxcont${cb}`
    const cbID = `cb${cb}`    

    const checkboxclick = (id) => {

        if (id === 'cb2') { dispatch(TOGGLE_SIGNUP_PASSWORD_SEE()) }

        if (CHECKED !== id) {
            dispatch(SET_CHECKED(id))
        } else if (CHECKED === id) {
            dispatch(SET_CHECKED(''))
        }
    }
    
    return (

        <Container style=
        {{
            position: cb === 2 && 'relative', left: cb === 2 && '-8px', 
            pointerEvents: CHECKED.length > 1 ? CHECKED !== `cb${cb}` ? 'none' : "all" : "",
            cursor: CHECKED.length > 1 ? CHECKED !== `cb${cb}` ? 'hidden' : "pointer" : "" 
        }}
        className={boxcont} id={boxcontID}>
        <input
        style={{ pointerEvents: CHECKED.length > 1 ? 'none' : 'all'}}
        onClick={() => checkboxclick(`cb${cb}`)} type="checkbox" id={cbID}/>        
        <label htmlFor={cbID}> {cb === 1 ? "username" : cb === 2 ? "password" : cb === 3 ? "email" : ""} </label>

    </Container>
    )
}

// original non dynamic UI code: 

        {/* <Container style=
            {{
                 pointerEvents: CHECKED.length > 1 ? CHECKED !== "cb1" ? 'none' : "all" : "",
                 cursor: CHECKED.length > 1 ? CHECKED !== "cb1" ? 'hidden' : "pointer" : "" 
            }}
             className={boxcont} id="boxcont1">            
                <input                 
                // style={{ pointerEvents: CHECKED.length > 1 && CHECKED !== "cb1" ? 'none' : 'all'}}
                
                onClick={() => checkboxclick("cb1")}  type="checkbox" id="cb1"/>
                <label htmlFor="cb1">username</label>
            </Container>

            <Container style=
            {{
                 pointerEvents: CHECKED.length > 1 ? CHECKED !== "cb2" ? 'none' : "all" : "",
                 cursor: CHECKED.length > 1 ? CHECKED !== "cb2" ? 'hidden' : "pointer" : "" 
            }}
             className={boxcont} id="boxcont2">
                <input
                style={{ pointerEvents: CHECKED.length > 1 ? 'none' : 'all'}}
                 onClick={() => checkboxclick("cb2")} type="checkbox" id="cb2"/>
                <label htmlFor="cb2">password</label>
            </Container>

            <Container style=
            {{
                 pointerEvents: CHECKED.length > 1 ? CHECKED !== "cb3" ? 'none' : "all" : "",
                 cursor: CHECKED.length > 1 ? CHECKED !== "cb3" ? 'hidden' : "pointer" : "" 
            }}
             className={boxcont} id="boxcont3">
                <input
                style={{ pointerEvents: CHECKED.length > 1 ? 'none' : 'all'}}
                onClick={() => checkboxclick("cb3")} type="checkbox" id="cb3"/>
                <label htmlFor="cb3">email</label>
            </Container> */}
