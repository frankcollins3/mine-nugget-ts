import {useEffect, useState} from 'react'

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
import { SET_FEED_SELECTED_USER, SET_COIN_HOVER_STRAIN } from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./PanelUserUI.module.scss"

// utils
import {useImage} from "Contexts/Img"

export default function PanelUserUI ( {userData, index} ) {
    const FEED_SELECTED_USER = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER)
    const FEED_SEARCH_TERM = useSelector( (state:RootState) => state.findMine.FEED_SEARCH_TERM)
    const COIN_HOVER_STRAIN = useSelector( (state:RootState) => state.findMine.COIN_HOVER_STRAIN)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)
    
    const [localStateHide, setLocalStateHide] = useState(false) 
    const username = userData[index].username

    useEffect( () => {
        const searchTermLen = FEED_SEARCH_TERM.length
        const usernameIndex = username[searchTermLen - 1]        
        if (searchTermLen === 0) {
            setLocalStateHide(false)
        } else {
            for (let i = 0; i < FEED_SEARCH_TERM.length; i++) {
                if (FEED_SEARCH_TERM[i] === username[i] && FEED_SEARCH_TERM[i-1] === username[i-1]) {
                    setLocalStateHide(false)
                } else {
                    setLocalStateHide(true)            
                } 
            }
        }

    }, [FEED_SEARCH_TERM] )

    const dispatch = useDispatch()
    const { helmet } = useImage()

    const selectUser = () => {
        const clickData = userData[index]
        console.log('clickData', clickData)
        dispatch(SET_COIN_HOVER_STRAIN({id: 0, strain: '', like: false}))
        dispatch(SET_FEED_SELECTED_USER(clickData))
    }

    return (        
        
        <Container style={{ display: CURRENT_USER.username !== userData[index].username && localStateHide === false ? "" : "none" }} onClick={selectUser} id={styles.cont}>            
            <>
            { FEED_SELECTED_USER.username !== userData[index].username && <img id={styles.img} src={userData[index].icon || helmet }/> }
            { FEED_SELECTED_USER.username !== userData[index].username && <pre id={styles.userNameText}> {username} </pre> }
            </>
        
        </Container>
    )

}
