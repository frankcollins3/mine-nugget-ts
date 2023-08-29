import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import Stars from "./Stars/stars"
import styles from "./Wins.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
// import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_DECREMENT, WHICH_IMAGE_INCREMENT, SET_CURTAIN_IMAGE_CLICK } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

// props with all users
export default function Wins({allUsers}) {
    return <RENDER allUsers={allUsers} />
}

function RENDER({allUsers}) {
    const { star } = useImage()

    return (                
        <Container id={styles.cont}>
        <Stars allUsers={allUsers}/>
        </Container>                        
    )
}