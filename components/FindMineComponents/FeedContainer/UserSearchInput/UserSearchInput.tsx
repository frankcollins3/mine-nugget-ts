
// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { SET_FEED_SEARCH_TERM } from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./UserSearchInput.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function UserSearchInput() {
    return <RENDER/>
}

function RENDER() {
    const dispatch = useDispatch()
    // * * * * *  the mine border is going to go papayawhip on and off for every other input * * * *
    const { mine } = useImage()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state with the new input value
        // setInputValue(event.target.value);
        let value:string = event.target.value
        console.log('value in the input', value)
        dispatch(SET_FEED_SEARCH_TERM(value))
      };

    return (

        <Container id={styles.inputCont}>
        <input 
        id={styles.userSearchInput}
        type="text"
        onChange={handleInputChange}
        />
        <img id={styles.inputMine} src={mine}/>
        </Container>
    )
}