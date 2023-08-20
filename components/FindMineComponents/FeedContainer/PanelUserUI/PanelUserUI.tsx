

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
    const COIN_HOVER_STRAIN = useSelector( (state:RootState) => state.findMine.COIN_HOVER_STRAIN)
    const CURRENT_USER = useSelector( (state:RootState) => state.main.CURRENT_USER)

    const dispatch = useDispatch()
    const { helmet } = useImage()

    console.log('userData in PanelUserUI', userData)

    const selectUser = () => {
        const clickData = userData[index]
        console.log('clickData', clickData)
        dispatch(SET_COIN_HOVER_STRAIN({id: 0, strain: '', like: false}))
        dispatch(SET_FEED_SELECTED_USER(clickData))

    }

    return (
        // <p> hey </p>
        
        
        <Container onClick={selectUser} id={styles.cont}>            

        {
            CURRENT_USER.username !== userData[index].username
                                &&
                                <>
            { FEED_SELECTED_USER.username !== userData[index].username && <img id={styles.img} src={userData[index].icon || helmet }/> }
            { FEED_SELECTED_USER.username !== userData[index].username && <pre id={styles.userNameText}> {userData[index].username} </pre> }
                                </>
        }


        
        </Container>
    )

}

        {/* {
            !FEED_SELECTED_USER.username.length > 3 ? <pre id={styles.userNameText}> {userData[index].username} </pre> : <pre> "" </pre>
        } */}
