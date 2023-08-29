import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./MovieFooter.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { INCREMENT_VIDEO_SRC_ARRAY, RESET_VIDEO_SRC_ARRAY } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function MovieFooter() {
    return <RENDER/>
}


function RENDER() {
    const dispatch = useDispatch()
    const VIDEO_SRC_ARRAY_INDEX = useSelector( (state:RootState) => state.trophyRoom.VIDEO_SRC_ARRAY_INDEX)

    const classCombine = ["hover", styles.img].join(" ");
    
    const filmClick = () => {
        console.log("film Click!!") 
        if (VIDEO_SRC_ARRAY_INDEX >= 7) {
            console.log(`array index === 7 ${VIDEO_SRC_ARRAY_INDEX}`)
            dispatch(RESET_VIDEO_SRC_ARRAY())
        } else {
            dispatch(INCREMENT_VIDEO_SRC_ARRAY())
        }
    }

    const test = () => {
        console.log('index', VIDEO_SRC_ARRAY_INDEX)
    }
    
    const { film, ticket } = useImage()

    return (
        <Container id={styles.Cont}>
            <img style={{ cursor: 'pointer' }} onClick={filmClick} className={classCombine} src={film}/>
            <img onClick={test} className={styles.img} src={ticket}/>
        </Container>
    )
}