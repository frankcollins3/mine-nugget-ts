import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./Photos.module.scss"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { NESTED_PHOTO_DECREMENT, NESTED_PHOTO_INCREMENT, NESTED_PHOTO_RESET, NESTED_PHOTO_LENGTH_END, PHOTO_ARRAY_INDEX_PUSH } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function Photos () {
    return <RENDER/>
}

function RENDER () {
    const dispatch = useDispatch()

    const PHOTOS_ARRAY = useSelector( (state:RootState) => state.trophyRoom.PHOTOS_ARRAY)
    const OUTER_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.OUTER_PHOTO_INDEX)
    const NESTED_PHOTO_INDEX = useSelector( (state:RootState) => state.trophyRoom.NESTED_PHOTO_INDEX)
    const PHOTO_ARRAY_INDEX_VISITED = useSelector( (state:RootState) => state.trophyRoom.PHOTO_ARRAY_INDEX_VISITED)

    const left = "<"
    const right = ">"

    const clickLeftDecrement = () => {
        const length: number = PHOTOS_ARRAY[OUTER_PHOTO_INDEX].length - 1
        if (NESTED_PHOTO_INDEX > 0) {
            dispatch(NESTED_PHOTO_DECREMENT())
        } else {
            dispatch(NESTED_PHOTO_LENGTH_END(length))
        }
    }
    
    const clickRightIncrement = () => {
        
        let length:number = PHOTOS_ARRAY[OUTER_PHOTO_INDEX].length - 1
        console.log('length of nested array', length)        
        
        if (NESTED_PHOTO_INDEX < length) {
            const incrementPROMISE = new Promise( (resolve:any, reject:any) => {
                dispatch(NESTED_PHOTO_INCREMENT())
                resolve(NESTED_PHOTO_INDEX)
                const index = NESTED_PHOTO_INDEX + 1 
                dispatch(PHOTO_ARRAY_INDEX_PUSH({outerindex: OUTER_PHOTO_INDEX, innerindex: index}))
                // dispatch(PHOTO_ARRAY_INDEX_PUSH({OUTER_PHOTO_INDEX, index}))
            })
        } else {
            dispatch(NESTED_PHOTO_RESET())
        }
    }

    const test = () => {
        console.log('photoarray', PHOTO_ARRAY_INDEX_VISITED)
    }

    return (
        <Container id={styles.frameCont}>
            <Container id={styles.photoFrame}>
            <pre onMouseEnter={clickLeftDecrement} style={{ color: 'rgb(247, 208, 32)', fontSize: "30px", cursor: 'none' }}> {left} </pre>        
                <img id={styles.photoImg} src={PHOTOS_ARRAY[OUTER_PHOTO_INDEX][NESTED_PHOTO_INDEX]}/>
            <pre onMouseEnter={clickRightIncrement} style={{ color: 'rgb(247, 208, 32)', fontSize: "30px", cursor: 'none' }}> {right} </pre>
            </Container>
            <button style={{ height: '50px', width: '50px', backgroundColor: 'hotpink' }} onClick={test}></button>
        </Container>
    )
}

/* 
barrel,  barrels, barrier, cactus, cart, coin, caution, coneHat, vest, desert, dynamite, edit, eraser, firetag, glasses,
goldBars,gold, goldenTriangle, helmet, litPaper, magnify, magnify2, magnify3, mine, mineCart, mirror, pick, pickaxe, ring, shovel, signUpSigns, trophy, unLitPaper, 
watch, goldcursor1, goldcursor2, kiss, luckypull,

king, queen, joker, kingspades, queenspades, cards, blackjack, navbardice, wincards, upsidedowncard, deckcards, goldenticket, winoneheart, winthreecards, howmanywinsprofile, kingqueensplit, ilink, welink,
trophyroom6333icons, moviesPopcorn, redCarpet, cinemaRopes, photos, film, curtain, redCarpetHome, winsCeremony, movieReel, frame
*/