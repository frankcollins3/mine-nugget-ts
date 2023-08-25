import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "../TrophyRoom.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_DECREMENT, WHICH_IMAGE_INCREMENT } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function TrophyRoomIntro () {
    const dispatch = useDispatch()
    const { redCarpet, gold } = useImage()    

    useEffect( () => {
        dispatch(SET_CURRENT_PAGE("/trophyroom"))
    }, [])


    return (
        <Container className="Trophy-Room-All-Over-Print">
        <img id={styles.goldIntro} onClick={() => dispatch(TOGGLE_WALK_INTO_TROPHY_ROOM())} src={gold}/>
        </Container>
    )
}