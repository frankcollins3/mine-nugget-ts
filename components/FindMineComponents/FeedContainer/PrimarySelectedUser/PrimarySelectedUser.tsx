// @reduxjs/toolkit
import {RootState} from "redux/store/rootReducer"
import {useSelector, useDispatch} from "react-redux"
import {SET_CURRENT_PAGE, SET_CURRENT_USER} from "redux/main/mainSlice"
// import {} from "redux/findMine/findMineSlice"

// components and styles
import Container from "react-bootstrap/Container"
import LoadingPickaxe from "components/LoadingPickaxe"
import styles from "./PrimarySelectedUser.module.scss"

// utils
import {useImage} from "Contexts/Img"


export default function PrimarySelectedUser() {
    return <RENDER/>
}

function RENDER() {
    const FEED_SELECTED_USER = useSelector( (state:RootState) => state.findMine.FEED_SELECTED_USER)
    const COIN_HOVER_STRAIN = useSelector( (state:RootState) => state.findMine.COIN_HOVER_STRAIN)

    const { helmet } = useImage()

    const test = () => {
        console.log('coin hover strain', COIN_HOVER_STRAIN)
    }

    return (
        <>
            {
                FEED_SELECTED_USER.username.length > 2 
                ? 
                FEED_SELECTED_USER.icon 
                        ?
                        <>
                <img id={styles.icon} src={FEED_SELECTED_USER.icon}/>
                    {
                        COIN_HOVER_STRAIN.id > 0 
                    ? <pre onClick={test} id={styles.usernameText}> {`${FEED_SELECTED_USER.username} ${COIN_HOVER_STRAIN.like ? "likes" : "doesn't like"} ${COIN_HOVER_STRAIN.strain}`} </pre>
                    : <pre onClick={test} id={styles.usernameText}> {FEED_SELECTED_USER.username || ""} </pre>
                    }
                    
                    {/* <pre onClick={test} id={styles.usernameText}> {FEED_SELECTED_USER.username || ""} </pre> */}
                        </>
                        :
                        <>
                <img id={styles.icon} src={helmet}/>

                {/* {
                    COIN_HOVER_STRAIN 
                    ?   
                    <pre id={styles.usernameText}> 'hey guys' </pre>

                    : <pre onClick={test} id={styles.usernameText}> {FEED_SELECTED_USER.username || ""} </pre>
                } */}

                    {/* <pre id={styles.usernameText}> {FEED_SELECTED_USER.username || ""} </pre> */}
                        </>

                : 
                <LoadingPickaxe/>
                
            }
            
        </>
    )
}