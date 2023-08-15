import {useEffect, useState} from "react"

// components and styles
import Container from "react-bootstrap/Container"
import styles from "./NoFeedContainer.module.scss"
import Primary from "components/FindMineComponents/NoFeedContainer/Primary"

// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import { SET_NO_FEED_SELECTED_STRAIN, TOGGLE_NO_FEED_SHOW_MINE, SET_NO_FEED_NO_STRAIN_MSGS, TOGGLE_TRIGGER_LIKE_EFFECT, TOGGLE_USER_LIKES_SELECTED_STRAIN } from "redux/findMine/findMineSlice"
// utils
import {useImage} from "Contexts/Img"

export default function NoFeedContainer() {
    return <RENDER/>
}

function RENDER() {
    const SHOW_FEED = useSelector( (state:RootState) => state.findMine.SHOW_FEED)
    const CURRENT_USER_STRAINS = useSelector( (state:RootState) => state.findMine.CURRENT_USER_STRAINS)
    const USER_LIKES_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.USER_LIKES_SELECTED_STRAIN)
    const NO_FEED_SELECTED_STRAIN = useSelector( (state:RootState) => state.findMine.NO_FEED_SELECTED_STRAIN)
    const NO_FEED_SHOW_MINE = useSelector( (state:RootState) => state.findMine.NO_FEED_SHOW_MINE)

    const [showDigText, setShowDigText] = useState(false)
    const [showDeleteText, setShowDeleteText] = useState(false)
    const [showMineText, setShowMineText] = useState(false)

    const dispatch = useDispatch()

    const { coin, mine, gold, shovel, dynamite, edit, eraser, glasses  } = useImage()

    const setCoin = (item:any) => {
        console.log('item', item)
        const id = item.strainsid
        console.log(id)
        // [1 'wedding cake', 2 'GorillaGlue#4', 3: Do-Si-Dos, 4: mimosa, 5 cherry pie, 6 white widow, 7 pineapple express]
        // {id === 1 ? "cake" : id === 2 ? "Glue#4" : id === 3 ? "Do-Si-Dos" : id === 4 ? "mimosa" : id === 5 ? "pie" : id === 6 ? "white wid" : id === 7 ? "p-express" : ""}
        dispatch(SET_NO_FEED_SELECTED_STRAIN(
            id === 1 ? {id: 1, strain: "wedding cake"} : id === 2 ? { id: 2, strain: "GorillaGlue#4"} : id === 3 ? {id: 3, strain: "Do-Si-Dos"} : 
            id === 4 ? {id: 4, strain: "mimosa"} : id === 5 ? {id: 5, strain: "cherry pie"} : id === 6 ? {id: 6, strain: "white widow"} : 
            id === 7 ? {id: 7, strain: "pineapple express"} : ""
        ))
        dispatch(TOGGLE_TRIGGER_LIKE_EFFECT())
    }

    const reset = () => {
        dispatch(SET_NO_FEED_SELECTED_STRAIN({id: 0, strain: ''}))
        dispatch(SET_NO_FEED_NO_STRAIN_MSGS({err: false, msg: ''}))

        if (USER_LIKES_SELECTED_STRAIN === true) { dispatch(TOGGLE_USER_LIKES_SELECTED_STRAIN())}
    }

    return (
        <Container onMouseLeave={reset} id={styles.Page_1}>
            <Primary/>
            
            <Container className={styles.panel}>
                {
                CURRENT_USER_STRAINS &&
                CURRENT_USER_STRAINS.map( (item, index) => {
                    let id = item.strainsid
                    return (
                        // <pre> {item.strainsid} </pre>
                        // [1 'wedding cake', 2 'GorillaGlue#4', 3: Do-Si-Dos, 4: mimosa, 5 cherry pie, 6 white widow, 7 pineapple express]
                        <Container key={`column${index}`} className={styles.coinColumn}>
                        <img style={{ cursor: 'pointer'}} key={index} className={styles.currentUserStrainsCoin} onClick={() => setCoin(item)} src={coin}/>

                        <pre className={styles.coinText}> 
{id === 1 ? "cake" : id === 2 ? "Glue#4" : id === 3 ? "Do-Si-Dos" : id === 4 ? "mimosa" : id === 5 ? "pie" : id === 6 ? "white wid" : id === 7 ? "p-express" : ""}
                        </pre>
                        </Container>
                            
                    )
                })
                }
            </Container>

        </Container>
    )
}