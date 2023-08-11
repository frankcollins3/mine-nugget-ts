
// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
// import { 
//     SET_VIEW_SELECTED_STRAIN_KEY, SET_VIEW_SELECTED_STRAIN_VALUE, SET_VIEW_SELECTED_STRAIN_INDEX, SET_VIEW_SELECTED_STRAIN, TOGGLE_SELECTED_STRAIN_SAVE_OR_NOT,
//     SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS,
// } from "redux/main/mainSlice"


// components and styles
import Container from "react-bootstrap/Container"
import styles from "./Navbar.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function Navbar() {
    return <RENDER></RENDER>
}

function RENDER() {
    const ALL_USERNAMES = useSelector( (state:RootState) => state.main.ALL_USERNAMES)
    const ALL_EMAILS = useSelector( (state:RootState) => state.main.ALL_EMAILS)
    const CURRENT_PAGE = useSelector( (state:RootState) => state.main.CURRENT_PAGE)

    const { magnify, gold, cactus, mine, navbardice } = useImage()

    const goldClick = () => {
        window.location.href = "/strain"
    }

    const test = () => {
        console.log('ALL_USERNAMES', ALL_USERNAMES)
        console.log('ALL_EMAILS', ALL_EMAILS)
    }

    return (
        <Container id={styles.Cont}>

            <Container>
                <img onClick={test} id={styles.mine} className={styles.img} src={CURRENT_PAGE === "/familytree" ? navbardice : mine}/>
            </Container>

            <Container id={styles.multiIconCont}>
                <img onClick={goldClick} className={styles.img} src={gold}/>
                <img className={styles.img} src={cactus}/>
                <img className={styles.img} src={magnify}/>
            </Container>
            
        </Container>
    )
}
