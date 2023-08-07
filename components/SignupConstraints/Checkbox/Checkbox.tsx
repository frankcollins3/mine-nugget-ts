
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CHECKED } from "redux/loginSignup/loginSignupSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../SignupConstraints.module.scss"

export default function Checkbox(props:any) {
    const cb:any = props.cb
    console.log('cb props', cb)
    console.log('cb type', typeof cb)

    const dispatch = useDispatch()

    const sty = styles
    let boxcont = [sty.checkboxcontainer, 'tag'].join(" ")

    const CHECKED = useSelector( (state:RootState) => state.loginSignup.CHECKED)
    const boxcontID = `boxcont${cb}`
    const cbID = `cb${cb}`

    console.log('boxContID', boxcontID)
    console.log('cbID', cbID)

    const checkboxclick = (id) => {
        console.log('id', id)
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
        {/* onClick={() => checkboxclick("cb3")} type="checkbox" id="cb3"/> */}

        {/* <label htmlFor={cbID}> username </label>  */}
        {/* { parseInt(cbID) === 1 && <label htmlFor={cbID}> username </label> } */}
        <label htmlFor={cbID}> {cb === 1 ? "username" : cb === 2 ? "password" : cb === 3 ? "email" : ""} </label>

    </Container>
    )
}