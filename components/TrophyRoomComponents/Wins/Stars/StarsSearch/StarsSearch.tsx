import {useEffect} from 'react'

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./StarsSearch.module.scss"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_STARS_SEARCH_TERM } from 'redux/trophyRoom/trophyRoomSlice'

// utils
import {useImage} from "Contexts/Img"

export default function StarsSearch({allUsers}) {
    return <RENDER allUsers={allUsers}/>
}

function RENDER ({allUsers}) {
    const dispatch = useDispatch()
    console.log('allUsers in the starsSearch', allUsers)

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let src:string = event.target.value
        dispatch(SET_STARS_SEARCH_TERM(src))
    };

    return (
        <input onChange={inputHandler} id={styles.input} type="text"/>
    )
}