import {useEffect, useState} from "react"
import axios from 'axios'

// components and styles
import Container from "react-bootstrap/Container"


// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_CURRENT_USER, SET_CURRENT_PAGE } from "redux/main/mainSlice"
import { TOGGLE_WALK_INTO_TROPHY_ROOM } from "redux/trophyRoom/trophyRoomSlice"


// utils
import {useImage} from "Contexts/Img"


export default function TrophyRoom() {
    const WALK_INTO_TROPHY_ROOM = useSelector( (state:RootState) => state.trophyRoom.WALK_INTO_TROPHY_ROOM)

    return (
            WALK_INTO_TROPHY_ROOM 
            ? <RENDERTROPHYROOM/>
            :  <RENDERINTRO/>
    )
}

function RENDERINTRO () {
    const dispatch = useDispatch()
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    const { redCarpet, gold } = useImage()
    
    useEffect( () => {
     dispatch(SET_CURRENT_PAGE("/trophyroom"))
    }, [])


    return (
        <Container className="Trophy-Room-All-Over-Print">
        <img style={{ height: '150px', width: '150px'}} onClick={() => dispatch(TOGGLE_WALK_INTO_TROPHY_ROOM())} src={gold}/>
        </Container>
    )
}

function RENDERTROPHYROOM() {
    const { curtain } = useImage()
    const dispatch = useDispatch()


    return (
        <Container className="Trophy-Room">
        <img style={{ height: '150px', width: '150px'}} src={curtain}/>
        </Container>
    )
}

// moviesPopcorn.tsx -----> show app videos. possibly served through context.
// 