import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import Wins from "../Wins/Wins"
import Photos from "../Photos"
import styles from "./TrophyRoomMain.module.scss"
import Movies from "../Movies/Movies"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM, WHICH_IMAGE_DECREMENT, WHICH_IMAGE_INCREMENT, SET_CURTAIN_IMAGE_CLICK } from "redux/trophyRoom/trophyRoomSlice"

// utils
import {useImage} from "Contexts/Img"

export default function TrophyRoomMain({allUsers}) {
    const CURTAIN_IMAGE_CLICK = useSelector( (state:RootState) => state.trophyRoom.CURTAIN_IMAGE_CLICK)
    // return <CURTAIN/>
    return (
        <>
        {CURTAIN_IMAGE_CLICK === "" && <CURTAIN />}
        {CURTAIN_IMAGE_CLICK === "photos" && <Photos/> }
        {CURTAIN_IMAGE_CLICK === "wins" && <Wins allUsers={allUsers}/> }
        {CURTAIN_IMAGE_CLICK === "popcorn" && <Movies/> }
        </>
    )    
}

function CURTAIN() {
    const { goldArrowLeft, goldArrowRight } = useImage()
    const dispatch = useDispatch()
    const WHICH_IMAGE_ARRAY = useSelector( (state:RootState) => state.trophyRoom.WHICH_IMAGE_ARRAY)
    const WHICH_IMAGE_INDEX = useSelector( (state:RootState) => state.trophyRoom.WHICH_IMAGE_INDEX)
    const left = "<"
    const right = ">"

    useEffect( () => {
        dispatch(SET_CURRENT_PAGE("/trophyroom"))
    }, [])

    const increment = () => {
        if (WHICH_IMAGE_INDEX < 2) {
            dispatch(WHICH_IMAGE_INCREMENT())
        }
    }    

    const decrement = () => {
        if (WHICH_IMAGE_INDEX > 0) {
            dispatch(WHICH_IMAGE_DECREMENT())
        }
    }    

    const imageClick = (event:any) => {
        const src:string = event.target.src
        if (src.includes('moviesPopcorn.png')) {
            console.log("popcorn")
            dispatch(SET_CURTAIN_IMAGE_CLICK('popcorn'))
        }
        if (src.includes('winsCeremony.png')) {
            console.log("wins")
            dispatch(SET_CURTAIN_IMAGE_CLICK('wins'))
        }
        if (src.includes('photos.png')) {
            console.log("photos")
            dispatch(SET_CURTAIN_IMAGE_CLICK('photos'))
        }
    }

    return (        
        <Container className={styles.trophyRoomMain}>        
        <Container id={styles.curtain}>    
         <pre onClick={decrement} style={{ color: WHICH_IMAGE_INDEX === 0 ? "papayawhip" : 'rgb(247, 208, 32)', fontSize: "40px", cursor: 'none', fontWeight: 'bolder' }}> {left} </pre>
         {/* <img onMouseEnter={decrement} style={{ height: '35px', width: '35px', position: 'relative', left: '-10px'}} src={goldArrowLeft}/> */}
         <img onClick={imageClick} id={styles.img} src={WHICH_IMAGE_ARRAY[WHICH_IMAGE_INDEX]}/>
         {/* <img onMouseEnter={increment} style={{ height: '50px', width: '50px', position: 'relative', left: '10px'}} src={goldArrowRight}/> */}
         <pre onClick={increment} style={{ color: WHICH_IMAGE_INDEX === 2 ? "papayawhip" : 'rgb(247, 208, 32)', fontSize: "40px", cursor: 'none', fontWeight: 'bolder' }}> {right} </pre>                
        </Container>    
        </Container>
    )
}
