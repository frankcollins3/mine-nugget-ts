import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./Photos.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { NESTED_PHOTO_DECREMENT, NESTED_PHOTO_INCREMENT, NESTED_PHOTO_RESET, NESTED_PHOTO_LENGTH_END, PHOTO_ARRAY_INDEX_PUSH, SET_OUTER_PHOTO_INDEX } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"
import {usePromise} from "Contexts/Promises"

export default function Photos () {
    return <RENDER/>
}

function RENDER () {
    const dispatch = useDispatch()

    const PHOTOS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.PHOTOS_ARRAY)
    const OUTER_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.OUTER_PHOTO_INDEX)
    const NESTED_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.NESTED_PHOTO_INDEX)
    const PHOTO_ARRAY_INDEX_VISITED = useSelector( (state:RootState) => state.trophyRoom.PHOTO_ARRAY_INDEX_VISITED)

    const { clickRightPhotoArrayIncrement, clickLeftPhotoArrayDecrement } = usePromise()

    const left = "<"
    const right = ">"

    useEffect( () => {
        if (OUTER_PHOTO_INDEX !== 3) {
            if (PHOTO_ARRAY_INDEX_VISITED[0].length === PHOTOS_ARRAY[0].length && PHOTO_ARRAY_INDEX_VISITED[1].length === PHOTOS_ARRAY[1].length && PHOTO_ARRAY_INDEX_VISITED[2].length === PHOTOS_ARRAY[2].length) {
                dispatch(NESTED_PHOTO_RESET())
                dispatch(SET_OUTER_PHOTO_INDEX(3))
            } 
        }
    }, [PHOTO_ARRAY_INDEX_VISITED])

    const test = () => {
        console.log('photoarray', PHOTO_ARRAY_INDEX_VISITED)

        console.log(PHOTO_ARRAY_INDEX_VISITED.length)
        console.log(PHOTOS_ARRAY.length)
    }

    return (
        <Container id={styles.frameCont}>
            <Container id={styles.photoFrame}>
            <pre onClick={() => clickLeftPhotoArrayDecrement()} style={{ color: 'papayawhip', fontSize: "40px", cursor: 'none', fontWeight: 'bolder' }}> {left} </pre>        
                <img id={styles.photoImg} src={PHOTOS_ARRAY[OUTER_PHOTO_INDEX][NESTED_PHOTO_INDEX]}/>
            <pre onClick={() => clickRightPhotoArrayIncrement()} style={{ color: 'papayawhip', fontSize: "40px", cursor: 'none', fontWeight: 'bolder' }}> {right} </pre>
            </Container>
            {/* <button style={{ height: '50px', width: '50px', backgroundColor: 'hotpink' }} onClick={test}></button> */}
        </Container>
    )
}
