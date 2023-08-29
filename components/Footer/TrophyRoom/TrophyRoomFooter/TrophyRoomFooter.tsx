import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./TrophyRoomFooter.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_DECREMENT, WHICH_IMAGE_INCREMENT } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function Footer() {
    return <RENDER/>
}

function RENDER() {
    const { cinemaRopes } = useImage()

    return (
        <Container id={styles.Cont}>
            <img className={styles.cinemaRopes} src={cinemaRopes}/>
            <img className={styles.cinemaRopes} src={cinemaRopes}/>
        </Container>
    )
}
