import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./PhotoFooter.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_OUTER_PHOTO_INDEX, NESTED_PHOTO_RESET } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function PhotoFooter() {
    return <RENDER/>
}

function RENDER() {
    const dispatch = useDispatch()
    const { frame2, gold, deckcards, coin, luckypull } = useImage()

    const PHOTO_ARRAY_INDEX_VISITED = useSelector( (state:RootState) => state.trophyRoom.PHOTO_ARRAY_INDEX_VISITED)
    const PHOTOS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.PHOTOS_ARRAY)
    
    const clickIndex = (num:number) => {
        dispatch(SET_OUTER_PHOTO_INDEX(num))
        dispatch(NESTED_PHOTO_RESET())        
    }

    return (
        <Container id={styles.photoBooth}>

        <Container id={styles.strain} className={styles.frame}>
            <img onClick={() => clickIndex(0)} className={styles.img} src={gold}/>
        </Container>

        {/* {
PHOTO_ARRAY_INDEX_VISITED[0].length === PHOTOS_ARRAY[0].length && PHOTO_ARRAY_INDEX_VISITED[1].length === PHOTOS_ARRAY[1].length && PHOTO_ARRAY_INDEX_VISITED[2].length === PHOTOS_ARRAY[2].length && 
        <Container id={styles.strain} className={styles.frame}>
            <img onClick={() => clickIndex(0)} className={styles.img} src={luckypull}/>
        </Container>
        } */}

        <Container id={styles.familyTree} className={styles.frame}>
            <img onClick={() => clickIndex(1)} className={styles.img} src={deckcards}/>
            {/* <img onClick={() => dispatch(SET_OUTER_PHOTO_INDEX(1) && dispatch(NESTED_PHOTO_RESET()))} className={styles.img} src={deckcards}/> */}
        </Container>

        <Container id={styles.findMine} className={styles.frame}>
            <img onClick={() => clickIndex(2)} id={styles.coin} src={coin}/>
            {/* <img onClick={() => dispatch(SET_OUTER_PHOTO_INDEX(2) && dispatch(NESTED_PHOTO_RESET()))} id={styles.coin} src={coin}/> */}
        </Container>

        </Container>
    )
}